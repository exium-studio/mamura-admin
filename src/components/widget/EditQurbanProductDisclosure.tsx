import useEditQurbanProductDisclosure from "@/context/useEditQurbanProductDisclosure";
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
import NumberInput from "../ui-custom/NumberInput";
import P from "../ui-custom/P";
import StringInput from "../ui-custom/StringInput";
import Textarea from "../ui-custom/Textarea";
import { Field } from "../ui/field";
import { InputGroup } from "../ui/input-group";
import ExistingFileItem from "./ExistingFIleItem";
import SelectAnimal from "./SelectAnimal";

const EditQurbanProductDisclosure = () => {
  // Hooks
  const { l } = useLang();
  const { data, open, onOpen, onClose } = useEditQurbanProductDisclosure();
  useBackOnClose(`edit-qurban-product`, open, onOpen, onClose);
  const { req } = useRequest({
    id: "edit-qurban-product",
  });

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { rt, setRt } = useRenderTrigger();

  // States
  const [existingPhotoProduct, setExistingPhotoProduct] = useState<any[]>([]);
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      animal: undefined as any,
      name: "",
      description: "",
      price: undefined as any,
      photo_product: undefined as any,
      deleted_photo_product: undefined as any,
    },
    validationSchema: yup.object().shape({
      animal: yup.array().required(l.required_form),
      name: yup.string().required(l.required_form),
      description: yup.string().required(l.required_form),
      price: yup.number().required(l.required_form),
      photo_product:
        existingPhotoProduct.length === 0
          ? fileValidation({
              allowedExtensions: ["jpg", "jpeg", "png", "svg"],
            }).required(l.required_form)
          : fileValidation({
              allowedExtensions: ["jpg", "jpeg", "png", "svg"],
            }),
    }),
    onSubmit: (values) => {
      // console.log(values);

      back();

      const payload = new FormData();
      payload.append("_method", "patch");
      payload.append("animal_id", values.animal[0].id as string);
      payload.append("name", values.name as string);
      payload.append("description", values.description as string);
      payload.append("price", values.price as string);
      if (values.photo_product && values.photo_product.length > 0) {
        values.photo_product.forEach((file: File) => {
          payload.append("photo_product_id[]", file);
        });
      }
      if (
        values.deleted_photo_product &&
        values.deleted_photo_product.length > 0
      ) {
        values.deleted_photo_product.forEach((item: any) => {
          payload.append("delete_document_ids[]", item?.id);
        });
      }

      const url = `/api/piramid/admin/master-data/qurban-product/${data?.id}`;
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
        animal: [
          {
            id: data.animal.id,
            label: `${data.animal.animal_breed.label} - ${data.animal.animal_category.label}`,
          },
        ],
        name: data.name,
        description: data.description,
        price: data.price,
        photo_product: undefined,
        deleted_photo_product: [],
      });

      setExistingPhotoProduct(data?.photo_product_id);
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
            title={`Edit ${l.master_data_navs.qurban_product}`}
          />
        </DisclosureHeader>

        <DisclosureBody>
          <FieldsetRoot>
            <form id="edit_qurban_product_form" onSubmit={formik.handleSubmit}>
              <Field
                label={l.master_data_navs_group.animal}
                invalid={!!formik.errors.animal}
                errorText={formik.errors.animal as string}
                mb={4}
              >
                <SelectAnimal
                  name="animal"
                  onConfirm={(input) => {
                    formik.setFieldValue("animal", input);
                  }}
                  inputValue={formik.values.animal}
                />
              </Field>

              <Field
                label={l.qurban_product_interface[2]}
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
                label={l.qurban_product_interface[3]}
                invalid={!!formik.errors.description}
                errorText={formik.errors.description as string}
                mb={4}
              >
                <Textarea
                  name="description"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("description", input);
                  }}
                  inputValue={formik.values.description}
                />
              </Field>

              <Field
                label={l.qurban_product_interface[4]}
                invalid={!!formik.errors.price}
                errorText={formik.errors.price as string}
                mb={4}
              >
                <InputGroup startElement="Rp">
                  <NumberInput
                    name="price"
                    onChangeSetter={(input) => {
                      formik.setFieldValue("price", input);
                    }}
                    inputValue={formik.values.price}
                  />
                </InputGroup>
              </Field>

              <Field
                label={l.qurban_product_interface[1]}
                invalid={!!formik.errors.photo_product}
                errorText={formik.errors.photo_product as string}
              >
                {!empty(existingPhotoProduct) && (
                  <CContainer>
                    {existingPhotoProduct?.map((item: any, i: number) => {
                      return (
                        <ExistingFileItem
                          key={i}
                          data={item}
                          onDelete={() => {
                            setExistingPhotoProduct((prev) =>
                              prev.filter((f) => f !== item)
                            );
                            formik.setFieldValue("deleted_photo_product", [
                              ...formik.values.deleted_photo_product,
                              item,
                            ]);
                          }}
                        />
                      );
                    })}
                  </CContainer>
                )}

                {empty(existingPhotoProduct) && (
                  <FileInput
                    dropzone
                    name="photo_product"
                    onChangeSetter={(input) => {
                      formik.setFieldValue("photo_product", input);
                    }}
                    inputValue={formik.values.photo_product}
                    accept=".png, .jpg, .jpeg,"
                  />
                )}

                {!empty(formik.values.deleted_photo_product) && (
                  <CContainer gap={2} mt={4}>
                    <P>{l.qurban_product_interface.deleted_1}</P>

                    {formik.values.deleted_photo_product?.map(
                      (item: any, i: number) => {
                        return (
                          <ExistingFileItem
                            key={i}
                            data={item}
                            withDeleteButton={false}
                            withUndobutton
                            onUndo={() => {
                              setExistingPhotoProduct((prev) => [
                                ...prev,
                                item,
                              ]);

                              formik.setFieldValue(
                                "deleted_photo_product",
                                formik.values.deleted_photo_product.filter(
                                  (f: any) => f !== item
                                )
                              );

                              formik.setFieldValue("icon", undefined);
                            }}
                          />
                        );
                      }
                    )}
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
            form="edit_qurban_product_form"
          >
            {l.save}
          </BButton>
        </DisclosureFooter>
      </DisclosureContent>
    </DisclosureRoot>
  );
};

export default EditQurbanProductDisclosure;
