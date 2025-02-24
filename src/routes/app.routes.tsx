import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { BottomTabParamList, BottomTabRoutes } from "./bottomTab.routes";

import { CreateAds } from "@screens/CreateAds/CreateAds";
import { PreviewAds } from "@screens/PreviewAds/PreviewAds";
import { ProductImageDTO } from "@dtos/ProductImageDTO";
import { MyAd } from "@screens/MyAd/MyAd";

export type AppRoutes = {
  bottomTabs: {
    screen: keyof BottomTabParamList;
    params?: BottomTabParamList[keyof BottomTabParamList];
  };
  createAds: {
    images: ProductImageDTO[];
    product_title: string;
    description_title: string;
    value_product: string;
    switchValue: boolean;
    checkbox: string[];
    selectedOption: string;
    editable: boolean;
    idProductExist?: string;
  };
  previewAds: {
    images: ProductImageDTO[];
    product_title: string;
    description_title: string;
    value_product: string;
    switchValue: boolean;
    checkbox: string[];
    selectedOption: string;
    idProductExist?: string;
  };
  myAd: {
    id: string;
    isHome: boolean;
  };
};

export type AppNavigatorRoutesdProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="bottomTabs" component={BottomTabRoutes} />
      <Screen name="createAds" component={CreateAds} />
      <Screen name="previewAds" component={PreviewAds} />
      <Screen name="myAd" component={MyAd} />
    </Navigator>
  );
}
