import { UsedOrNew } from "@components/UsedOrNew/UsedOrNew";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
import { Box, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { formatCurrency } from "@utils/validationValueProduct";

type Props = {
  uri: string;
  title: string;
  price: number;
  userPhoto?: boolean;
  isUsed: boolean;
  visibled?: boolean;
  userImage?: string;
};

export function Ads({
  uri,
  title,
  price,
  visibled = true,
  userImage,
  userPhoto = false,
  isUsed,
}: Props) {
  const { user } = useAuth();
  return (
    <VStack mr="$4" mb="$4">
      {visibled ? (
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
      ) : (
        <Box position="relative">
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
          <Box
            position="absolute"
            rounded="$lg"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0, 0, 0, 0.6)"
            justifyContent="flex-end"
            pb="$2"
            pl="$2"
          >
            <Text color="$gray6" fontSize="$sm" fontWeight="bold">
              ANÚNCIO DESATIVADO
            </Text>
          </Box>
        </Box>
      )}

      <HStack
        position="absolute"
        paddingHorizontal="$2"
        pt="$1"
        top={1}
        right={1}
        w={"100%"}
        justifyContent="space-between"
      >
        {userPhoto ? (
          <UserPhoto
            source={{
              uri: userImage,
            }}
            sizeImage={40}
            isUser
          />
        ) : (
          <Box />
        )}

        <UsedOrNew isUsed={isUsed} />
      </HStack>
      <Text
        color={visibled ? "$gray1" : "$gray4"}
        fontSize="$lg"
        mt="$3"
        mb="$1"
        numberOfLines={1}
      >
        {title}
      </Text>
      <HStack gap="$1" alignItems="center">
        <Text
          color={visibled ? "$gray1" : "$gray4"}
          fontSize="$lg"
          fontFamily="$heading"
        >
          R$
        </Text>
        <Text
          color={visibled ? "$gray1" : "$gray4"}
          fontSize="$2xl"
          fontFamily="$heading"
          mt={-5}
        >
          {formatCurrency(price)}
        </Text>
      </HStack>
    </VStack>
  );
}
