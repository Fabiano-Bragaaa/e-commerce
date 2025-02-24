import React from "react";

import { Text, HStack, Icon } from "@gluestack-ui/themed";

import {
  Barcode,
  QrCode,
  Landmark,
  Banknote,
  CreditCard,
} from "lucide-react-native";
import { Box } from "@gluestack-ui/themed";

type Props = {
  paymentMethods: string[];
};

export function GeneratePaymentMethods({ paymentMethods }: Props) {
  return (
    <Box gap="$2">
      {paymentMethods.includes("boleto") && (
        <HStack alignItems="center">
          <Icon as={Barcode} size="lg" color={"$gray1"} />

          <Text ml={10} color="$gray1">
            Boleto
          </Text>
        </HStack>
      )}
      {paymentMethods.includes("pix") && (
        <HStack alignItems="center">
          <Icon as={QrCode} size="lg" color={"$gray1"} />
          <Text ml={10} color="$gray1">
            Pix
          </Text>
        </HStack>
      )}
      {paymentMethods.includes("deposit") && (
        <HStack alignItems="center">
          <Icon as={Landmark} size="lg" color={"$gray1"} />
          <Text ml={10} color="$gray1">
            Depósito Bancário
          </Text>
        </HStack>
      )}
      {paymentMethods.includes("cash") && (
        <HStack alignItems="center">
          <Icon as={Banknote} size="lg" color={"$gray1"} />
          <Text ml={10} color="$gray1">
            Dinheiro
          </Text>
        </HStack>
      )}
      {paymentMethods.includes("card") && (
        <HStack alignItems="center">
          <Icon as={CreditCard} size="lg" color={"$gray1"} />
          <Text ml={10} color="$gray1">
            Cartão de Crédito
          </Text>
        </HStack>
      )}
    </Box>
  );
}
