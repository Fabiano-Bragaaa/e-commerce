import { Center, HStack, Icon, Image, Text } from "@gluestack-ui/themed";

import Logo from "@assets/logo.png";

import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  return (
    <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <Center flex={1} bg="$gray600" p="$8">
        <Image alt="logo" source={Logo} w="$32" h={100} />
        <Highlight
          title="marketspace"
          subtitle="Seu espaço de compra e venda"
        />
        <Text mt="$20" color="$gray100" fontFamily="$body" fontSize="$lg">
          Acesse sua conta
        </Text>
        <Input placeholder="E-mail" />
        <HStack>
          <Input placeholder="Senha" securityType />
        </HStack>
        <Button title="Entrar" />

        <Text mt="$24" color="$gray100" fontSize="$lg" fontFamily="$heading">
          Ainda não tem acesso?
        </Text>
        <Button
          title="Criar uma conta"
          buttonVariant="basic"
          buttonVariantText="secondary"
          onPress={() => navigation.navigate("signUp")}
        />
      </Center>
    </ScrollView>
  );
}
