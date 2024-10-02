import { Ads } from "@components/Ads";
import { HeaderMyAds } from "@components/HeaderMyAds";
import { SelectFilter } from "@components/SelectFilter";
import { Center, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { FlatList } from "react-native";

export function MyAds() {
  const [ads, setAds] = useState(["1", "2", "3", "4"]);

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
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Ads showAvatar={false} />}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 14 }}
        style={{ marginTop: 5 }}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
