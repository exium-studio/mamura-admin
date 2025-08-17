import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import {
  HStack,
  RadioGroupItem,
  RadioGroupItemHiddenInput,
  RadioGroupItemIndicator,
  RadioGroupItemText,
  RadioGroupRoot,
} from "@chakra-ui/react";

interface Props {
  onChangeSetter?: (value: string) => void;
  inputValue?: string;
}
const SelectGender = (props: Props) => {
  // Props
  const { onChangeSetter, inputValue } = props;

  // Hooks
  const { l } = useLang();

  // Contexts
  const { themeConfig } = useThemeConfig();

  return (
    <RadioGroupRoot
      defaultValue={inputValue}
      colorPalette={themeConfig?.colorPalette}
      onValueChange={(e: any) => {
        onChangeSetter?.(e.value);
      }}
    >
      <HStack gap="6">
        <RadioGroupItem value={`1`} cursor={"pointer"}>
          <RadioGroupItemHiddenInput />
          <RadioGroupItemIndicator />
          <RadioGroupItemText>{l.male}</RadioGroupItemText>
        </RadioGroupItem>

        <RadioGroupItem value={`0`} cursor={"pointer"}>
          <RadioGroupItemHiddenInput />
          <RadioGroupItemIndicator />
          <RadioGroupItemText>{l.female}</RadioGroupItemText>
        </RadioGroupItem>
      </HStack>
    </RadioGroupRoot>
  );
};

export default SelectGender;
