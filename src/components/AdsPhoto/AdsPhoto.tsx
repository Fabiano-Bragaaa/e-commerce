import { Center, Icon } from "@gluestack-ui/themed";
import { Plus } from "lucide-react-native";
import { Pressable } from "react-native";

type Props = {
  handleAds: () => void;
};

export function AdsPhoto({ handleAds }: Props) {
  return (
    <Pressable onPress={handleAds}>
      <Center w="$24" h="$24" rounded="$lg" bg="$gray5">
        <Icon as={Plus} color="$gray4" size="lg" />
      </Center>
    </Pressable>
  );
}
