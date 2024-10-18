import { ScrollView } from "react-native";
import { Box, Center, HStack, Text, VStack } from "@gluestack-ui/themed";

import { ImageAds } from "@components/ImageAds";
import { TypeAds } from "@components/TypeAds";
import { UserPhoto } from "@components/UserPhoto";

import Boleto from "@assets/boleto.svg";
import Pix from "@assets/pix.svg";
import Cartao from "@assets/cartao.svg";
import Deposito from "@assets/deposito.svg";
import Dinheiro from "@assets/dinheiro.svg";

import PagerView from "react-native-pager-view";
import { TypePayment } from "@components/TypePayment";
import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppRoutesNavigationProps } from "@routes/app.routes";

import Public from "@assets/public.svg";
import ArrowLeft from "@assets/arrow-left.svg";

type RoutesParamsProps = {
  title: string;
  description: string;
  radioSelect: string;
  price: string;
  images: string[];
  values: string[] | [];
  switchValue: boolean;
};

export function PreviewAds() {
  const navigation = useNavigation<AppRoutesNavigationProps>();

  const route = useRoute();
  const {
    title,
    description,
    images,
    values,
    radioSelect,
    switchValue,
    price,
  } = route.params as RoutesParamsProps;

  function getPaymentIcon(method: string | null) {
    switch (method) {
      case "Boleto":
        return <TypePayment icon={Boleto} title="Boleto" />;
      case "Pix":
        return <TypePayment icon={Pix} title="Pix" />;
      case "CartaDeCredito":
        return <TypePayment icon={Cartao} title="Cartão" />;
      case "Dinheiro":
        return <TypePayment icon={Dinheiro} title="Dinheiro" />;
      case "DepositoBancario":
        return <TypePayment icon={Deposito} title="Deposito" />;
      default:
        return null;
    }
  }

  function handleEditData() {
    navigation.navigate("editAds", {
      title,
      description,
      images,
      values,
      radioSelect,
      switchValue,
      price,
    });
  }

  return (
    <VStack flex={1}>
      <ScrollView
        style={{ flexGrow: 1 }}
        contentContainerStyle={{ paddingBottom: 70 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack w="$full" h={150} bg="$blue1" justifyContent="flex-end">
          <Center mb="$6">
            <Text color="$white" fontFamily="$heading" mb="$1">
              Pré visualização do anúncio
            </Text>
            <Text color="$white" fontFamily="$body">
              É assim que seu produto vai aparecer!
            </Text>
          </Center>
        </VStack>

        <PagerView initialPage={0} style={{ width: "100%", height: 320 }}>
          {images.map((image, index) => (
            <ImageAds
              source={{
                uri: image,
              }}
              alt="foto do produto"
              w="$full"
              h={320}
              resizeMode="cover"
              roundedType
              key={index}
            />
          ))}
        </PagerView>
        <VStack p="$5" flex={1}>
          <HStack alignItems="center" gap="$4">
            <UserPhoto
              w="$9"
              h="$9"
              source={{ uri: "https://github.com/Fabiano-Bragaaa.png" }}
              alt="quem publicou"
            />
            <Text color="$black" fontFamily="$body" fontSize="$lg">
              Fabiano Braga
            </Text>
          </HStack>
          <TypeAds title={radioSelect === "newProduct" ? "novo" : "usado"} />
          <HStack
            alignItems="center"
            gap="$4"
            justifyContent="space-between"
            my="$3"
          >
            <Text fontFamily="$heading" color="$black" fontSize="$2xl">
              {title}
            </Text>
            <HStack alignItems="center" gap="$1">
              <Text color="$blue1" fontSize="$lg">
                R$
              </Text>
              <Text color="$blue1" fontSize="$2xl" fontFamily="$heading">
                {price}
              </Text>
            </HStack>
          </HStack>
          <Text
            color="$gray100"
            fontSize="$lg"
            fontFamily="$body"
            textTransform="capitalize"
          >
            {description}
          </Text>
          <HStack my="$5" alignItems="center" gap="$2">
            <Text color="$gray100" fontFamily="$heading">
              Aceita troca?
            </Text>
            <Text color="$gray100" fontFamily="$body">
              {switchValue ? "Sim" : "Não"}
            </Text>
          </HStack>
          <Box>
            {values.map((method, index) => (
              <HStack key={index}>{getPaymentIcon(method)}</HStack>
            ))}
          </Box>
        </VStack>
      </ScrollView>
      <Box
        position="absolute"
        bottom={0}
        w="$full"
        h={"9%"}
        bg="$white"
        flexDirection="row"
        gap="$5"
        justifyContent="center"
      >
        <Button
          title="Voltar e editar"
          buttonVariant="basic"
          buttonVariantW="secondary"
          buttonVariantText="secondary"
          onPress={handleEditData}
          icon={ArrowLeft}
        />
        <Button
          title="Publicar"
          buttonVariant="primary"
          buttonVariantW="secondary"
          icon={Public}
        />
      </Box>
    </VStack>
  );
}
