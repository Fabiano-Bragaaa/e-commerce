import { useState } from "react";
import { FlatList, ScrollView } from "react-native";

import { Box, Switch, Text, useToast, VStack } from "@gluestack-ui/themed";

import { Input } from "@components/Input";
import { Radio } from "@components/Radio";
import { Button } from "@components/Button";
import { Checkboxs } from "@components/Checkboxs";
import { TextAreaInput } from "@components/TextAreaInput";
import { ImageAddPhoto } from "@components/ImageAddPhoto";
import { HeaderCreateAds } from "@components/HeaderCreateAds";

import { HStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesNavigationProps } from "@routes/app.routes";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { ToastMessage } from "@components/ToastMessage";
import { AdsPhoto } from "@components/AdsPhoto";

export function CreateAds() {
  const [switchValue, setSwitchValue] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

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
          <Input placeholder="Título do anúncio" />
          <TextAreaInput />
        </Box>
        <Radio />
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
          <Checkboxs />
        </Box>
        <HStack w="$full" gap="$4" mt="$5">
          <Button
            title="Cancelar"
            buttonVariant="basic"
            buttonVariantW="basic"
            buttonVariantText="secondary"
          />
          <Button
            title="Avançar"
            buttonVariant="secondary"
            buttonVariantW="basic"
            onPress={() => navigation.navigate("previewAds")}
          />
        </HStack>
      </VStack>
    </ScrollView>
  );
}
