import { Ads } from "@components/Ads";
import { HeaderMyAds } from "@components/HeaderMyAds";
import { SelectFilter } from "@components/SelectFilter";
import { AdsTypeDTO } from "@dtos/AdsDTO";
import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesNavigationProps } from "@routes/app.routes";
import { useState } from "react";
import { FlatList } from "react-native";

export function MyAds() {
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

  const navigation = useNavigation<AppRoutesNavigationProps>();

  function handleInactiveOrActiveAds(id: string) {
    navigation.navigate("disableAds");
  }

  return (
    <VStack flex={1} p="$5">
      <HeaderMyAds />
      <HStack w="$full" alignItems="center" mt="$6">
        <Text flex={1} color="$gray200" fontFamily="$body" fontSize="$lg">
          9 anúncios
        </Text>
        <SelectFilter />
      </HStack>
      <FlatList
        data={ads}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Ads
            showAvatar={false}
            data={item}
            onPress={() => handleInactiveOrActiveAds(item.id)}
          />
        )}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 14 }}
        style={{ marginTop: 5 }}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
