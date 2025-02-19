import { Button } from "@components/Button/Button";
import { Container } from "@components/Container/Container";
import { Toast } from "@components/Toast/Toast";
import { UsedOrNew } from "@components/UsedOrNew/UsedOrNew";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
import { ProductImageDTO } from "@dtos/ProductImageDTO";
import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Text,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import { useAuth } from "@hooks/useAuth";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesdProps, AppRoutes } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { GeneratePaymentMethods } from "@utils/generatePaymentMethods";
import { cleanCurrency, formatCurrency } from "@utils/validationValueProduct";
import { ArrowLeft, Tag } from "lucide-react-native";
import { useState } from "react";
import { Dimensions, ScrollView } from "react-native";

import Carousel from "react-native-reanimated-carousel";

const { width, height } = Dimensions.get("window");

export function PreviewAds() {
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [imagesData, setImagesData] = useState<ProductImageDTO>();

  const route = useRoute<RouteProp<AppRoutes, "previewAds">>();
  const { navigate } = useNavigation<AppNavigatorRoutesdProps>();

  const toast = useToast();

  const { user } = useAuth();

  const {
    checkbox,
    description_title,
    images,
    product_title,
    switchValue,
    value_product,
    selectedOption,
    idProductExist,
  } = route.params;

  function handleEdit() {
    navigate("createAds", {
      checkbox,
      description_title,
      images,
      product_title,
      selectedOption,
      switchValue,
      value_product,
      editable: true,
      idProductExist,
    });
  }

  async function handleCreateProduct() {
    try {
      setLoadingData(true);

      if (idProductExist) {
        const { data } = await api.put(`/products/${idProductExist}`, {
          name: product_title,
          description: description_title,
          is_new: selectedOption === "new_product" ? true : false,
          price: Number(cleanCurrency(value_product)),
          accept_trade: switchValue,
          payment_methods: checkbox,
        });

        console.log("dados atualizados", data);

        navigate("bottomTabs", { screen: "myAds" });

        return toast.show({
          placement: "top",
          render: ({ id }: { id: string }) => (
            <Toast
              id={id}
              action="success"
              title={"Produto atualizado com sucesso"}
              onClose={() => toast.close(id)}
            />
          ),
        });
      }

      const { data } = await api.post("/products/", {
        name: product_title,
        description: description_title,
        is_new: selectedOption === "new_product" ? true : false,
        price: Number(cleanCurrency(value_product)),
        accept_trade: switchValue,
        payment_methods: checkbox,
      });

      const imageData = new FormData();

      images.forEach((item) => {
        const imageFile = {
          ...item,
          name: user.name + "." + item.name,
        } as any;

        imageData.append("images", imageFile);
      });

      imageData.append("product_id", data.id);

      await api.post("/products/images", imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("bottomTabs", { screen: "home" });

      toast.show({
        placement: "top",
        render: ({ id }: { id: string }) => (
          <Toast
            id={id}
            action="success"
            title={"Produto criado com sucesso"}
            onClose={() => toast.close(id)}
          />
        ),
      });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError && error.message;

      return toast.show({
        placement: "top",
        render: ({ id }: { id: string }) => (
          <Toast
            id={id}
            action="error"
            title={
              typeof title === "string" ? title : "Erro ao criar o produto"
            }
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setLoadingData(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: height * 0.12 }}
        showsVerticalScrollIndicator={false}
      >
        <Center gap="$1" h={"17%"} bg="$blueLight">
          <Text color="$white" fontSize="$lg" fontWeight="$bold">
            Pré visualização do anúncio
          </Text>
          <Text color="$white" fontSize="$md">
            É assim que seu produto vai aparecer!
          </Text>
        </Center>

        <Box flex={1}>
          <Carousel
            loop={false}
            width={width}
            height={height * 0.3}
            data={images}
            renderItem={({ item }) => (
              <Image
                w="$full"
                h="$full"
                resizeMode="cover"
                source={
                  idProductExist
                    ? {
                        uri: `${api.defaults.baseURL}/images/${item.path}`,
                      }
                    : { uri: item.uri }
                }
              />
            )}
          />
        </Box>

        <Container scrollable>
          <VStack paddingHorizontal="$4">
            <HStack alignItems="center" gap="$2">
              <UserPhoto
                source={{
                  uri: `${api.defaults.baseURL}/images/${user.avatar}`,
                }}
                sizeImage={40}
              />
              <Text color="$gray1" fontFamily="$heading">
                {user.name}
              </Text>
            </HStack>
            <UsedOrNew
              isViewAds
              isUsed={selectedOption === "new_product" ? true : false}
              my="$4"
            />
            <HStack alignItems="center" mb="$4">
              <Text
                color="$gray1"
                fontSize="$2xl"
                fontFamily="$heading"
                flex={1}
                numberOfLines={1}
              >
                {product_title}
              </Text>
              <HStack gap="$1" alignItems="center">
                <Text color="$blue" fontSize="$lg" fontFamily="$heading">
                  R$
                </Text>
                <Text
                  color="$blue"
                  fontSize="$2xl"
                  fontFamily="$heading"
                  mt={-5}
                >
                  {formatCurrency(value_product || "")}
                </Text>
              </HStack>
            </HStack>
            <Text fontSize="$lg" color="$gray2" mb="$4">
              {description_title}
            </Text>
            <HStack alignItems="center" gap="$2" mb="$4">
              <Text fontSize="$lg" color="$gray1" fontFamily="$heading">
                Aceita troca?
              </Text>
              <Text fontSize="$lg" color="$gray1" fontFamily="$body">
                {switchValue ? "Sim" : "Não"}
              </Text>
            </HStack>
            <Text fontSize="$lg" color="$gray1" fontFamily="$heading" mb="$2">
              Meios de pagamento:
            </Text>
            <GeneratePaymentMethods paymentMethods={checkbox} />
          </VStack>
        </Container>
      </ScrollView>
      <HStack
        alignItems="center"
        justifyContent="center"
        gap={"$4"}
        w="$full"
        h={"12%"}
        bg="$white"
      >
        <Button
          onPress={handleEdit}
          Icon={<Icon as={ArrowLeft} color="$gray2" size="lg" />}
          title="Voltar e editar"
          type="outiline"
          sizeButton="small"
        />
        <Button
          loading={loadingData}
          onPress={handleCreateProduct}
          Icon={<Icon as={Tag} color="$gray6" size="lg" />}
          title="Publicar"
          sizeButton="small"
        />
      </HStack>
    </VStack>
  );
}
