import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { BottomTabParamList, BottomTabRoutes } from "./bottomTab.routes";
import { CreateAds } from "@screens/CreateAds/CreateAds";

type AppRoutes = {
  bottomTabs: {
    screen: keyof BottomTabParamList;
    params?: BottomTabParamList[keyof BottomTabParamList];
  };
  createAds: undefined;
};

export type AppNavigatorRoutesdProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="bottomTabs" component={BottomTabRoutes} />
      <Screen name="createAds" component={CreateAds} />
    </Navigator>
  );
}
