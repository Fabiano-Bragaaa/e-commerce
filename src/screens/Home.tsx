import { useState } from "react";
import { FlatList, Modal, View } from "react-native";

import { VStack, Text } from "@gluestack-ui/themed";

import { HomeHeader } from "@components/HomeHeader";
import { InputHome } from "@components/InputHome";
import { MyAdsCard } from "@components/MyAdsCard";
import { Ads } from "@components/Ads";
import { ModalContent } from "@components/ModalContent";
import { AdsTypeDTO } from "@dtos/AdsDTO";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesNavigationProps } from "@routes/app.routes";

export function Home() {
  const [ads, setAds] = useState<AdsTypeDTO[]>([
    {
      id: "1",
      title: "Tenis vermelho",
      subtitle: "45,90",
    },
    {
      id: "2",
      title: "Tenis preto",
      subtitle: "55,90",
    },
    {
      id: "3",
      title: "Tenis azul",
      subtitle: "35,90",
    },
    {
      id: "4",
      title: "Tenis amarelo",
      subtitle: "25,90",
    },
  ]);
  const [open, setOpen] = useState(false);

  const navigation = useNavigation<AppRoutesNavigationProps>();

  function handleOpenAds(id: string) {
    navigation.navigate("ads");
  }

  return (
    <VStack flex={1} p="$3">
      <HomeHeader />
      <Text color="$gray200" mt="$3" fontFamily="$body" fontSize="$lg" mb="$4">
        Seus produtos anunciados para venda
      </Text>
      <MyAdsCard />
      <Text color="$gray200" mt="$3" fontFamily="$body" fontSize="$lg">
        Compre produtos variados
      </Text>
      <InputHome placeholder="Buscar anúncio" openModal={() => setOpen(true)} />
      <FlatList
        data={ads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Ads onPress={() => handleOpenAds(item.id)} data={item} />
        )}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 14 }}
        style={{ marginTop: 5 }}
        showsVerticalScrollIndicator={false}
      />
      <Modal visible={open} transparent animationType="fade">
        <View style={{ flex: 1 }}>
          <ModalContent onClose={() => setOpen(false)} />
        </View>
      </Modal>
    </VStack>
  );
}
