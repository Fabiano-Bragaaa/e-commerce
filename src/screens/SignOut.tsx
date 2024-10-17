import { Button } from "@components/Button";
import { Center, HStack, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesNavigationProps } from "@routes/app.routes";

export function SignOut() {
  const { navigate } = useNavigation<AppRoutesNavigationProps>();
  return (
    <Center flex={1} bg="rgba(0,0,0, 0.60)" p="$5">
      <Center w="$full" h={300} bg="$white" rounded="$2xl" p="$3">
        <Text color="$black" fontFamily="$heading" fontSize="$2xl">
          Você será desconectado
        </Text>
        <Text color="$gray100" fontFamily="$body" fontSize="$lg">
          Tem certeza que quer sair do aplicativo?
        </Text>
        <HStack gap="$4" mt="$8" alignItems="center">
          <Button
            title="Voltar"
            buttonVariant="basic"
            buttonVariantText="secondary"
            buttonVariantW="basic"
            onPress={() => navigate("home")}
          />
          <Button
            title="Desconectar"
            buttonVariantW="basic"
            buttonVariant="secondary"
          />
        </HStack>
      </Center>
    </Center>
  );
}
