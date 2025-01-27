import { Container } from "@components/Container/Container";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
import { Box, Center, Image, Text, VStack } from "@gluestack-ui/themed";
import { useAuth } from "@hooks/useAuth";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AppRoutes } from "@routes/app.routes";
import { api } from "@services/api";
import { Dimensions } from "react-native";

import Carousel from "react-native-reanimated-carousel";

const { width, height } = Dimensions.get("window");

export function PreviewAds() {
  const route = useRoute<RouteProp<AppRoutes, "previewAds">>();
  const { user } = useAuth();

  const {
    checkbox,
    description_title,
    images,
    product_title,
    switchValue,
    value_product,
  } = route.params;

  console.log(
    checkbox,
    description_title,
    images,
    product_title,
    switchValue,
    value_product
  );

  return (
    <VStack flex={1}>
      <Center gap="$1" h={"17%"} bg="$blueLight">
        <Text color="$white" fontSize="$lg" fontWeight="$bold">
          Pré visualização do anúncio
        </Text>
        <Text color="$white" fontSize="$md">
          É assim que seu produto vai aparecer!
        </Text>
      </Center>

      <Box flex={1} maxHeight={height * 0.3}>
        <Carousel
          loop={false}
          width={width}
          height={height * 0.3}
          data={images}
          renderItem={({ item }) => (
            <Image
              w="$full"
              h="$full"
              resizeMode="cover"
              source={{ uri: item }}
            />
          )}
        />
      </Box>

      <Container>
        <UserPhoto
          source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
          sizeImage={40}
        />
      </Container>
    </VStack>
  );
}
