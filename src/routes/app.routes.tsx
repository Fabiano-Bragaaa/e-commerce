import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { Home } from "@screens/Home";
import { MyAds } from "@screens/MyAds";
import { SignOut } from "@screens/SignOut";

type AppRoutes = {
  home: undefined;
  myAds: undefined;
  signOut: undefined;
  CreateAds: undefined;
  previewAds: undefined;
};

export type AppRoutesNavigationProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

import HomeIcon from "@assets/home.svg";
import MyAdsIcon from "@assets/myAds.svg";
import Logout from "@assets/logout.svg";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import { Platform } from "react-native";
import { CreateAds } from "@screens/CreateAds";
import { PreviewAds } from "@screens/PreviewAds";

export function AppRoutes() {
  const { tokens } = gluestackUIConfig;
  const iconSize = tokens.space["7"];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: tokens.colors.black,
        tabBarInactiveTintColor: tokens.colors.gray300,
        tabBarStyle: {
          backgroundColor: tokens.colors.white,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: tokens.space["8"],
          paddingTop: tokens.space["8"],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeIcon fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color }) => (
            <MyAdsIcon fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="signOut"
        component={SignOut}
        options={{
          tabBarIcon: () => (
            <Logout
              fill={tokens.colors.red}
              width={iconSize}
              height={iconSize}
            />
          ),
        }}
      />
      <Screen
        name="CreateAds"
        component={CreateAds}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />
      <Screen
        name="previewAds"
        component={PreviewAds}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />
    </Navigator>
  );
}
