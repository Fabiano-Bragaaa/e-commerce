import { useState } from "react";

import { Box, Switch, Text, VStack } from "@gluestack-ui/themed";

import { HeaderCreateAds } from "@components/HeaderCreateAds";
import { Input } from "@components/Input";
import { Radio } from "@components/Radio";
import { TextAreaInput } from "@components/TextAreaInput";
import { Checkboxs } from "@components/Checkboxs";
import { ScrollView } from "react-native";
import { Button } from "@components/Button";
import { HStack } from "@gluestack-ui/themed";

export function CreateAds() {
  const [switchValue, setSwitchValue] = useState(false);

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
          />
        </HStack>
      </VStack>
    </ScrollView>
  );
}
