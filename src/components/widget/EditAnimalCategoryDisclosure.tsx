import useEditAnimalCategoryDisclosure from "@/context/useEditAnimalCategoryDisclosure";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import useRenderTrigger from "@/context/useRenderTrigger";
import useRequest from "@/hooks/useRequest";
import back from "@/utils/back";
import empty from "@/utils/empty";
import { fileValidation } from "@/utils/validationSchemas";
import { FieldsetRoot } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import BackButton from "../ui-custom/BackButton";
import BButton from "../ui-custom/BButton";
import CContainer from "../ui-custom/CContainer";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "../ui-custom/Disclosure";
import DisclosureHeaderContent from "../ui-custom/DisclosureHeaderContent";
import FileInput from "../ui-custom/FileInput";
import P from "../ui-custom/P";
import StringInput from "../ui-custom/StringInput";
import { Field } from "../ui/field";
import ExistingFileItem from "./ExistingFIleItem";
import { Checkbox } from "../ui/checkbox";

const EditAnimalCategoryDisclosure = () => {
  // Hooks
  const { l } = useLang();
  const { data, open, onOpen, onClose } = useEditAnimalCategoryDisclosure();
  useBackOnClose(`edit-animal-category`, open, onOpen, onClose);
  const { req } = useRequest({
    id: "edit-animal-category",
  });

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { rt, setRt } = useRenderTrigger();

  // States
  const [existingIcon, setExistingIcon] = useState<any[]>([]);
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      label: "",
      icon: undefined as any,
      for_aqiqah: false,
      deleted_icon: undefined as any,
    },
    validationSchema: yup.object().shape({
      label: yup.string().required(l.required_form),
      icon:
        existingIcon.length === 0
          ? fileValidation({
              allowedExtensions: ["jpg", "jpeg", "png", "svg"],
            })
          : fileValidation({
              allowedExtensions: ["jpg", "jpeg", "png", "svg"],
            }).required(l.required_form),
    }),
    onSubmit: (values) => {
      // console.log(values);

      back();

      const payload = new FormData();
      payload.append("_method", "patch");
      payload.append("label", values.label);
      payload.append("for_aqiqah", values.for_aqiqah ? "1" : "0");
      if (values.icon && values.icon.length > 0) {
        values.icon.forEach((file: File) => {
          payload.append("icon_id[]", file);
        });
      }
      if (values.deleted_icon && values.deleted_icon.length > 0) {
        values.deleted_icon.forEach((item: any) => {
          payload.append("delete_document_ids[]", item?.id);
        });
      }

      const url = `/api/piramid/admin/master-data/animal-category/${data?.id}`;
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
        for_aqiqah: data?.for_aqiqah === 1,
        icon: undefined,
        deleted_icon: [],
      });

      setExistingIcon(data?.icon_id);
    }
  }, [data]);

  return (
    <DisclosureRoot open={open} lazyLoad size={"xs"}>
      <DisclosureContent>
        <DisclosureHeader>
          <DisclosureHeaderContent
            title={`Edit ${l.master_data_navs.animal_category}`}
          />
        </DisclosureHeader>

        <DisclosureBody>
          <FieldsetRoot>
            <form id="edit_animal_form" onSubmit={formik.handleSubmit}>
              <Field
                // label={l.animal_category_interface[2]}
                invalid={!!formik.errors.for_aqiqah}
                errorText={formik.errors.for_aqiqah as string}
                mb={4}
              >
                <Checkbox
                  name="for_aqiqah"
                  onChange={(e: any) => {
                    formik.setFieldValue("for_aqiqah", e.target.checked);
                  }}
                  disabled
                  checked={formik.values.for_aqiqah}
                  readOnly
                >
                  <P mt={"1px"}>{l.animal_category_interface.desc_2}</P>
                </Checkbox>
              </Field>

              <Field
                label={l.animal_category_interface[1]}
                invalid={!!formik.errors.label}
                errorText={formik.errors.label as string}
                mb={4}
              >
                <StringInput
                  name="label"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("label", input);
                  }}
                  inputValue={formik.values.label}
                />
              </Field>

              <Field
                label={l.animal_category_interface[2]}
                invalid={!!formik.errors.icon}
                errorText={formik.errors.icon as string}
              >
                {!empty(existingIcon) && (
                  <CContainer>
                    {existingIcon?.map((item: any, i: number) => {
                      return (
                        <ExistingFileItem
                          key={i}
                          data={item}
                          onDelete={() => {
                            setExistingIcon((prev) =>
                              prev.filter((f) => f !== item)
                            );
                            formik.setFieldValue("deleted_icon", [
                              ...formik.values.deleted_icon,
                              item,
                            ]);
                          }}
                        />
                      );
                    })}
                  </CContainer>
                )}

                {empty(existingIcon) && (
                  <FileInput
                    dropzone
                    name="icon"
                    onChangeSetter={(input) => {
                      formik.setFieldValue("icon", input);
                    }}
                    inputValue={formik.values.icon}
                    accept=".png, .jpg, .jpeg,"
                  />
                )}

                {!empty(formik.values.deleted_icon) && (
                  <CContainer gap={2} mt={4}>
                    <P>{l.animal_category_interface.deleted_3}</P>

                    {formik.values.deleted_icon?.map((item: any, i: number) => {
                      return (
                        <ExistingFileItem
                          key={i}
                          data={item}
                          withDeleteButton={false}
                          withUndobutton
                          onUndo={() => {
                            setExistingIcon((prev) => [...prev, item]);

                            formik.setFieldValue(
                              "deleted_icon",
                              formik.values.deleted_icon.filter(
                                (f: any) => f !== item
                              )
                            );

                            formik.setFieldValue("icon", undefined);
                          }}
                        />
                      );
                    })}
                  </CContainer>
                )}
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

export default EditAnimalCategoryDisclosure;
