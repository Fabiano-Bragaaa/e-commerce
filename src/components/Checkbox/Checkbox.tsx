import {
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  VStack,
  CheckIcon,
  CheckboxLabel,
  Checkbox as GSCheckbox,
} from "@gluestack-ui/themed";

type Props = {
  value: string[];
  setValues: (keys: string[]) => void;
};

export function Checkbox({ value, setValues }: Props) {
  return (
    <CheckboxGroup
      value={value}
      onChange={(keys) => {
        setValues(keys);
      }}
    >
      <VStack space="xl" mb="$4" mt="$3">
        <GSCheckbox value="boleto">
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} color="$white" />
          </CheckboxIndicator>
          <CheckboxLabel ml="$3">Boleto</CheckboxLabel>
        </GSCheckbox>
        <GSCheckbox value="pix">
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} color="$white" />
          </CheckboxIndicator>
          <CheckboxLabel ml="$3">Pix</CheckboxLabel>
        </GSCheckbox>
        <GSCheckbox value="cash">
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} color="$white" />
          </CheckboxIndicator>
          <CheckboxLabel ml="$3">Dinheiro</CheckboxLabel>
        </GSCheckbox>
        <GSCheckbox value="card">
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} color="$white" />
          </CheckboxIndicator>
          <CheckboxLabel ml="$3">Cartão de Crédito</CheckboxLabel>
        </GSCheckbox>
        <GSCheckbox value="deposit">
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} color="$white" />
          </CheckboxIndicator>
          <CheckboxLabel ml="$3">Depósito Bancário</CheckboxLabel>
        </GSCheckbox>
      </VStack>
    </CheckboxGroup>
  );
}
