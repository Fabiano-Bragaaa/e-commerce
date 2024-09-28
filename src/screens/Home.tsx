import { HomeHeader } from "@components/HomeHeader";
import { MyAdsCard } from "@components/MyAdsCard";
import { VStack, Text } from "@gluestack-ui/themed";

export function Home() {
  return (
    <VStack flex={1} p="$3">
      <HomeHeader />
      <Text color="$gray200" mt="$10" fontFamily="$body" fontSize="$lg" mb="$4">
        Seus produtos anunciados para venda
      </Text>
      <MyAdsCard />
      <Text color="$gray200" mt="$10" fontFamily="$body" fontSize="$lg" mb="$4">
        Compre produtos variados
      </Text>
    </VStack>
  );
}
