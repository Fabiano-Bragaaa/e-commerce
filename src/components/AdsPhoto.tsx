import { Button, Center, Icon, Image } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import { X } from "lucide-react-native";

type Props = {
  uri: string;
  onRemove: () => void;
};

export function AdsPhoto({ uri, onRemove }: Props) {
  return (
    <Box h="$20" w="$20" mt="$5" mr="$1">
      <Image
        w="$full"
        resizeMode="cover"
        source={{ uri }}
        alt="imagem do produto"
        rounded="$lg"
      />
      <Button
        position="absolute"
        right={-14}
        top={-5}
        bg="$none"
        onPress={onRemove}
      >
        <Icon as={X} color="$white" size="sm" />
      </Button>
    </Box>
  );
}
