import { HStack } from "@gluestack-ui/themed";
import {
  ButtonSpinner,
  Button as GluestackButton,
  Text,
} from "@gluestack-ui/themed";
import { ComponentProps } from "react";
import { SvgProps } from "react-native-svg";

type Props = ComponentProps<typeof GluestackButton> & {
  title: string;
  isLoading?: boolean;
  buttonVariantW?: "primary" | "secondary" | "basic";
  buttonVariant?: "primary" | "secondary" | "basic";
  buttonVariantText?: "primary" | "secondary";
  icon?: React.FC<SvgProps>;
};

export function Button({
  title,
  isLoading = false,
  buttonVariantW = "primary",
  buttonVariant = "primary",
  buttonVariantText = "primary",
  icon: Icon,
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
      w={
        buttonVariantW === "primary"
          ? "$full"
          : buttonVariantW === "secondary"
          ? "41%"
          : "48%"
      }
      h="$12"
      mt="$4"
      rounded="$md"
    >
      {isLoading ? (
        <ButtonSpinner color="white" />
      ) : (
        <HStack gap="$2">
          {Icon && <Icon width={20} height={24} />}

          <Text
            fontFamily="$heading"
            fontSize="$lg"
            color={buttonVariantText === "primary" ? "$white" : "$black"}
            textAlign="center"
          >
            {title}
          </Text>
        </HStack>
      )}
    </GluestackButton>
  );
}
