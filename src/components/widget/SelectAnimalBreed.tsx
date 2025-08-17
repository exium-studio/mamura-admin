import { Interface__Select } from "@/constants/interfaces";
import useRequest from "@/hooks/useRequest";
import SelectInput from "../ui-custom/SelectInput";
import useLang from "@/context/useLang";
import capsFirstLetterEachWord from "@/utils/capsFirstLetterEachWord";

interface Props extends Interface__Select {}
const SelectAnimalBreed = (props: Props) => {
  // Props
  const { ...restProps } = props;

  // Hooks
  const { l } = useLang();
  const { req } = useRequest({
    id: "select-animal-breed",
    showLoadingToast: false,
    showSuccessToast: false,
  });

  // Utils
  function fetch(setOptions: any) {
    const config = {
      url: `/api/piramid/public-request/get-animal-breed`,
      method: "get",
    };

    req({
      config,
      onResolve: {
        onSuccess: (r) => {
          const newOptions = r.data.data.map((item: any) => ({
            id: item.id,
            label: item.label,
          }));
          setOptions(newOptions);
        },
      },
    });
  }

  return (
    <SelectInput
      title={capsFirstLetterEachWord(l.animal_interface[2])}
      fetch={fetch}
      {...restProps}
    />
  );
};

export default SelectAnimalBreed;
