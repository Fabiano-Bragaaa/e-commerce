import { Platform } from "react-native";

import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import HomeIcon from "@assets/home.svg";
import Logout from "@assets/logout.svg";
import MyAdsIcon from "@assets/myAds.svg";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import { Home } from "@screens/Home";
import { MyAds } from "@screens/MyAds";
import { SignOut } from "@screens/SignOut";
import { EditAds } from "@screens/EditAds";
import { CreateAds } from "@screens/CreateAds";
import { AdsScreen } from "@screens/AdsScreen";
import { ActiveAds } from "@screens/ActiveAds";
import { PreviewAds } from "@screens/PreviewAds";
import { DisableAds } from "@screens/DisableAds";

type AppRoutes = {
  home: undefined;
  myAds: undefined;
  signOut: undefined;
  ads: undefined;
  CreateAds: undefined;
  editAds: {
    title: string;
    description: string;
    price: string;
    radioSelect: string;
    images: string[];
    values: string[] | [];
    switchValue: boolean;
  };
  previewAds: {
    title: string;
    description: string;
    price: string;
    radioSelect: string;
    images: string[];
    values: string[] | [];
    switchValue: boolean;
  };
  disableAds: undefined;
  activeAds: undefined;
};

export type AppRoutesNavigationProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

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
        name="ads"
        component={AdsScreen}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />

      <Screen
        name="CreateAds"
        component={CreateAds}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />
      <Screen
        name="editAds"
        component={EditAds}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />
      <Screen
        name="previewAds"
        component={PreviewAds}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />
      <Screen
        name="disableAds"
        component={DisableAds}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />
      <Screen
        name="activeAds"
        component={ActiveAds}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />
    </Navigator>
  );
}
