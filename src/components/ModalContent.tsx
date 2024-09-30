import { Box, VStack } from "@gluestack-ui/themed";
import { StatusBar, TouchableOpacity } from "react-native";

type Props = {
  onClose: () => void;
};

export function ModalContent({ onClose }: Props) {
  return (
    <TouchableOpacity
      style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.60)" }}
      onPress={onClose}
    >
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
      ></VStack>
    </TouchableOpacity>
  );
}
