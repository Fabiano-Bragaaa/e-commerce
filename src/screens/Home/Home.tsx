import { Container } from "@components/Container/Container";
import { HeaderHome } from "@components/HeaderHome/HeaderHome";
import { HStack, Icon, Text, VStack } from "@gluestack-ui/themed";

import { gluestackUIConfig } from "../../../config/gluestack-ui.config";

import AdsSvg from "@assets/icons/ads.svg";
import { ArrowRight } from "lucide-react-native";
import { FlatList, Pressable } from "react-native";
import { Input } from "@components/Input/Input";
import { useCallback, useState } from "react";
import { Ads } from "@components/Ads/Ads";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesdProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AllProductDTO } from "@dtos/ProductDTO";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading/Loading";
import { MyProductsDTO } from "@dtos/MyProductsDTO";

export function Home() {
  const [product, setProduct] = useState<AllProductDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [myProducts, setMyProducts] = useState<number>();

  const { user } = useAuth();
  const { navigate } = useNavigation<AppNavigatorRoutesdProps>();
  const { tokens } = gluestackUIConfig;
  const color = tokens.colors.blue;

  function navigateToMyAds() {
    navigate("bottomTabs", { screen: "myAds" });
  }

  function navigateToAds(id: string) {
    navigate("myAd", { id, isHome: true });
  }

  useFocusEffect(
    useCallback(() => {
      async function getProducts() {
        try {
          setLoading(true);
          const { data: productsData } = await api.get<AllProductDTO[]>(
            "/products"
          );

          const { data: myProductsData } = await api.get<AllProductDTO[]>(
            "/users/products"
          );

          const myProductLenght = myProductsData.filter(
            (item) => item.is_active
          ).length;

          setMyProducts(myProductLenght);

          const myProduct = myProductsData.filter((item) => item.is_active);

          const formattedMyProducts = myProduct.map((item) => ({
            ...item,
            user: { avatar: user.avatar },
          }));

          const combinedProducts = [...productsData, ...formattedMyProducts];
          setProduct(combinedProducts);
        } catch (error) {
          console.error("Erro ao buscar produtos:", error);
        } finally {
          setLoading(false);
        }
      }

      getProducts();
    }, [])
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <VStack paddingHorizontal="$4" flex={1}>
      <Container>
        <HeaderHome />
      </Container>

      <Text color="$gray3" fontSize="$lg" mt="$6" mb="$4">
        Seus produtos anunciados para venda
      </Text>

      <HStack
        bg="#DBE1EC"
        p="$3"
        borderRadius="$lg"
        alignItems="center"
        gap="$5"
      >
        <AdsSvg fill={color} width={30} height={30} />
        <VStack>
          <Text color="$gray2" fontSize="$2xl" fontFamily="$heading">
            {myProducts}
          </Text>
          <Text color="$gray2" fontSize="$md">
            {myProducts === 1 ? "anúncio ativo" : "anúncios ativos"}
          </Text>
        </VStack>
        <Pressable onPress={navigateToMyAds}>
          <HStack gap="$2" alignItems="center">
            <Text color="$blue" fontSize="$lg">
              Meus anúncios
            </Text>
            <Icon as={ArrowRight} color="$blue" size="lg" />
          </HStack>
        </Pressable>
      </HStack>
      <Text color="$gray3" fontSize="$lg" mt="$6" mb="$4">
        Compre produtos variados
      </Text>

      <Input placeholder="Buscar anúncio" isSearch />

      <FlatList
        data={product}
        keyExtractor={(item) => item.id}
        style={{ width: "100%" }}
        renderItem={({ item }) => (
          <>
            <Pressable onPress={() => navigateToAds(item.id)}>
              <Ads
                isUsed={item.is_new}
                userImage={`${api.defaults.baseURL}/images/${item.user.avatar}`}
                userPhoto
                price={item.price}
                title={item.name}
                uri={`${api.defaults.baseURL}/images/${item.product_images[0].path}`}
              />
            </Pressable>
          </>
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </VStack>
  );
}
