import React, { useEffect } from "react";
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

import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

import { X } from "lucide-react-native";
import { useState } from "react";
import { Input } from "@components/Input/Input";
import { TextArea } from "@components/TextArea/TextArea";
import { gluestackUIConfig } from "../../../config/gluestack-ui.config";
import { Checkbox } from "@components/Checkbox/Checkbox";
import { Button } from "@components/Button/Button";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesdProps, AppRoutes } from "@routes/app.routes";
import { cleanCurrency, formatCurrency } from "@utils/validationValueProduct";
import { ProductImageDTO } from "@dtos/ProductImageDTO";
import { api } from "@services/api";

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

  const route = useRoute<RouteProp<AppRoutes, "createAds">>();

  const data = route.params;

  const [images, setImages] = useState<ProductImageDTO[]>(data.images);

  const [selectedOption, setSelectedOption] = useState<string>(
    data.selectedOption
  );
  const [switchValue, setSwitchValue] = useState<boolean>(data.switchValue);
  const [checkbox, setCheckbox] = useState<string[]>(data.checkbox);

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      description_title: data.description_title,
      product_title: data.product_title,
      value_product: data.value_product,
    },
  });

  async function SelectedAds() {
    try {
      const photosSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photosSelected.canceled) {
        return;
      }

      if (photosSelected.assets[0].uri) {
        const fileExtension = photosSelected.assets[0].uri.split(".").pop();

        const uri = photosSelected.assets[0].uri;

        const photoFile = {
          name: `${fileExtension}`.toLowerCase(),
          uri,
          type: `${photosSelected.assets[0].type}/${fileExtension}`,
        } as any;

        setImages((images) => [...images, photoFile]);
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
    setImages((prev) => prev.filter((item) => item.uri !== uri));
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
      selectedOption,
      idProductExist: data.idProductExist,
    });
  }

  useEffect(() => {
    if (data.idProductExist) {
      setImages(data.images);
    }
  }, [data.idProductExist]);

  console.log(images);

  return (
    <VStack flex={1}>
      <Container
        navigateTo={() => navigate("bottomTabs", { screen: "home" })}
        boxProps={{ paddingHorizontal: "$6" }}
        canGoBack
        titleBack={data.editable ? "Editar anúncio" : "Criar anúncio"}
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
            images.map((imageData) => (
              <Box key={imageData.name}>
                <Image
                  source={
                    data.idProductExist
                      ? {
                          uri: `${api.defaults.baseURL}/images/${imageData.path}`,
                        }
                      : { uri: imageData.uri }
                  }
                  alt="imagem do produto"
                  w="$24"
                  h="$24"
                  rounded="$lg"
                  resizeMode="cover"
                />
                {!data.idProductExist && (
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
                    onPress={() => removeItem(imageData.uri)}
                  >
                    <Icon as={X} color="$white" size="lg" />
                  </Pressable>
                )}
              </Box>
            ))}
          {images.length < 3 && !data.idProductExist && (
            <AdsPhoto handleAds={SelectedAds} />
          )}
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
