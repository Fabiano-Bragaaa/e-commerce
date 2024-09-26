import { Center, Icon, Image, Text } from "@gluestack-ui/themed";

import Logo from "@assets/logo.png";
import Avatar from "@assets/Avatar.png";

import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { ScrollView } from "react-native";

import { PencilLine } from "lucide-react-native";

import { useNavigation } from "@react-navigation/native";

export function SignUp() {
  const navigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Center flex={1} bg="$gray600" p="$8">
        <Image alt="logo" source={Logo} w="$32" h={100} />
        <Highlight
          title="Boas vindas!"
          subtitle="Crie sua conta e use o espaço para comprar itens variados e vender seus produtos"
        />
        <Center w="$full">
          <UserPhoto source={Avatar} alt="foto de perfil" />
          <Center
            h="$11"
            w="$11"
            rounded="$full"
            bg="$blue1"
            position="absolute"
            right={120}
            top={50}
          >
            <Icon as={PencilLine} color="$white" size="md" />
          </Center>
        </Center>

        <Input placeholder="Nome" />
        <Input placeholder="E-mail" />
        <Input placeholder="Telefone" />
        <Input placeholder="Senha" securityType />
        <Input placeholder="Confirmar senha" securityType />
        <Button title="Entrar" buttonVariant="secondary" />

        <Text mt="$8" color="$gray100" fontSize="$lg" fontFamily="$heading">
          Já tem uma conta?
        </Text>
        <Button
          title="Ir para login"
          buttonVariant="basic"
          buttonVariantText="secondary"
          onPress={() => navigation.goBack()}
        />
      </Center>
    </ScrollView>
  );
}
