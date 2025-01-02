import { Container } from "@components/Container/Container";
import { Input } from "@components/Input/Input";
import { Box, Center, Image, Text } from "@gluestack-ui/themed";
import { useState } from "react";

import Logo from "@assets/icons/logo.png";
import { Button } from "@components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup
    .string()
    .required("Informe o seu e-mail.")
    .email("E-mail invalido"),
  password: yup
    .string()
    .required("Informe a sua senha.")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
});

export function SignIn() {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  });

  function handleAccessYourAccount() {}

  function handleSignUp() {
    navigate("signUp");
  }

  return (
    <Container>
      <Box flex={1} paddingHorizontal="$10">
        <Center mt="$20">
          <Image source={Logo} alt="logo" w="$32" />
          <Text mt="$4" color="$gray1" fontSize="$3xl" fontFamily="$heading">
            marketspace
          </Text>
          <Text color="$gray4" fontFamily="$body" fontSize="$md">
            Seu espaço de compra e venda
          </Text>
        </Center>
        <Center>
          <Text
            color="$gray2"
            fontFamily="$body"
            fontSize="$lg"
            mt="$12"
            mb="$4"
          >
            Acesse sua conta
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                isPassword
                onToggleSecurity={() => setIsToggle(!isToggle)}
                toggleSecurity={isToggle}
                secureTextEntry={isToggle}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Button
            title="Entrar"
            onPress={handleSubmit(handleAccessYourAccount)}
          />
        </Center>
      </Box>
      <Center
        bg="$white"
        h="25%"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
        paddingHorizontal="$10"
      >
        <Text color="$gray2" fontFamily="$body" fontSize="$lg" mt="$12" mb="$4">
          Ainda não tem acesso?
        </Text>
        <Button
          title="Criar uma conta"
          type="outiline"
          mb="$16"
          onPress={handleSignUp}
        />
      </Center>
    </Container>
  );
}
