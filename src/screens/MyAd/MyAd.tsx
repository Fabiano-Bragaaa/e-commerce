import { Button } from "@components/Button/Button";
import { Container } from "@components/Container/Container";
import { Loading } from "@components/Loading/Loading";
import { Toast } from "@components/Toast/Toast";
import { UsedOrNew } from "@components/UsedOrNew/UsedOrNew";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
import { ImagesType, MyProductsDTO, PaymentType } from "@dtos/MyProductsDTO";
import { ProductImageDTO } from "@dtos/ProductImageDTO";
import {
  Box,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import { useAuth } from "@hooks/useAuth";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AppNavigatorRoutesdProps, AppRoutes } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { GeneratePaymentMethods } from "@utils/generatePaymentMethods";
import { formatCurrency } from "@utils/validationValueProduct";
import { ArrowLeft, PencilLine, Power, Trash } from "lucide-react-native";

import { useCallback, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width, height } = Dimensions.get("window");

export function MyAd() {
  const [product, setProduct] = useState<MyProductsDTO | null>(null);
  const [visibleProduct, setVisibleProduct] = useState<boolean | undefined>(
    product?.is_active
  );
  const [images, setImages] = useState<ProductImageDTO[]>([]);
  const [paymentNames, setPaymentNames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAction, setLoadingAction] = useState<boolean>(false);

  const route = useRoute<RouteProp<AppRoutes, "myAd">>();
  const { id } = route.params;

  const { navigate, goBack } = useNavigation<AppNavigatorRoutesdProps>();

  const { user } = useAuth();

  const toast = useToast();

  function navigateToEdit() {
    if (product) {
      navigate("createAds", {
        checkbox: paymentNames,
        description_title: product.description,
        images: images,
        product_title: product.name,
        selectedOption: product.is_new ? "new_product" : "old_product",
        switchValue: product.accept_trade,
        value_product: String(product.price),
        editable: true,
        idProductExist: product.id,
      });
    }
  }

  async function handleChangeVisible(id: string) {
    try {
      setVisibleProduct(!visibleProduct);
      await api.patch(`/products/${id}`, {
        is_active: visibleProduct,
      });

      console.log("visualição trocada com sucesso");
    } catch {
      console.log("erro ao trocar a visualização");
    }
  }

  async function handleDeleteAd(id: string) {
    try {
      setLoadingAction(true);
      await api.delete(`/products/${id}`);

      navigate("bottomTabs", { screen: "myAds" });

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            action="success"
            title={"Produto deletado com sucesso"}
            onClose={() => toast.close(id)}
          />
        ),
      });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possivel apagar o produto";

      return toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setLoadingAction(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      async function fetchMyProduct() {
        try {
          setLoading(true);
          const { data } = await api.get(`/products/${id}`);

          setImages(data.product_images);
          setProduct(data);
          const names = data.payment_methods.map(
            (method: PaymentType) => method.key
          );

          setPaymentNames(names);
        } catch (error) {
          const isAppError = error instanceof AppError;

          const title = isAppError
            ? error.message
            : "Não foi possivel carregar os seus produtos";

          return toast.show({
            placement: "top",
            render: ({ id }) => (
              <Toast
                id={id}
                action="error"
                title={title}
                onClose={() => toast.close(id)}
              />
            ),
          });
        } finally {
          setLoading(false);
        }
      }

      fetchMyProduct();
    }, [])
  );

  console.log(paymentNames);

  return (
    <VStack flex={1}>
      {product && !loading ? (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: height * 0.12,
          }}
          showsVerticalScrollIndicator={false}
        >
          <HStack
            h="8%"
            paddingHorizontal="$4"
            mt="$6"
            alignItems="center"
            justifyContent="space-between"
          >
            <Pressable onPress={goBack}>
              <Icon as={ArrowLeft} color="$gray2" size="xl" />
            </Pressable>
            <Pressable onPress={navigateToEdit}>
              <Icon as={PencilLine} color="$gray2" size="lg" />
            </Pressable>
          </HStack>
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
                  source={{
                    uri: `${api.defaults.baseURL}/images/${item.path}`,
                  }}
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
              <UsedOrNew isViewAds isUsed={product.is_new} my="$4" />
              <HStack alignItems="center" mb="$4">
                <Text
                  color="$gray1"
                  fontSize="$2xl"
                  fontFamily="$heading"
                  flex={1}
                  numberOfLines={1}
                >
                  {product.name}
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
                    {formatCurrency(product.price)}
                  </Text>
                </HStack>
              </HStack>
              <Text fontSize="$lg" color="$gray2" mb="$4">
                {product.description}
              </Text>
              <HStack alignItems="center" gap="$2" mb="$4">
                <Text fontSize="$lg" color="$gray1" fontFamily="$heading">
                  Aceita troca?
                </Text>
                <Text fontSize="$lg" color="$gray1" fontFamily="$body">
                  {product.accept_trade ? "Sim" : "Não"}
                </Text>
              </HStack>
              <Box>
                <Text
                  fontSize="$lg"
                  color="$gray1"
                  fontFamily="$heading"
                  mb="$2"
                >
                  Meios de pagamento:
                </Text>
                <GeneratePaymentMethods paymentMethods={paymentNames} />
                <Box gap="$4" mt="$4">
                  <Button
                    Icon={<Icon as={Power} color="$white" size="lg" />}
                    type={visibleProduct ? "secondary" : "primary"}
                    title={
                      visibleProduct ? "Desativar anúncio" : "Reativar anúncio"
                    }
                    onPress={() => handleChangeVisible(id)}
                  />
                  <Button
                    Icon={<Icon as={Trash} color="$gray1" size="lg" />}
                    type="outiline"
                    title="Excluir anúncio"
                    onPress={() => handleDeleteAd(id)}
                    loading={loadingAction}
                  />
                </Box>
              </Box>
            </VStack>
          </Container>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </VStack>
  );
}
