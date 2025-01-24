import { Container } from "@components/Container/Container";
import { Center, Image, Text, VStack } from "@gluestack-ui/themed";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AppRoutes } from "@routes/app.routes";
import { Dimensions } from "react-native";

import Carousel from "react-native-reanimated-carousel";

const { width, height } = Dimensions.get("window");

export function PreviewAds() {
  const route = useRoute<RouteProp<AppRoutes, "previewAds">>();

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

      <Carousel
        loop={false}
        width={width}
        snapEnabled={true}
        pagingEnabled={true}
        height={height * 0.4}
        data={images}
        style={{ width: "100%" }}
        renderItem={({ item }) => (
          <Center overflow="hidden">
            <Image
              w="$full"
              h="$full"
              resizeMode="cover"
              source={{ uri: item }}
            />
          </Center>
        )}
      />
      <Container></Container>
    </VStack>
  );
}
