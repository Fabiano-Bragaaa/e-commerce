import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { UserPhoto } from "@components/UserPhoto";

import { Button } from "@components/Button";

export function HomeHeader() {
  return (
    <HStack alignItems="center" pt="$10">
      <UserPhoto
        source={{ uri: "https://github.com/Fabiano-Bragaaa.png" }}
        alt="foto do usuario"
        w="$16"
        h="$16"
      />
      <VStack flex={1} pl="$4">
        <Text color="$black" fontFamily="$body" fontSize="$xl">
          Boas vindas,
        </Text>
        <Text color="$black" fontFamily="$heading" fontSize="$xl">
          Fabiano!
        </Text>
      </VStack>
      <Button
        title="Criar anúncio"
        buttonVariantW="secondary"
        buttonVariant="secondary"
      />
    </HStack>
  );
}
