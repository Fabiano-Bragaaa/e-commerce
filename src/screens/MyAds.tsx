import { HeaderMyAds } from "@components/HeaderMyAds";
import { SelectFilter } from "@components/SelectFilter";
import { Center, HStack, Text, VStack } from "@gluestack-ui/themed";

export function MyAds() {
  return (
    <VStack flex={1} p="$5">
      <HeaderMyAds />
      <HStack w="$full" alignItems="center" mt="$6">
        <Text flex={1} color="$gray200" fontFamily="$body" fontSize="$lg">
          9 anúncios
        </Text>
        <SelectFilter />
      </HStack>
    </VStack>
  );
}
