import { ReactNode } from "react";
import { ScrollView, View } from "react-native";

type Props = {
  children: ReactNode;
};

export function ScrollViewContainer({ children }: Props) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
  );
}

export function ViewContainer({ children }: Props) {
  return <View>{children}</View>;
}
