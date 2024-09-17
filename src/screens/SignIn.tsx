import { Center, HStack, Icon, Image, Text } from "@gluestack-ui/themed";

import Logo from "@assets/logo.png";

import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Eye } from "phosphor-react-native";

export function SignIn() {
  return (
    <Center flex={1} bg="$gray600" p="$8">
      <Image alt="logo" source={Logo} w="$32" h={100} />
      <Highlight title="marketspace" subtitle="Seu espaço de compra e venda" />
      <Text mt="$20" color="$gray100" fontFamily="$body" fontSize="$lg">
        Acesse sua conta
      </Text>
      <Input placeholder="E-mail" />
      <Input placeholder="Senha" />
      <Button title="Entrar" />

      <Text mt="$24" color="$gray100" fontSize="$lg" fontFamily="$heading">
        Ainda não tem acesso?
      </Text>
      <Button
        title="Criar uma conta"
        buttonVariant="basic"
        buttonVariantText="secondary"
      />
    </Center>
  );
}
