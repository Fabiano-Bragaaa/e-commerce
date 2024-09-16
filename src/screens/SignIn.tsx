import { Center, HStack, Image, Text, VStack } from "@gluestack-ui/themed";

import Logo from "@assets/logo.png";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
  return (
    <Center flex={1} bg="$gray600" p="$8">
      <Image alt="logo" source={Logo} w="$32" h={100} />
      <Highlight title="marketspace" subtitle="Seu espaço de compra e venda" />
      <Text mt="$20" color="$gray100" fontFamily="$body" fontSize="$lg">
        Acesse sua conta
      </Text>
      <Input placeholder="E-mail" />
      <HStack>
        <Input placeholder="Senha" />
      </HStack>
      <Button title="Entrar" />
    </Center>
  );
}
