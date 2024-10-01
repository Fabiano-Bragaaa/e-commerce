import { Box, HStack, Icon, Switch, Text, VStack } from "@gluestack-ui/themed";
import { FlatList, StatusBar, TouchableOpacity } from "react-native";

import { X } from "lucide-react-native";
import { useState } from "react";
import { ButtonChoice } from "./ButtonChoice";
import { Checkboxs } from "./Checkboxs";
import { Button } from "./Button";

type Props = {
  onClose: () => void;
};

export function ModalContent({ onClose }: Props) {
  const [groups, setGroups] = useState(["Novo", "Usado"]);
  const [groupSelected, setGroupSelected] = useState("Novo");
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <Box flex={1} bg="rgba(0,0,0,.60)">
      <StatusBar
        barStyle="dark-content"
        backgroundColor={"rgba(0, 0, 0, 0.60)"}
        translucent
      />
      <VStack
        h="70%"
        w="$full"
        bg="$gray600"
        position="absolute"
        bottom="$0"
        borderTopLeftRadius="$3xl"
        borderTopRightRadius="$3xl"
        p="$5"
      >
        <HStack justifyContent="space-between" mt="$3" alignItems="center">
          <Text color="$black" fontFamily="$heading" fontSize="$2xl">
            Filtrar anúncios
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Icon as={X} color="$gray300" size="xl" />
          </TouchableOpacity>
        </HStack>
        <Text color="$gray100" fontFamily="$heading" fontSize="$lg" mt="$7">
          Condições
        </Text>
        <Box>
          <FlatList
            data={groups}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ButtonChoice
                isActive={groupSelected.toUpperCase() === item.toUpperCase()}
                name={item}
                onPress={() => {
                  setGroupSelected(item);
                }}
              />
            )}
          />
        </Box>
        <Text color="$gray100" fontFamily="$heading" fontSize="$lg" mt="$7">
          Aceita troca?
        </Text>

        <Switch
          size="lg"
          value={switchValue}
          onValueChange={() => setSwitchValue(!switchValue)}
          alignSelf="flex-start"
        />
        <Text color="$gray100" fontFamily="$heading" fontSize="$lg" mt="$3">
          Meios de pagamento aceitos
        </Text>
        <Checkboxs />
        <HStack w="$full" gap="$4">
          <Button
            title="Resetar filtros"
            buttonVariant="basic"
            buttonVariantW="basic"
            buttonVariantText="secondary"
          />
          <Button
            title="Aplicar filtros"
            buttonVariant="secondary"
            buttonVariantW="basic"
          />
        </HStack>
      </VStack>
    </Box>
  );
}
