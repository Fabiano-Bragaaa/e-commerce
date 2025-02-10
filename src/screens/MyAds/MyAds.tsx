import { Ads } from "@components/Ads/Ads";
import { Container } from "@components/Container/Container";
import { Loading } from "@components/Loading/Loading";
import { Toast } from "@components/Toast/Toast";
import { MyProductsDTO } from "@dtos/MyProductsDTO";
import { Spinner, useToast } from "@gluestack-ui/themed";
import {
  Center,
  ChevronDownIcon,
  HStack,
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesdProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Plus } from "lucide-react-native";
import { useCallback, useState } from "react";
import { FlatList, Pressable } from "react-native";

export function MyAads() {
  const [product, setProduct] = useState<MyProductsDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const { navigate } = useNavigation<AppNavigatorRoutesdProps>();

  function navigateToCreateAds() {
    navigate("createAds", {
      checkbox: [],
      description_title: "",
      images: [],
      product_title: "",
      selectedOption: "new_product",
      switchValue: false,
      value_product: "",
      editable: false,
    });
  }

  function handleNavigateToAds(id: string) {
    navigate("myAd", { id });
  }

  useFocusEffect(
    useCallback(() => {
      async function fetchMyProducts() {
        try {
          setLoading(true);
          const { data } = await api.get("/users/products");

          setProduct(data);

          console.log("dados buscados", data);
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

      fetchMyProducts();
    }, [])
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} paddingHorizontal="$4">
      <Container>
        <HStack mt="$4" mb="$6">
          <Center flex={1}>
            <Text color="$gray1" fontSize={22} fontFamily="$heading">
              Meus anúncios
            </Text>
          </Center>
          <Pressable onPress={navigateToCreateAds}>
            <Icon as={Plus} color="$gray1" size="xl" />
          </Pressable>
        </HStack>
        <HStack alignItems="center" mb="$6">
          <Text flex={1} color="$gray2">
            9 anúncios
          </Text>
          <Select flex={1}>
            <SelectTrigger variant="outline" size="md">
              <SelectInput numberOfLines={1} placeholder="Escolha uma opção" />
              <SelectIcon mr="$3" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Todos" value="all" />
                <SelectItem label="Ativos" value="active" />
                <SelectItem label="Inativos" value="inactive" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </HStack>
        <FlatList
          data={product}
          keyExtractor={(item) => item.id}
          style={{ width: "100%" }}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleNavigateToAds(item.id)}>
              <Ads
                isUsed={item.is_new}
                title={item.name}
                price={item.price}
                uri={`${api.defaults.baseURL}/images/${item.product_images[0].path}`}
              />
            </Pressable>
          )}
          ListEmptyComponent={() => (
            <Center flex={1}>
              <Text color="$gray1" fontFamily="$heading">
                Parece que não há produto cadastrado
              </Text>
            </Center>
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </Container>
    </VStack>
  );
}
