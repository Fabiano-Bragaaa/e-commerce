import { ImageBackground, ScrollView } from "react-native";
import { Box, HStack, Text, VStack } from "@gluestack-ui/themed";

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
import { useNavigation } from "@react-navigation/native";
import { AppRoutesNavigationProps } from "@routes/app.routes";
import { HeaderCreateAds } from "@components/HeaderCreateAds";

export function ActiveAds() {
  const navigation = useNavigation<AppRoutesNavigationProps>();
  return (
    <VStack flex={1}>
      <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <VStack h={100} w="$full" p="$5">
          <HeaderCreateAds
            showEditIcon
            title=""
            onPress={() => navigation.navigate("myAds")}
          />
        </VStack>
        <Box h={320}>
          <PagerView
            initialPage={0}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <ImageAds
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3avUFThjxODyz5vGd7Z1VAErcYQrqi5fweg&s.png",
              }}
              alt="foto do produto"
              w="$full"
              h={320}
              resizeMode="cover"
              roundedType
              key={1}
            />
            <ImageAds
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3avUFThjxODyz5vGd7Z1VAErcYQrqi5fweg&s.png",
              }}
              alt="foto do produto"
              w="$full"
              h={320}
              resizeMode="cover"
              roundedType
              key={2}
            />
            <ImageAds
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3avUFThjxODyz5vGd7Z1VAErcYQrqi5fweg&s.png",
              }}
              alt="foto do produto"
              w="$full"
              h={320}
              resizeMode="cover"
              roundedType
              key={3}
            />
          </PagerView>

          <Box
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            bg="rgba(0,0,0,.5)"
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
            pointerEvents="none"
          >
            <Text color="$white" fontSize="$md" fontFamily="$heading">
              ANÚNCIO DESATIVADO
            </Text>
          </Box>
        </Box>

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
          <TypeAds title="Usado" />
          <HStack
            alignItems="center"
            gap="$4"
            justifyContent="space-between"
            my="$3"
          >
            <Text fontFamily="$heading" color="$black" fontSize="$2xl">
              Luminaria pendente
            </Text>
            <HStack alignItems="center" gap="$1">
              <Text color="$blue1" fontSize="$lg">
                R$
              </Text>
              <Text color="$blue1" fontSize="$2xl" fontFamily="$heading">
                45,00
              </Text>
            </HStack>
          </HStack>
          <Text
            color="$gray100"
            fontSize="$lg"
            fontFamily="$body"
            textTransform="capitalize"
          >
            Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
            Vitae ante leo eget maecenas urna mattis cursus.
          </Text>
          <HStack my="$5" alignItems="center" gap="$2">
            <Text color="$gray100" fontFamily="$heading">
              Aceita troca?
            </Text>
            <Text color="$gray100" fontFamily="$body">
              Não
            </Text>
          </HStack>
          <TypePayment icon={Boleto} title="Boleto" />
          <TypePayment icon={Pix} title="Pix" />
          <TypePayment icon={Cartao} title="Cartão" />
          <TypePayment icon={Dinheiro} title="Dinheiro" />
          <TypePayment icon={Deposito} title="Deposito" />
          <Button
            title="Reativar anúncio"
            buttonVariant="primary"
            buttonVariantW="primary"
          />
          <Button
            title="excluir anuncio"
            buttonVariant="basic"
            buttonVariantText="secondary"
            buttonVariantW="primary"
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
