import { Button } from "@components/Button/Button";

import { UserPhoto } from "@components/UserPhoto/UserPhoto";
import { HStack, Text, VStack } from "@gluestack-ui/themed";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesdProps } from "@routes/app.routes";
import { api } from "@services/api";

export function HeaderHome() {
  const { user } = useAuth();

  const { navigate } = useNavigation<AppNavigatorRoutesdProps>();

  function navigateToCreateAds() {
    navigate("createAds");
  }

  return (
    <HStack alignItems="center" pt="$4" gap="$2">
      <UserPhoto
        source={{
          uri: `${api.defaults.baseURL}/images/${user.avatar}`,
        }}
        alt="Foto de perfil"
        sizeImage={60}
      />
      <VStack gap="$1">
        <Text color="gray1" fontSize="$lg" fontFamily="$body">
          Boas vindas,
        </Text>
        <Text color="gray1" fontSize="$lg" fontFamily="$heading">
          {`${user.name}!`}
        </Text>
      </VStack>
      <Button
        title="Criar anúncio"
        type="secondary"
        sizeButton="small"
        rounded="$lg"
        onPress={navigateToCreateAds}
      />
    </HStack>
  );
}
