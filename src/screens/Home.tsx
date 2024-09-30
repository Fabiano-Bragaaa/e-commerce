import { useState } from "react";
import { FlatList, Modal, View } from "react-native";

import { VStack, Text } from "@gluestack-ui/themed";

import { HomeHeader } from "@components/HomeHeader";
import { InputHome } from "@components/InputHome";
import { MyAdsCard } from "@components/MyAdsCard";
import { Ads } from "@components/Ads";
import { ModalContent } from "@components/ModalContent";

export function Home() {
  const [ads, setAds] = useState(["1", "2", "3", "4", "5", "6", "7", "8"]);
  const [open, setOpen] = useState(false);
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
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Ads />}
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
