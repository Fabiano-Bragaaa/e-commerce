import { useState } from "react";
import { ScrollView } from "react-native";

import { Box, Switch, Text, VStack } from "@gluestack-ui/themed";

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

export function EditAds() {
  const [switchValue, setSwitchValue] = useState(false);

  const navigation = useNavigation<AppRoutesNavigationProps>();

  return (
    <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} padding="$5">
        <HeaderCreateAds title="Editar anúncio" />
        <Box mt="$5">
          <Text color="$gray100" fontFamily="$heading" fontSize="$lg">
            Imagens
          </Text>
          <Text mt="$2" fontFamily="$body" fontSize="$md" color="$gray200">
            Escolha até 3 imagens para mostrar o quanto o seu produto é
            incrivel!
          </Text>
          <ImageAddPhoto />
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
