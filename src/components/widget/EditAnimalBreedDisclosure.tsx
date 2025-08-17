import useEditAnimalBreedDisclosure from "@/context/useEditAnimalBreedDisclosure";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import useRenderTrigger from "@/context/useRenderTrigger";
import useRequest from "@/hooks/useRequest";
import back from "@/utils/back";
import { FieldsetRoot } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";
import BackButton from "../ui-custom/BackButton";
import BButton from "../ui-custom/BButton";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "../ui-custom/Disclosure";
import DisclosureHeaderContent from "../ui-custom/DisclosureHeaderContent";
import StringInput from "../ui-custom/StringInput";
import { Field } from "../ui/field";

const EditAnimalBreedDisclosure = () => {
  // Hooks
  const { l } = useLang();
  const { data, open, onOpen, onClose } = useEditAnimalBreedDisclosure();
  useBackOnClose(`edit-animal-breed`, open, onOpen, onClose);
  const { req } = useRequest({
    id: "edit-animal-breed",
  });

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { rt, setRt } = useRenderTrigger();

  // States
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      label: undefined as any,
    },
    validationSchema: yup.object().shape({
      label: yup.string().required(l.required_form),
    }),
    onSubmit: (values) => {
      // console.log(values);

      back();

      const payload = {
        _method: "patch",
        label: values.label,
      };
      const url = `/api/piramid/admin/master-data/animal-breed/${data?.id}`;
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
        label: data?.label,
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
          <DisclosureHeaderContent
            title={`Edit ${l.master_data_navs.animal_breed}`}
          />
        </DisclosureHeader>

        <DisclosureBody>
          <FieldsetRoot>
            <form id="edit_animal_form" onSubmit={formik.handleSubmit}>
              <Field
                label={l.animal_breed_interface[1]}
                invalid={!!formik.errors.label}
                errorText={formik.errors.label as string}
              >
                <StringInput
                  name="label"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("label", input);
                  }}
                  inputValue={formik.values.label}
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

export default EditAnimalBreedDisclosure;
