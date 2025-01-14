import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { Home } from "@screens/Home/Home";
import { MyAads } from "@screens/MyAds/MyAds";
import { SignOut } from "@screens/SignOut/SignOut";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { Platform } from "react-native";

import HomeSvg from "@assets/icons/home.svg";
import AdsSvg from "@assets/icons/ads.svg";
import GetOut from "@assets/icons/getout.svg";

export type BottomTabParamList = {
  home: undefined;
  myAds: undefined;
  singOut: undefined;
};

export type AppRoutesProps = BottomTabNavigationProp<BottomTabParamList>;

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

export function BottomTabRoutes() {
  const { tokens } = gluestackUIConfig;
  const iconSize = tokens.space["8"];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: tokens.colors.gray1,
        tabBarInactiveTintColor: tokens.colors.gray4,
        tabBarStyle: {
          backgroundColor: tokens.colors.white,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingBottom: tokens.space["12"],
          paddingTop: tokens.space["6"],
        },
      }}
    >
      <Screen
        component={Home}
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="myAds"
        component={MyAads}
        options={{
          tabBarIcon: ({ color }) => (
            <AdsSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="singOut"
        component={SignOut}
        options={{
          tabBarIcon: () => <GetOut width={iconSize} height={iconSize} />,
        }}
      />
    </Navigator>
  );
}
