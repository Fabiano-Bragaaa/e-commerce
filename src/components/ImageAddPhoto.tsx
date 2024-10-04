import { Center, Icon } from "@gluestack-ui/themed";
import { Plus } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export function ImageAddPhoto() {
  return (
    <TouchableOpacity>
      <Center h="$20" w="$20" bg="$gray400" mt="$5" rounded="$lg">
        <Icon as={Plus} color="$gray300" size="lg" />
      </Center>
    </TouchableOpacity>
  );
}
