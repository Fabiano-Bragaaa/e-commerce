import { Box, Center, HStack, Text, VStack } from "@gluestack-ui/themed";
import { UserPhoto } from "@components/UserPhoto";
import { ImageAds } from "@components/ImageAds";

export function Ads() {
  return (
    <VStack w="48%" justifyContent="center" my="$2">
      <Box>
        <ImageAds
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3avUFThjxODyz5vGd7Z1VAErcYQrqi5fweg&s.png",
          }}
          alt="foto do produto"
          w="$full"
          h={120}
          resizeMode="cover"
        />
        <HStack position="absolute" alignItems="center" px="$2">
          <Box flex={1}>
            <UserPhoto
              source={{ uri: "https://github.com/Fabiano-Bragaaa.png" }}
              h="$10"
              w="$10"
              alt="usuario que postou"
              type="secondary"
            />
          </Box>
          <Center bg="$blue1" h="$7" rounded={30} w={55}>
            <Text color="$white" fontFamily="$heading">
              NOVO
            </Text>
          </Center>
        </HStack>
      </Box>
      <Box mt="$1" gap="$1">
        <Text color="$gray100" fontFamily="$body" fontSize={18}>
          Tenis vermelho
        </Text>
        <HStack alignItems="center">
          <Text color="$gray100" fontFamily="$heading" mr="$1">
            R$
          </Text>
          <Text color="gray100" fontFamily="$heading" fontSize={20}>
            59,90
          </Text>
        </HStack>
      </Box>
    </VStack>
  );
}
