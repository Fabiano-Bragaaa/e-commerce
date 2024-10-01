import { Center, HStack, Text, VStack, Icon } from "@gluestack-ui/themed";

import { Plus } from "lucide-react-native";

export function HeaderMyAds() {
  return (
    <VStack w="$full">
      <HStack mt="$8" alignItems="center" justifyContent="center">
        <Center flex={1}>
          <Text color="$gray100" fontFamily="$heading" fontSize="$2xl">
            Meus anúncios
          </Text>
        </Center>

        <Icon as={Plus} color="$gray100" fontFamily="$body" size="xl" />
      </HStack>
    </VStack>
  );
}
