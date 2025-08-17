import useEditCityDisclosure from "@/context/useEditCityDisclosure";
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
import SelectProvince from "./SelectProvince";

const EditCityDisclosure = () => {
  // Hooks
  const { l } = useLang();
  const { data, open, onOpen, onClose } = useEditCityDisclosure();
  useBackOnClose(`edit-city-coverage-area`, open, onOpen, onClose);
  const { req } = useRequest({
    id: "edit-city-coverage-area",
  });

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { rt, setRt } = useRenderTrigger();

  // States
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: "",
      province: undefined as any,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(l.required_form),
      province: yup.array().required(l.required_form),
    }),
    onSubmit: (values) => {
      // console.log(values);

      back();

      const payload = new FormData();
      payload.append("_method", "patch");
      payload.append("name", values.name as string);
      payload.append("province_id", values.province?.[0]?.id);
      payload.append("is_active", "1");

      const url = `/api/piramid/admin/master-data/city-coverage-area/${data?.id}`;
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
        name: data.name,
        province: [
          {
            id: data.province?.id,
            label: data.province?.name,
          },
        ],
      });
    }
  }, [data]);

  return (
    <DisclosureRoot open={open} lazyLoad size={"xs"}>
      <DisclosureContent>
        <DisclosureHeader>
          <DisclosureHeaderContent title={`Edit ${l.master_data_navs.city}`} />
        </DisclosureHeader>

        <DisclosureBody>
          <FieldsetRoot>
            <form id="edit_city_form" onSubmit={formik.handleSubmit}>
              <Field
                label={l.name}
                invalid={!!formik.errors.name}
                errorText={formik.errors.name as string}
                mb={4}
              >
                <StringInput
                  name="name"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("name", input);
                  }}
                  inputValue={formik.values.name}
                />
              </Field>

              <Field
                label={l.master_data_navs.province}
                invalid={!!formik.errors.province}
                errorText={formik.errors.province as string}
              >
                <SelectProvince
                  name="province"
                  onConfirm={(input) => {
                    formik.setFieldValue("province", input);
                  }}
                  inputValue={formik.values.province}
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
            form="edit_city_form"
          >
            {l.save}
          </BButton>
        </DisclosureFooter>
      </DisclosureContent>
    </DisclosureRoot>
  );
};

export default EditCityDisclosure;
