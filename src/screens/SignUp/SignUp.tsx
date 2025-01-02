import { Container } from "@components/Container/Container";
import { Input } from "@components/Input/Input";
import {
  Box,
  Center,
  Icon,
  Image,
  Pressable,
  Text,
  useToast,
  VStack,
} from "@gluestack-ui/themed";
import { useState } from "react";

import DefaultPhoto from "@assets/icons/Avatar.png";
import Logo from "@assets/icons/logo.png";

import { Button } from "@components/Button/Button";
import { ScrollView } from "react-native";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
import { PencilLine } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Toast } from "@components/Toast/Toast";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useAuth } from "@hooks/useAuth";

type FormDataProps = {
  name: string;
  email: string;
  tel: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o seu nome."),
  email: yup.string().required("Informe um e-mail.").email("E-mail invalido"),
  tel: yup.string().required("Informe o seu numero de telefone."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter pelo menos 6 dígitos."),
  password_confirm: yup
    .string()
    .required("Confirme a sua senha.")
    .oneOf([yup.ref("password"), ""], "A confirmação da senha não confere."),
});

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTogglePassword, setIsTogglePassword] = useState<boolean>(false);
  const [isTogglePasswordConfirm, setIsTogglePasswordConfirm] =
    useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>();
  const [avatarFile, setAvatarFile] = useState<any>();

  const toast = useToast();

  const { goBack } = useNavigation();
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  async function handleUserPhotoSelected() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      const photoURI = photoSelected.assets[0].uri;

      if (photoURI) {
        const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
          size: number;
        };

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            duration: 4000,
            placement: "top",
            render: ({ id }) => (
              <Toast
                title="Essa imagem é muito grande"
                description="Escolha uma de até 5MB"
                action="error"
                id={id}
                onClose={() => toast.close(id)}
              />
            ),
          });
        }

        const fileExtension = photoURI.split(".").pop();

        const photoFile = {
          name: `nome-do-usuario.${fileExtension}`.toLocaleLowerCase(),
          uri: photoURI,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        setAvatarFile(photoFile);
        setAvatar(photoFile.uri);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possivel utilizar essa foto";

      return toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        ),
      });
    }
  }

  async function handleCreateAccount({
    email,
    name,
    tel,
    password,
  }: FormDataProps) {
    try {
      setIsLoading(true);

      const userForm = new FormData();
      userForm.append("avatar", avatarFile);
      userForm.append("name", name);
      userForm.append("tel", tel);
      userForm.append("email", email);
      userForm.append("password", password);

      await api.post("/users", userForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde!";

      return toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            action="error"
            title={
              typeof title === "string" ? title : "Tente novamente mais tarde"
            }
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setIsLoading(false);
    }
  }
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
                source={avatarFile ? { uri: avatar } : DefaultPhoto}
                alt="foto de perfil"
                sizeImage={100}
              />
              <Pressable
                w={45}
                h={45}
                borderRadius="$full"
                bg="$blueLight"
                position="absolute"
                top={55}
                left={70}
                alignItems="center"
                justifyContent="center"
                onPress={handleUserPhotoSelected}
              >
                <Icon as={PencilLine} color="$white" size="lg" />
              </Pressable>
            </VStack>
          </Center>

          <Center>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  value={value}
                  onChangeText={onChange}
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
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="tel"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Telefone"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.tel?.message}
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
                  onToggleSecurity={() =>
                    setIsTogglePassword(!isTogglePassword)
                  }
                  toggleSecurity={isTogglePassword}
                  secureTextEntry={isTogglePassword}
                  value={value}
                  onChangeText={onChange}
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
                  isPassword
                  onToggleSecurity={() =>
                    setIsTogglePasswordConfirm(!isTogglePasswordConfirm)
                  }
                  toggleSecurity={isTogglePasswordConfirm}
                  secureTextEntry={isTogglePasswordConfirm}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.password_confirm?.message}
                />
              )}
            />

            <Button
              title="Criar"
              type="secondary"
              onPress={handleSubmit(handleCreateAccount)}
              loading={isLoading}
            />
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
