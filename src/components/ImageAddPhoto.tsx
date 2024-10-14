import { Center, Icon } from "@gluestack-ui/themed";
import { Plus } from "lucide-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps;

export function ImageAddPhoto({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <Center h="$20" w="$20" bg="$gray400" mt="$5" mr="$3" rounded="$lg">
        <Icon as={Plus} color="$gray300" size="lg" />
      </Center>
    </TouchableOpacity>
  );
}
