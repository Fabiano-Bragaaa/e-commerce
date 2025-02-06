import { Container } from "@components/Container/Container";
import { HeaderHome } from "@components/HeaderHome/HeaderHome";
import { HStack, Icon, Text, VStack } from "@gluestack-ui/themed";

import { gluestackUIConfig } from "../../../config/gluestack-ui.config";

import AdsSvg from "@assets/icons/ads.svg";
import { ArrowRight } from "lucide-react-native";
import { FlatList, Pressable } from "react-native";
import { Input } from "@components/Input/Input";
import { useState } from "react";
import { Ads } from "@components/Ads/Ads";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesdProps } from "@routes/app.routes";

export function Home() {
  const [product, setProduct] = useState(["1", "2", "3", "4"]);

  const { tokens } = gluestackUIConfig;
  const color = tokens.colors.blue;
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
            4
          </Text>
          <Text color="$gray2" fontSize="$md">
            anúncios ativos
          </Text>
        </VStack>
        <Pressable>
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
        keyExtractor={(item) => item}
        style={{ width: "100%" }}
        renderItem={({}) => (
          <Ads
            isUsed
            userPhoto
            price={5990}
            title="Tenis vermelho"
            uri="https://preview.redd.it/so-musashi-is-a-big-strong-mf-any-more-examples-of-that-v0-5val7s82ajmb1.jpg?width=728&format=pjpg&auto=webp&s=00dd2b2890865d5bdce627b8b88c74463f938978"
          />
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </VStack>
  );
}
