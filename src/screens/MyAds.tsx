import { HeaderMyAds } from "@components/HeaderMyAds";
import { Center, Text, VStack } from "@gluestack-ui/themed";

export function MyAds() {
  return (
    <VStack flex={1} p="$5">
      <HeaderMyAds />
    </VStack>
  );
}
