import { Center, HStack, Text, VStack, Icon } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesNavigationProps } from "@routes/app.routes";

import { Plus } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export function HeaderMyAds() {
  const navigation = useNavigation<AppRoutesNavigationProps>();
  return (
    <VStack w="$full">
      <HStack mt="$8" alignItems="center" justifyContent="center">
        <Center flex={1}>
          <Text color="$gray100" fontFamily="$heading" fontSize="$2xl">
            Meus anúncios
          </Text>
        </Center>
        <TouchableOpacity onPress={() => navigation.navigate("CreateAds")}>
          <Icon as={Plus} color="$gray100" fontFamily="$body" size="xl" />
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
}
