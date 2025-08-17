import { Interface__Select } from "@/constants/interfaces";
import useRequest from "@/hooks/useRequest";
import SelectInput from "../ui-custom/SelectInput";
import useLang from "@/context/useLang";
import capsFirstLetterEachWord from "@/utils/capsFirstLetterEachWord";

interface Props extends Interface__Select {}
const SelectAnimalAqiqah = (props: Props) => {
  // Props
  const { ...restProps } = props;

  // Hooks
  const { l } = useLang();
  const { req } = useRequest({
    id: "select-animals",
    showLoadingToast: false,
    showSuccessToast: false,
  });

  // Utils
  function fetch(setOptions: any) {
    const config = {
      url: `/api/piramid/public-request/get-animals-aqiqah`,
      method: "get",
    };

    req({
      config,
      onResolve: {
        onSuccess: (r) => {
          const newOptions = r.data.data.map((item: any) => ({
            id: item.id,
            label: `${item?.animal_breed?.label} - ${item?.animal_category?.label}`,
          }));
          setOptions(newOptions);
        },
      },
    });
  }

  return (
    <SelectInput
      title={capsFirstLetterEachWord(l.master_data_navs_group.animal)}
      fetch={fetch}
      {...restProps}
    />
  );
};

export default SelectAnimalAqiqah;
