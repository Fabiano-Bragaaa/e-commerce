import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { BottomTabParamList, BottomTabRoutes } from "./bottomTab.routes";

import { CreateAds } from "@screens/CreateAds/CreateAds";
import { PreviewAds } from "@screens/PreviewAds/PreviewAds";

export type AppRoutes = {
  bottomTabs: {
    screen: keyof BottomTabParamList;
    params?: BottomTabParamList[keyof BottomTabParamList];
  };
  createAds: {
    images: string[];
    product_title: string;
    description_title: string;
    value_product: string;
    switchValue: boolean;
    checkbox: string[];
    selectedOption: string;
  };
  previewAds: {
    images: string[];
    product_title: string;
    description_title: string;
    value_product: string;
    switchValue: boolean;
    checkbox: string[];
    selectedOption: string;
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
    </Navigator>
  );
}
