import { Center, HStack, Text, VStack } from "@gluestack-ui/themed";

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

export function PreviewAds() {
  return (
    <VStack flex={1}>
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
        <HStack my="$3" alignItems="center" gap="$2">
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
      </VStack>
    </VStack>
  );
}
