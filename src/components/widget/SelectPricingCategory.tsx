import { Interface__Select } from "@/constants/interfaces";
import useRequest from "@/hooks/useRequest";
import SelectInput from "../ui-custom/SelectInput";
import useLang from "@/context/useLang";
import capsFirstLetterEachWord from "@/utils/capsFirstLetterEachWord";

interface Props extends Interface__Select {}
const SelectPricingCategory = (props: Props) => {
  // Props
  const { ...restProps } = props;

  // Hooks
  const { l } = useLang();
  const { req } = useRequest({
    id: "select-animal-category",
    showLoadingToast: false,
    showSuccessToast: false,
  });

  // Utils
  function fetch(setOptions: any) {
    const config = {
      url: `/api/mamura/public-request/get-pricing-category`,
      method: "get",
    };

    req({
      config,
      onResolve: {
        onSuccess: (r) => {
          const newOptions = r.data.data.map((item: any) => ({
            id: item.id,
            label: item.name,
          }));
          setOptions(newOptions);
        },
      },
    });
  }

  return (
    <SelectInput
      title={capsFirstLetterEachWord(l.pricing_interface.category)}
      fetch={fetch}
      {...restProps}
    />
  );
};

export default SelectPricingCategory;
