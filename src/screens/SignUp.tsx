import { useState } from "react";
import { ScrollView } from "react-native";

import {
  Center,
  Icon,
  Image,
  Text,
  Button as ButtonGluestack,
  useToast,
} from "@gluestack-ui/themed";

import Logo from "@assets/logo.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { UserPhoto } from "@components/UserPhoto";
import { ToastMessage } from "@components/ToastMessage";

import { PencilLine } from "lucide-react-native";

import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";

type FormDataProps = {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("informe o nome."),
  email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
  phone: yup
    .string()
    .matches(
      /^\(?([1-9]{2})\)?[\s-]?([9]{1})[0-9]{4}-?[0-9]{4}$/,
      "Número de celular inválido"
    )
    .required("Número de celular é obrigatório.")
    .min(11, "Informe o seu numero de telefone com o DDD."),
  password: yup
    .string()
    .required("Informe a sua senha.")
    .min(6, "A sua senha deve conter no minimo 6 caracteres."),
  password_confirm: yup
    .string()
    .required("Confirme sua senha.")
    .oneOf([yup.ref("password"), ""], "As senhas não confere."),
});

export function SignUp() {
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/Fabiano-Bragaaa.png"
  );

  const navigation = useNavigation();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(signUpSchema) });

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
        aspect: [4, 4],
      });

      if (photoSelected.canceled) {
        return;
      }

      const photoURI = photoSelected.assets[0].uri;

      if (photoURI) {
        const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
          size: number;
        };

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 1) {
          return toast.show({
            placement: "top",
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title="Essa imagem é muito grande. Escolha uma de até 5MB."
                onClose={() => toast.close(id)}
              />
            ),
          });
        }
        setUserPhoto(photoURI);
      }
    } catch (error) {
      console.log("erro ao enviar a foto", error);
    }
  }

  async function handleSignUp({
    email,
    name,
    password,
    password_confirm,
    phone,
  }: FormDataProps) {}

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
          <UserPhoto source={{ uri: userPhoto }} alt="foto de perfil" />
          <ButtonGluestack
            h="$11"
            w="$11"
            rounded="$full"
            bg="$blue1"
            position="absolute"
            right={120}
            top={50}
            justifyContent="center"
            alignItems="center"
            onPress={handleUserPhotoSelect}
          >
            <Icon as={PencilLine} color="$white" size="md" />
          </ButtonGluestack>
        </Center>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />

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

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Telefone"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.phone?.message}
            />
          )}
        />

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

        <Controller
          control={control}
          name="password_confirm"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Confirmar senha"
              securityType
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password_confirm?.message}
            />
          )}
        />

        <Button
          title="Entrar"
          buttonVariant="secondary"
          onPress={handleSubmit(handleSignUp)}
        />

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
