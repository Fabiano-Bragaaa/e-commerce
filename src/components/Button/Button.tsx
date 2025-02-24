import React from "react";

import {
  Button as GSButton,
  ButtonText,
  ButtonSpinner,
  Box,
} from "@gluestack-ui/themed";
import { ComponentProps, ReactNode } from "react";

type Props = ComponentProps<typeof GSButton> & {
  title: string;
  loading?: boolean;
  Icon?: ReactNode;
  type?: "primary" | "secondary" | "outiline";
  sizeButton?: "large" | "small" | "fine";
};

export function Button({
  title,
  loading = false,
  Icon,
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
      {Icon && !loading && <Box mr="$2">{Icon}</Box>}
      {loading ? (
        <ButtonSpinner color={type === "outiline" ? "$gray1" : "$white"} />
      ) : (
        <ButtonText
          color={type === "outiline" ? "$gray1" : "$white"}
          fontFamily="$heading"
          fontSize="$lg"
          numberOfLines={1}
        >
          {title}
        </ButtonText>
      )}
    </GSButton>
  );
}
