import { Container } from "@components/Container/Container";
import { HeaderHome } from "@components/HeaderHome/HeaderHome";
import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  Pressable,
  Switch,
  useToast,
} from "@gluestack-ui/themed";

import { gluestackUIConfig } from "../../../config/gluestack-ui.config";

import AdsSvg from "@assets/icons/ads.svg";
import { ArrowRight, X } from "lucide-react-native";
import { FlatList, Modal, StatusBar } from "react-native";
import { Input } from "@components/Input/Input";
import { useCallback, useState } from "react";
import { Ads } from "@components/Ads/Ads";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesdProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AllProductDTO } from "@dtos/ProductDTO";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading/Loading";
import { Checkbox } from "@components/Checkbox/Checkbox";
import { Button } from "@components/Button/Button";
import { CardSelect } from "@components/CardSelect/CardSelect";
import { Center } from "@gluestack-ui/themed";
import { Toast } from "@components/Toast/Toast";

export function Home() {
  const [product, setProduct] = useState<AllProductDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [myProducts, setMyProducts] = useState<number>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const [selected, setSelected] = useState<"new" | "used" | null>(null);
  const [checkbox, setCheckbox] = useState<string[]>([]);
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const [searchProduct, setSearchProduct] = useState<string>();

  const theme = gluestackUIConfig.tokens;
  const colors = theme.colors;

  const toast = useToast();

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

  function handleResetFilter() {
    setCheckbox([]);
    setSelected(null);
    setSwitchValue(false);
  }

  async function handleFilter() {
    try {
      if (checkbox.length === 0) {
        return toast.show({
          placement: "top",
          render: ({ id }) => (
            <Toast
              id={id}
              action="error"
              title={"Escolha pelo menos um meio de pagamento."}
              onClose={() => toast.close(id)}
            />
          ),
        });
      }

      setFilterLoading(true);
      const { data } = await api.get(
        `/products/?is_new=${
          selected === "new" ? true : false
        }&accept_trade=${switchValue}&payment_methods=${checkbox.join(
          "&payment_methods="
        )}`
      );

      setProduct(data);
      console.log(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setFilterLoading(false);
      setModalVisible(false);
      handleResetFilter();
    }
  }

  async function handleFetchProduct() {
  
      const checkboxsFull = ["pix", "card", "boleto", "cash", "deposit"];
      const { data } = await api.get(
        `/products/?payment_methods=${checkboxsFull.join(
          "&payment_methods="
        )}&query=${searchProduct}`
      );

      setProduct(data);
      setSearchProduct("");
    
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

      <Input
        placeholder="Buscar anúncio"
        value={searchProduct}
        onChangeText={setSearchProduct}
        searchProduct={handleFetchProduct}
        isSearch
        openModal={() => setModalVisible(true)}
      />

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
        ListEmptyComponent={() => (
          <Center flex={1}>
            <Text color="$gray1" fontFamily="$heading">
              Sem produtos.
            </Text>
            <Text>Vish, parece que não há produtos.</Text>
          </Center>
        )}
      />
      <Modal transparent visible={modalVisible} animationType="slide">
        <StatusBar
          barStyle="dark-content"
          backgroundColor="rgba(0,0,0,0.3)"
          translucent
        />
        <Pressable style={{ flex: 1 }} onPress={() => setModalVisible(false)}>
          <Box flex={1} bg="rgba(0,0,0,0.3)" />
        </Pressable>

        <Box
          bg="$white"
          h="70%"
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          p="$4"
          position="absolute"
          bottom={0}
          left={0}
          right={0}
        >
          <HStack>
            <Text fontFamily="$heading" fontSize={22} color="$black" flex={1}>
              Filtrar anúncios
            </Text>
            <Pressable onPress={() => setModalVisible(false)}>
              <Icon as={X} color="$gray3" size="lg" />
            </Pressable>
          </HStack>
          <VStack mt="$3" gap="$3">
            <Text color="$gray2" fontFamily="$heading" fontSize="$lg">
              Condição
            </Text>
            <CardSelect selected={selected} setSelected={setSelected} />
          </VStack>
          <VStack mt="$4" gap="$1">
            <Text color="$gray2" fontFamily="$heading" fontSize="$lg">
              Aceita troca?
            </Text>
            <Switch
              value={switchValue}
              onToggle={setSwitchValue}
              size="lg"
              trackColor={{ false: colors.gray5, true: colors.blue }}
              thumbColor={colors.white}
              alignSelf="flex-start"
            />
          </VStack>
          <VStack gap="$1" mb="$4">
            <Text color="$gray2" fontFamily="$heading" fontSize="$lg">
              Meios de pagamento aceitos
            </Text>
            <Checkbox
              value={checkbox}
              setValues={(key: string[]) => setCheckbox(key)}
            />
          </VStack>
          <HStack alignItems="center" justifyContent="center" gap={"$4"}>
            <Button
              onPress={handleResetFilter}
              title="Resetar filtros"
              type="outiline"
              sizeButton="fine"
            />
            <Button
              onPress={handleFilter}
              type="secondary"
              title="Aplicar filtros"
              sizeButton="fine"
              loading={filterLoading}
            />
          </HStack>
        </Box>
      </Modal>
    </VStack>
  );
}
