import React from "react";
import { AdsPhoto } from "@components/AdsPhoto/AdsPhoto";
import { Container } from "@components/Container/Container";
import { Toast } from "@components/Toast/Toast";
import {
  Box,
  HStack,
  Icon,
  Image,
  Pressable,
  Radio,
  RadioIndicator,
  RadioLabel,
  Text,
  RadioGroup,
  CircleIcon,
  useToast,
  VStack,
  RadioIcon,
  Switch,
} from "@gluestack-ui/themed";

import { AppError } from "@utils/AppError";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

import * as ImagePicker from "expo-image-picker";
import { X } from "lucide-react-native";
import { useState } from "react";
import { Input } from "@components/Input/Input";
import { TextArea } from "@components/TextArea/TextArea";
import { gluestackUIConfig } from "../../../config/gluestack-ui.config";
import { Checkbox } from "@components/Checkbox/Checkbox";
import { Button } from "@components/Button/Button";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesdProps } from "@routes/app.routes";
import { cleanCurrency, formatCurrency } from "@utils/validationValueProduct";

type FormDataProps = {
  product_title: string;
  description_title: string;
  value_product: string;
};

const productSchema = yup.object({
  product_title: yup.string().required("Informe o titulo do produto."),
  description_title: yup.string().required("Informe a descrição do produto."),
  value_product: yup.string().required("Informe o valor do produto."),
});

export function CreateAds() {
  const theme = gluestackUIConfig.tokens;
  const color = theme.colors;
  const { navigate } = useNavigation<AppNavigatorRoutesdProps>();

  const [images, setImages] = useState<string[]>([]);

  const [selectedOption, setSelectedOption] = useState<string>("new_product");
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const [checkbox, setCheckbox] = useState<string[]>([]);

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(productSchema),
  });

  async function SelectedAds() {
    try {
      const photosSelectes = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
        allowsMultipleSelection: true,
      });

      if (photosSelectes.canceled) {
        return;
      }

      const photos = photosSelectes.assets;

      if (photos.length > 3) {
        return toast.show({
          duration: 4000,
          placement: "top",
          render: ({ id }) => (
            <Toast
              title="Escolha somente 3 imagens do seu produto."
              action="error"
              id={id}
              onClose={() => toast.close(id)}
            />
          ),
        });
      }

      if (photos) {
        const uris = photos.map((photos) => photos.uri);

        setImages(uris);

        const fileExtension = photos.map((photo) => {
          const photoUri = photo.uri;

          const fileExtension = photoUri.split(".").pop();

          return {
            name: `usuario.${fileExtension}`.toLowerCase(),
            uri: photoUri,
            type: `${photo.type}/${fileExtension}`,
          } as any;
        });

        console.log(fileExtension);
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

  function removeItem(uri: string) {
    setImages((prev) => prev.filter((item) => item !== uri));
  }

  function handleConfirmForm({
    description_title,
    product_title,
    value_product,
  }: FormDataProps) {
    if (images.length === 0) {
      return toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            action="error"
            title={"Insira pelo menos uma imagem do seu produto"}
            onClose={() => toast.close(id)}
          />
        ),
      });
    }

    if (checkbox.length === 0) {
      return toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast
            id={id}
            action="error"
            title={"Insira pelo menos um meio de pagamento"}
            onClose={() => toast.close(id)}
          />
        ),
      });
    }

    navigate("previewAds", {
      checkbox,
      description_title,
      images,
      product_title,
      switchValue,
      value_product,
    });
  }

  return (
    <VStack flex={1}>
      <Container
        boxProps={{ paddingHorizontal: "$6" }}
        canGoBack
        titleBack="Criar anúncio"
        scrollable
      >
        <Text fontFamily="$heading" color="$gray1" mb="$1">
          Imagens
        </Text>
        <Text color="$gray1">
          Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
        </Text>
        <HStack gap="$2" mt="$4" mb="$6">
          {images.length > 0 &&
            images.map((uri) => (
              <Box key={uri}>
                <Image
                  source={{ uri }}
                  alt="imagem do produto"
                  w="$24"
                  h="$24"
                  rounded="$lg"
                  resizeMode="cover"
                />
                <Pressable
                  position="absolute"
                  bg="$gray2"
                  alignItems="center"
                  justifyContent="center"
                  rounded="$full"
                  w="$6"
                  h="$6"
                  top={4}
                  right={4}
                  onPress={() => removeItem(uri)}
                >
                  <Icon as={X} color="$white" size="lg" />
                </Pressable>
              </Box>
            ))}
          {images.length < 3 && <AdsPhoto handleAds={SelectedAds} />}
        </HStack>
        <Text color="$gray1" fontFamily="$heading">
          Sobre o produto
        </Text>
        <Controller
          control={control}
          name="product_title"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Título do anúncio"
              boxProps={{ mt: "$4" }}
              value={value}
              onChangeText={onChange}
              errorMessage={errors.product_title?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description_title"
          render={({ field: { onChange, value } }) => (
            <TextArea
              placeholder="Descrição do produto"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.description_title?.message}
            />
          )}
        />

        <RadioGroup
          flexDirection="row"
          value={selectedOption}
          onChange={setSelectedOption}
        >
          <Radio ml="$1" value="new_product" alignItems="center">
            <RadioIndicator>
              <RadioIcon as={CircleIcon} color="$blue" />
            </RadioIndicator>
            <RadioLabel fontSize="$lg" ml="$3" color="$gray2">
              Produto novo
            </RadioLabel>
          </Radio>
          <Radio value="old_product" ml="$8">
            <RadioIndicator>
              <RadioIcon as={CircleIcon} color="$blue" />
            </RadioIndicator>
            <RadioLabel ml="$3" fontSize="$lg" color="$gray2">
              Produto usado
            </RadioLabel>
          </Radio>
        </RadioGroup>

        <Text mt="$6" color="$gray1" fontFamily="$heading">
          Venda
        </Text>

        <Controller
          control={control}
          name="value_product"
          render={({ field: { onChange, value } }) => (
            <Input
              boxProps={{ mt: "$4", mb: "$1" }}
              isMoney
              keyboardType="numeric"
              placeholder="Valor do produto"
              value={formatCurrency(value || "")}
              onChangeText={(text) => {
                const cleanValue = cleanCurrency(text);
                onChange(cleanValue);
              }}
              errorMessage={errors.value_product?.message}
            />
          )}
        />

        <Text color="$gray1" fontFamily="$heading">
          Aceita troca?
        </Text>
        <Switch
          value={switchValue}
          onToggle={setSwitchValue}
          size="lg"
          trackColor={{ false: color.gray5, true: color.blue }}
          thumbColor={color.white}
          alignSelf="flex-start"
        />
        <Text mt="$1" color="$gray1" fontFamily="$heading">
          Meios de pagamento aceitos
        </Text>
        <Checkbox
          value={checkbox}
          setValues={(key: string[]) => setCheckbox(key)}
        />
        <HStack
          h={90}
          bg="$white"
          alignItems="center"
          justifyContent="center"
          gap="$4"
          mt="$5"
          p="$4"
          mx="-$6"
        >
          <Button title="Cancelar" type="outiline" sizeButton="fine" />
          <Button
            title="Avançar"
            type="secondary"
            sizeButton="fine"
            onPress={handleSubmit(handleConfirmForm)}
          />
        </HStack>
      </Container>
    </VStack>
  );
}
