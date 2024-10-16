import { Center, HStack, Icon, Image, Text } from "@gluestack-ui/themed";

import Logo from "@assets/logo.png";

import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
  password: yup.string().required("Informe a sua senha."),
});

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(signInSchema) });

  async function handleSignIn({ email, password }: FormDataProps) {
    console.log({ email, password });
  }

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
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <HStack>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                securityType
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />
        </HStack>
        <Button title="Entrar" onPress={handleSubmit(handleSignIn)} />

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
