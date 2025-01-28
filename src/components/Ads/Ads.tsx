import { UsedOrNew } from "@components/UsedOrNew/UsedOrNew";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
import { Box, Center, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";

export function Ads() {
  const { user } = useAuth();
  return (
    <VStack mr="$6" mb="$4">
      <Image
        source={{
          uri: "https://preview.redd.it/so-musashi-is-a-big-strong-mf-any-more-examples-of-that-v0-5val7s82ajmb1.jpg?width=728&format=pjpg&auto=webp&s=00dd2b2890865d5bdce627b8b88c74463f938978",
        }}
        alt="ads"
        h="$32"
        w={170}
        resizeMode="cover"
        rounded="$lg"
      />

      <HStack
        position="absolute"
        paddingHorizontal="$2"
        pt="$1"
        top={1}
        w={"100%"}
        justifyContent="space-between"
      >
        <UserPhoto
          source={{
            uri: `${api.defaults.baseURL}/images/${user.avatar}`,
          }}
          sizeImage={40}
          isUser
        />

        <UsedOrNew isUsed={true} />
      </HStack>
      <Text color="$gray2" fontSize="$lg" mt="$3" mb="$1">
        Tenis vermelho
      </Text>
      <HStack gap="$1" alignItems="center">
        <Text color="$gray1" fontSize="$lg" fontFamily="$heading">
          R$
        </Text>
        <Text color="$gray1" fontSize="$2xl" fontFamily="$heading" mt={-5}>
          59,90
        </Text>
      </HStack>
    </VStack>
  );
}
