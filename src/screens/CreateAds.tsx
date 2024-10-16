import { useState } from "react";
import { FlatList, ScrollView } from "react-native";

import { Box, Switch, Text, useToast, VStack } from "@gluestack-ui/themed";

import { Input } from "@components/Input";
import { Radio } from "@components/Radio";
import { Button } from "@components/Button";
import { AdsPhoto } from "@components/AdsPhoto";
import { Checkboxs } from "@components/Checkboxs";
import { ToastMessage } from "@components/ToastMessage";
import { TextAreaInput } from "@components/TextAreaInput";
import { ImageAddPhoto } from "@components/ImageAddPhoto";
import { HeaderCreateAds } from "@components/HeaderCreateAds";

import { HStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesNavigationProps } from "@routes/app.routes";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";

type FormDataProps = {
  title: string;
  description: string;
};

const formAdsSchema = yup.object({
  title: yup.string().required("Informe o titulo do seu anúncio."),
  description: yup.string().required("Informe a descrição do seu anúncio."),
});

export function CreateAds() {
  const [switchValue, setSwitchValue] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [radioSelect, setRadioSelect] = useState("");
  const [values, setValues] = useState<string[] | []>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(formAdsSchema) });

  const navigation = useNavigation<AppRoutesNavigationProps>();
  const toast = useToast();

  async function handleSelectedAdsPhotos() {
    try {
      const photosSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: true,
        aspect: [4, 4],
      });

      if (photosSelected.canceled) {
        return;
      }

      if (photosSelected.assets && photosSelected.assets.length > 0) {
        const newPhotos = photosSelected.assets.map((assets) => assets.uri);

        if (selectedPhotos.length + newPhotos.length > 3) {
          return toast.show({
            placement: "top",
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title="O limite de imagens é 3. Tente escolher as 3 melhores fotos do seu produto."
                onClose={() => toast.close(id)}
              />
            ),
          });
        }
        setSelectedPhotos([...selectedPhotos, ...newPhotos]);
      }
    } catch (error) {
      console.log("error ao fazer a listagem das fotos", error);
    }
  }

  function removePhoto(uri: string) {
    setSelectedPhotos(selectedPhotos.filter((item) => item !== uri));
  }

  async function handleCreateAds({ description, title }: FormDataProps) {
    if (selectedPhotos.length === 0) {
      return toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Escolha pelo menos uma foto para publicar o seu anúncio."
            onClose={() => toast.close(id)}
          />
        ),
      });
    }

    if (radioSelect === "") {
      return toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Escolha se o seu produto é novo ou usado."
            onClose={() => toast.close(id)}
          />
        ),
      });
    }

    if (values.length === 0) {
      return toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title="Escolha pelo menos um meio de pagamento."
            onClose={() => toast.close(id)}
          />
        ),
      });
    }

    console.log({ description, title });
  }

  return (
    <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} padding="$5">
        <HeaderCreateAds title="Criar anúncio" />
        <Box mt="$5">
          <Text color="$gray100" fontFamily="$heading" fontSize="$lg">
            Imagens
          </Text>
          <Text mt="$2" fontFamily="$body" fontSize="$md" color="$gray200">
            Escolha até 3 imagens para mostrar o quanto o seu produto é
            incrivel!
          </Text>
          <Box flexDirection="row">
            <FlatList
              data={selectedPhotos}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <AdsPhoto uri={item} onRemove={() => removePhoto(item)} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={
                selectedPhotos.length < 3 ? (
                  <ImageAddPhoto onPress={handleSelectedAdsPhotos} />
                ) : null
              }
            />
          </Box>
        </Box>

        <Box mt="$6">
          <Text color="$gray100" fontFamily="$heading" fontSize="$lg">
            Sobre o Produto
          </Text>
          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Título do anúncio"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.title?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange } }) => (
              <TextAreaInput
                value={value}
                onChangeText={onChange}
                errorMessage={errors.description?.message}
              />
            )}
          />
        </Box>
        <Radio radioSelect={radioSelect} setRadioSelect={setRadioSelect} />
        <Box mt="$6">
          <Text color="$gray100" fontFamily="$heading" fontSize="$lg">
            Aceita troca?
          </Text>
          <Switch
            size="lg"
            value={switchValue}
            onValueChange={() => setSwitchValue(!switchValue)}
            alignSelf="flex-start"
          />
        </Box>
        <Box>
          <Text color="$gray100" fontFamily="$heading" fontSize="$lg">
            Meios de pagamentos aceitos
          </Text>
          <Checkboxs values={values} setValues={setValues} />
        </Box>
        <HStack w="$full" gap="$4" mt="$5">
          <Button
            title="Cancelar"
            buttonVariant="basic"
            buttonVariantW="basic"
            buttonVariantText="secondary"
            onPress={() => navigation.navigate("home")}
          />
          <Button
            title="Avançar"
            buttonVariant="secondary"
            buttonVariantW="basic"
            onPress={handleSubmit(handleCreateAds)}
          />
        </HStack>
      </VStack>
    </ScrollView>
  );
}
