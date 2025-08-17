import useEditAnimalDisclosure from "@/context/useEditAnimalDisclosure";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import useRenderTrigger from "@/context/useRenderTrigger";
import useRequest from "@/hooks/useRequest";
import { FieldsetRoot } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";
import BackButton from "../ui-custom/BackButton";
import BButton from "../ui-custom/BButton";
import DatePickerInput from "../ui-custom/DatePickerInput";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "../ui-custom/Disclosure";
import DisclosureHeaderContent from "../ui-custom/DisclosureHeaderContent";
import NumberInput from "../ui-custom/NumberInput";
import { Field } from "../ui/field";
import { InputGroup } from "../ui/input-group";
import SelectAnimalBreed from "./SelectAnimalBreed";
import SelectAnimalCategory from "./SelectAnimalCategory";
import back from "@/utils/back";

const EditAnimalDisclosure = () => {
  // Hooks
  const { l } = useLang();
  const { data, open, onOpen, onClose } = useEditAnimalDisclosure();
  useBackOnClose(`edit-animal`, open, onOpen, onClose);
  const { req } = useRequest({
    id: "edit-animal",
  });

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { rt, setRt } = useRenderTrigger();

  // States
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      animal_category: undefined as any,
      animal_breed: undefined as any,
      average_weight: undefined as any,
      birth_date: undefined as any,
      stock: undefined as any,
    },
    validationSchema: yup.object().shape({
      animal_category: yup.array().required(l.required_form),
      animal_breed: yup.array().required(l.required_form),
      average_weight: yup.string().required(l.required_form),
      birth_date: yup.date().required(l.required_form),
      stock: yup.string().required(l.required_form),
    }),
    onSubmit: (values) => {
      // console.log(values);

      back();

      const payload = {
        _method: "patch",
        animal_category_id: values.animal_category[0].id,
        animal_breed_id: values.animal_breed[0].id,
        average_weight: values.average_weight,
        birth_date: values.birth_date[0],
        stock: values.stock,
      };
      const url = `/api/piramid/admin/master-data/animals/${data?.id}`;
      const config = {
        url,
        method: "POST",
        data: payload,
      };

      req({
        config,
        onResolve: {
          onSuccess: () => {
            setRt(!rt);
          },
        },
      });
    },
  });

  // Set initial values
  useEffect(() => {
    if (data) {
      formik.setValues({
        animal_category: [
          {
            id: data?.animal_category?.id,
            label: data?.animal_category?.label,
          },
        ],
        animal_breed: [
          {
            id: data?.animal_breed?.id,
            label: data?.animal_breed?.label,
          },
        ],
        average_weight: data?.average_weight,
        birth_date: [data?.birth_date],
        stock: data?.stock,
      });
    }
  }, [data]);

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <DisclosureRoot open={open} lazyLoad size={"xs"}>
      <DisclosureContent>
        <DisclosureHeader>
          <DisclosureHeaderContent title={`Edit ${l.animal}`} />
        </DisclosureHeader>

        <DisclosureBody>
          <FieldsetRoot>
            <form id="edit_animal_form" onSubmit={formik.handleSubmit}>
              <Field
                label={l.animal_interface[1]}
                invalid={!!formik.errors.animal_category}
                errorText={formik.errors.animal_category as string}
                mb={4}
              >
                <SelectAnimalCategory
                  name="animal_category"
                  onConfirm={(input) => {
                    formik.setFieldValue("animal_category", input);
                  }}
                  inputValue={formik.values.animal_category}
                />
              </Field>

              <Field
                label={l.animal_interface[2]}
                invalid={!!formik.errors.animal_category}
                errorText={formik.errors.animal_category as string}
                mb={4}
              >
                <SelectAnimalBreed
                  name="animal_breed"
                  onConfirm={(input) => {
                    formik.setFieldValue("animal_breed", input);
                  }}
                  inputValue={formik.values.animal_breed}
                />
              </Field>

              <Field
                label={l.animal_interface[3]}
                invalid={!!formik.errors.average_weight}
                errorText={formik.errors.average_weight as string}
                mb={4}
              >
                <InputGroup endElement={"kg"}>
                  <NumberInput
                    name="average_weight"
                    onChangeSetter={(input) => {
                      formik.setFieldValue("average_weight", input);
                    }}
                    inputValue={formik.values.average_weight}
                    placeholder="200"
                  />
                </InputGroup>
              </Field>

              <Field
                label={l.animal_interface[4]}
                invalid={!!formik.errors.birth_date}
                errorText={formik.errors.birth_date as string}
                mb={4}
              >
                <DatePickerInput
                  name="birth_date"
                  onConfirm={(input) => {
                    formik.setFieldValue("birth_date", input);
                  }}
                  inputValue={formik.values.birth_date}
                />
              </Field>

              <Field
                label={l.animal_interface[5]}
                invalid={!!formik.errors.stock}
                errorText={formik.errors.stock as string}
              >
                <NumberInput
                  name="stock"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("stock", input);
                  }}
                  inputValue={formik.values.stock}
                  placeholder="100"
                />
              </Field>
            </form>
          </FieldsetRoot>
        </DisclosureBody>

        <DisclosureFooter>
          <BackButton />

          <BButton
            colorPalette={themeConfig.colorPalette}
            type="submit"
            form="edit_animal_form"
          >
            {l.save}
          </BButton>
        </DisclosureFooter>
      </DisclosureContent>
    </DisclosureRoot>
  );
};

export default EditAnimalDisclosure;
