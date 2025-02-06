import { UsedOrNew } from "@components/UsedOrNew/UsedOrNew";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
import { Box, Center, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { formatCurrency } from "@utils/validationValueProduct";

type Props = {
  uri: string;
  title: string;
  price: number;
  userPhoto?: boolean;
  isUsed: boolean;
};

export function Ads({ uri, title, price, userPhoto = false, isUsed }: Props) {
  const { user } = useAuth();
  return (
    <VStack mr="$4" mb="$4">
      <Image
        source={{
          uri,
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
        {userPhoto ? (
          <UserPhoto
            source={{
              uri: `${api.defaults.baseURL}/images/${user.avatar}`,
            }}
            sizeImage={40}
            isUser
          />
        ) : (
          <Box />
        )}

        <UsedOrNew isUsed={isUsed} />
      </HStack>
      <Text color="$gray2" fontSize="$lg" mt="$3" mb="$1">
        {title}
      </Text>
      <HStack gap="$1" alignItems="center">
        <Text color="$gray1" fontSize="$lg" fontFamily="$heading">
          R$
        </Text>
        <Text color="$gray1" fontSize="$2xl" fontFamily="$heading" mt={-5}>
          {formatCurrency(price)}
        </Text>
      </HStack>
    </VStack>
  );
}
