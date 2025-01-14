import {
  Button as GSButton,
  ButtonText,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof GSButton> & {
  title: string;
  loading?: boolean;
  type?: "primary" | "secondary" | "outiline";
  sizeButton?: "large" | "small" | "fine";
};

export function Button({
  title,
  loading = false,
  type = "primary",
  sizeButton = "large",
  ...gsButton
}: Props) {
  return (
    <GSButton
      bg={
        type === "primary"
          ? "$blueLight"
          : type === "secondary"
          ? "$gray1"
          : "$gray5"
      }
      w={
        sizeButton === "large"
          ? "$full"
          : sizeButton === "small"
          ? "45%"
          : "48%"
      }
      {...gsButton}
      h={sizeButton === "large" || sizeButton === "small" ? 55 : 45}
    >
      {loading ? (
        <ButtonSpinner color={type === "outiline" ? "$gray1" : "$white"} />
      ) : (
        <ButtonText
          color={type === "outiline" ? "$gray1" : "$white"}
          fontFamily="$heading"
          fontSize="$lg"
        >
          {title}
        </ButtonText>
      )}
    </GSButton>
  );
}
