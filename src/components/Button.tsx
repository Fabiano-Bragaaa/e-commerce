import {
  ButtonSpinner,
  Button as GluestackButton,
  Text,
} from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof GluestackButton> & {
  title: string;
  isLoading?: boolean;
  buttonVariant?: "primary" | "secondary" | "basic";
  buttonVariantText?: "primary" | "secondary";
};

export function Button({
  title,
  isLoading = false,
  buttonVariant = "primary",
  buttonVariantText = "primary",
  ...rest
}: Props) {
  return (
    <GluestackButton
      {...rest}
      bg={
        buttonVariant === "primary"
          ? "$blue1"
          : buttonVariant === "secondary"
          ? "$black"
          : "$gray400"
      }
      w="$full"
      h="$12"
      mt="$4"
      rounded="$md"
    >
      {isLoading ? (
        <ButtonSpinner color="white" />
      ) : (
        <Text
          fontFamily="$heading"
          fontSize="$lg"
          color={buttonVariantText === "primary" ? "$white" : "$black"}
        >
          {title}
        </Text>
      )}
    </GluestackButton>
  );
}
