import { Center, Text } from "@gluestack-ui/themed";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AppRoutes } from "@routes/app.routes";

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
    <Center>
      <Text>Preview</Text>
    </Center>
  );
}
