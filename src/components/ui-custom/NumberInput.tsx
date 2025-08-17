import { BoxProps, InputProps } from "@chakra-ui/react";
import StringInput from "./StringInput";
import parseNumber from "@/utils/parseNumber";
import formatNumber from "@/utils/formatNumber";
import { useEffect, useState } from "react";

interface Props extends InputProps {
  fRef?: any;
  name?: string;
  onChangeSetter?: (inputValue: number | undefined | null) => void;
  inputValue?: number | undefined | null;
  invalid?: boolean;
  placeholder?: string;
  boxProps?: BoxProps;
  formatValue?: (value: number | undefined | null) => string;
  noFormat?: boolean;
  integer?: boolean;
  max?: number;
}

const NumberInput = ({
  fRef,
  name,
  onChangeSetter,
  inputValue,
  invalid,
  placeholder = "Input number",
  boxProps,
  formatValue,
  noFormat = false,
  integer = false,
  max,
  ...props
}: Props) => {
  const [localInputValue, setLocalInputValue] = useState<string>("");

  useEffect(() => {
    if (inputValue !== undefined && inputValue !== null) {
      // Jika integer true, bulatkan nilai inputValue
      const valueToDisplay =
        integer && typeof inputValue === "number"
          ? Math.round(inputValue) // Membulatkan jika integer true
          : inputValue;

      const formattedValue = noFormat
        ? valueToDisplay.toString()
        : formatValue
        ? formatValue(valueToDisplay)
        : formatNumber(valueToDisplay);

      setLocalInputValue(formattedValue || "");
    }
  }, [inputValue, formatValue, noFormat, integer]);

  function handleChange(rawInput: string | undefined | null) {
    if (!rawInput) {
      setLocalInputValue("");
      if (onChangeSetter) onChangeSetter(null);
      return;
    }

    // Allow minus sign at start, validate rest as digits/comma
    let sanitizedInput = rawInput;

    // Check if negative
    const isNegative = sanitizedInput.startsWith("-");
    sanitizedInput = sanitizedInput.slice(isNegative ? 1 : 0);

    // Hapus karakter non-angka/koma
    sanitizedInput = sanitizedInput.replace(/[^0-9,]/g, "");

    if (integer) {
      sanitizedInput = sanitizedInput.replace(/,/g, "");
    }

    const commaIndex = sanitizedInput.indexOf(",");
    if (
      !integer &&
      commaIndex !== -1 &&
      sanitizedInput.lastIndexOf(",") !== commaIndex
    ) {
      return;
    }

    if (sanitizedInput.length > 19) {
      sanitizedInput = sanitizedInput.substring(0, 19);
    }

    // Rekonstruksi input dengan minus jika perlu
    const displayInput = (isNegative ? "-" : "") + sanitizedInput;

    if (noFormat) {
      setLocalInputValue(displayInput);
      const parsedValue = parseNumber(displayInput);
      if (parsedValue !== undefined && onChangeSetter) {
        onChangeSetter(parsedValue);
      }
      return;
    }

    let formattedValue = sanitizedInput.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (!integer && sanitizedInput.includes(",")) {
      const parts = sanitizedInput.split(",");
      if (parts.length === 2) {
        formattedValue = `${parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${
          parts[1]
        }`;
      }
    }

    if (isNegative) {
      formattedValue = `-${formattedValue}`;
    }

    let parsedValue = parseNumber(formattedValue);

    if (integer && parsedValue !== undefined) {
      parsedValue = Math.round(parsedValue!!);
    }

    if (parsedValue !== undefined && max !== undefined && parsedValue!! > max) {
      setLocalInputValue(formatNumber(max));
      if (onChangeSetter) onChangeSetter(max);
      return;
    }

    setLocalInputValue(formattedValue);

    if (parsedValue !== undefined && onChangeSetter) {
      onChangeSetter(parsedValue);
    }
  }

  return (
    <StringInput
      fRef={fRef}
      name={name}
      onChangeSetter={handleChange}
      inputValue={localInputValue}
      invalid={invalid}
      placeholder={placeholder}
      boxProps={boxProps}
      {...props}
    />
  );
};

export default NumberInput;
