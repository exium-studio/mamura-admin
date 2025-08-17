import useEditMosqueDisclosure from "@/context/useEditMosqueDisclosure";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import useRenderTrigger from "@/context/useRenderTrigger";
import useRequest from "@/hooks/useRequest";
import back from "@/utils/back";
import { FieldsetRoot, SimpleGrid } from "@chakra-ui/react";
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
import Textarea from "../ui-custom/Textarea";
import { Field } from "../ui/field";
import LocationMapInput from "./LocationMapInput";
import CContainer from "../ui-custom/CContainer";

const EditMosqueDisclosure = () => {
  // Hooks
  const { l } = useLang();
  const { data, open, onOpen, onClose } = useEditMosqueDisclosure();
  useBackOnClose(`edit-mosque`, open, onOpen, onClose);
  const { req } = useRequest({
    id: "edit-mosque",
  });

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { rt, setRt } = useRenderTrigger();

  // States
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: "",
      address: "",
      phone_number: "",
      wa_number: "",
      postal_code: "",
      city: "",
      province: "",
      country: "",
      latitude: undefined as any,
      longitude: undefined as any,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(l.required_form),
      address: yup.string().required(l.required_form),
      phone_number: yup.string().required(l.required_form),
      wa_number: yup.string().required(l.required_form),
      postal_code: yup.string().required(l.required_form),
      city: yup.string().required(l.required_form),
      province: yup.string().required(l.required_form),
      country: yup.string().required(l.required_form),
      latitude: yup.number().required(l.required_form),
      longitude: yup.number().required(l.required_form),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values);

      back();

      const payload = new FormData();
      payload.append("_method", "patch");
      payload.append("name", values.name);
      payload.append("address", values.address);
      payload.append("phone_number", values.phone_number);
      payload.append("wa_number", values.wa_number);
      payload.append("postal_code", values.postal_code);
      payload.append("city", values.city);
      payload.append("province", values.province);
      payload.append("country", values.country);
      payload.append("latitude", values.latitude);
      payload.append("longitude", values.longitude);

      const url = `/api/piramid/admin/master-data/mosque-relation/${data?.id}`;
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
            resetForm();
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
        address: data.address,
        phone_number: data.phone_number,
        wa_number: data.wa_number,
        postal_code: data.postal_code,
        city: data.city,
        province: data.province,
        country: data.country,
        latitude: data.latitude,
        longitude: data.longitude,
      });
    }
  }, [data]);

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <DisclosureRoot open={open} lazyLoad size={"lg"}>
      <DisclosureContent>
        <DisclosureHeader>
          <DisclosureHeaderContent
            title={`Edit ${l.master_data_navs.province}`}
          />
        </DisclosureHeader>

        <DisclosureBody>
          <FieldsetRoot>
            <form id="edit_mosque_form" onSubmit={formik.handleSubmit}>
              <SimpleGrid columns={[1, null, 2]} gap={6}>
                <CContainer>
                  <Field
                    label={l.mosque_interface[1]}
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
                    label={l.mosque_interface[2]}
                    invalid={!!formik.errors.address}
                    errorText={formik.errors.address as string}
                    mb={4}
                  >
                    <Textarea
                      name="address"
                      onChangeSetter={(input) => {
                        formik.setFieldValue("address", input);
                      }}
                      inputValue={formik.values.address}
                    />
                  </Field>

                  <Field
                    label={l.mosque_interface[3]}
                    invalid={!!formik.errors.phone_number}
                    errorText={formik.errors.phone_number as string}
                    mb={4}
                  >
                    <StringInput
                      name="phone_number"
                      onChangeSetter={(input) => {
                        formik.setFieldValue("phone_number", input);
                      }}
                      inputValue={formik.values.phone_number}
                    />
                  </Field>

                  <Field
                    label={l.mosque_interface[4]}
                    invalid={!!formik.errors.wa_number}
                    errorText={formik.errors.wa_number as string}
                    mb={4}
                  >
                    <StringInput
                      name="wa_number"
                      onChangeSetter={(input) => {
                        formik.setFieldValue("wa_number", input);
                      }}
                      inputValue={formik.values.wa_number}
                    />
                  </Field>

                  <Field
                    label={l.mosque_interface[5]}
                    invalid={!!formik.errors.postal_code}
                    errorText={formik.errors.postal_code as string}
                    mb={4}
                  >
                    <StringInput
                      name="postal_code"
                      onChangeSetter={(input) => {
                        formik.setFieldValue("postal_code", input);
                      }}
                      inputValue={formik.values.postal_code}
                    />
                  </Field>

                  <Field
                    label={l.mosque_interface[6]}
                    invalid={!!formik.errors.city}
                    errorText={formik.errors.city as string}
                    mb={4}
                  >
                    <StringInput
                      name="city"
                      onChangeSetter={(input) => {
                        formik.setFieldValue("city", input);
                      }}
                      inputValue={formik.values.city}
                    />
                  </Field>
                </CContainer>

                <CContainer>
                  <Field
                    label={l.mosque_interface[7]}
                    invalid={!!formik.errors.province}
                    errorText={formik.errors.province as string}
                    mb={4}
                  >
                    <StringInput
                      name="province"
                      onChangeSetter={(input) => {
                        formik.setFieldValue("province", input);
                      }}
                      inputValue={formik.values.province}
                    />
                  </Field>

                  <Field
                    label={l.mosque_interface[8]}
                    invalid={!!formik.errors.country}
                    errorText={formik.errors.country as string}
                    mb={4}
                  >
                    <StringInput
                      name="country"
                      onChangeSetter={(input) => {
                        formik.setFieldValue("country", input);
                      }}
                      inputValue={formik.values.country}
                    />
                  </Field>

                  <Field
                    label={l.location}
                    invalid={!!formik.errors.latitude}
                    errorText={formik.errors.latitude as string}
                  >
                    <LocationMapInput
                      onChangeSetter={(inputValue) => {
                        formik.setFieldValue("latitude", inputValue.latitude);
                        formik.setFieldValue("longitude", inputValue.longitude);
                      }}
                      inputValue={{
                        latitude: formik.values.latitude,
                        longitude: formik.values.longitude,
                      }}
                    />
                  </Field>
                </CContainer>
              </SimpleGrid>
            </form>
          </FieldsetRoot>
        </DisclosureBody>

        <DisclosureFooter>
          <BackButton />

          <BButton
            colorPalette={themeConfig.colorPalette}
            type="submit"
            form="edit_mosque_form"
          >
            {l.save}
          </BButton>
        </DisclosureFooter>
      </DisclosureContent>
    </DisclosureRoot>
  );
};

export default EditMosqueDisclosure;
