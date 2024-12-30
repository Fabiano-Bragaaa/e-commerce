import { Container } from "@components/Container/Container";
import { Input } from "@components/Input/Input";
import {
  Avatar,
  Box,
  Center,
  Icon,
  Image,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useState } from "react";

import Logo from "@assets/icons/logo.png";
import { Button } from "@components/Button/Button";
import { ScrollView } from "react-native";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
import { PencilLine } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const { goBack } = useNavigation();
  return (
    <ScrollView style={{ flexGrow: 1 }}>
      <Container>
        <Box flex={1} paddingHorizontal="$10">
          <Center mt="$10">
            <Image source={Logo} alt="logo" w="$32" />
            <Text mt="$4" color="$gray1" fontSize="$2xl" fontFamily="$heading">
              Boas vindas!
            </Text>
            <Text
              color="$gray4"
              fontFamily="$heading"
              fontSize="$sm"
              textAlign="center"
            >
              Crie sua conta e use o espaço para comprar itens variados e vender
              seus produtos
            </Text>
            <VStack mt="$6" mb="$4">
              <UserPhoto
                source={{ uri: "https://github.com/fabiano-bragaaa.png" }}
                alt="foto de perfil"
                sizeImage={100}
              />
              <Box
                w={45}
                h={45}
                borderRadius="$full"
                bg="$blueLight"
                position="absolute"
                top={55}
                left={70}
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={PencilLine} color="$white" size="lg" />
              </Box>
            </VStack>
          </Center>

          <Center>
            <Input placeholder="Nome" boxProps={{ mb: "$6" }} />
            <Input placeholder="E-mail" boxProps={{ mb: "$6" }} />
            <Input placeholder="Telefone" boxProps={{ mb: "$6" }} />
            <Input
              placeholder="Senha"
              isPassword
              onToggleSecurity={() => setIsToggle(!isToggle)}
              toggleSecurity={isToggle}
              secureTextEntry={isToggle}
              boxProps={{ mb: "$6" }}
            />
            <Input
              placeholder="Confirmar senha"
              isPassword
              onToggleSecurity={() => setIsToggle(!isToggle)}
              toggleSecurity={isToggle}
              secureTextEntry={isToggle}
              boxProps={{ mb: "$8" }}
            />
            <Button title="Criar" type="secondary" />
          </Center>
        </Box>
        <Center paddingHorizontal="$10">
          <Text
            color="$gray2"
            fontFamily="$body"
            fontSize="$lg"
            mt="$12"
            mb="$4"
          >
            Já tem uma conta?
          </Text>
          <Button
            title="Ir para o login"
            type="outiline"
            mb="$16"
            onPress={goBack}
          />
        </Center>
      </Container>
    </ScrollView>
  );
}
