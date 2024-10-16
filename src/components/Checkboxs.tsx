import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  VStack,
} from "@gluestack-ui/themed";
import { useState } from "react";

type CheckBoxProps = {
  values: string[] | [];
  setValues: (value: string[]) => void;
};

export function Checkboxs({ values, setValues }: CheckBoxProps) {
  console.log(values);

  return (
    <CheckboxGroup
      value={values}
      onChange={setValues}
      aria-label="Meios de pagamentos"
    >
      <VStack space="lg" w="$40" mt="$3">
        <Checkbox value="Boleto" aria-label="Boleto" gap="$5">
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} color="$white" size="sm" />
          </CheckboxIndicator>
          <CheckboxLabel>Boleto</CheckboxLabel>
        </Checkbox>
        <Checkbox value="Pix" aria-label="Pix" gap="$5">
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} color="$white" size="sm" />
          </CheckboxIndicator>
          <CheckboxLabel>Pix</CheckboxLabel>
        </Checkbox>
        <Checkbox value="Dinheiro" aria-label="Dinheiro" gap="$5">
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} color="$white" size="sm" />
          </CheckboxIndicator>
          <CheckboxLabel>Dinheiro</CheckboxLabel>
        </Checkbox>
        <Checkbox
          value="CartaDeCrédito"
          aria-label="Cartão de Crédito"
          gap="$5"
        >
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} color="$white" size="sm" />
          </CheckboxIndicator>
          <CheckboxLabel>Cartão de Crédito</CheckboxLabel>
        </Checkbox>
        <Checkbox
          value="DepositoBancario"
          aria-label="Depósito Bancário"
          gap="$5"
        >
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} color="$white" size="sm" />
          </CheckboxIndicator>
          <CheckboxLabel>Depósito Bancário</CheckboxLabel>
        </Checkbox>
      </VStack>
    </CheckboxGroup>
  );
}
