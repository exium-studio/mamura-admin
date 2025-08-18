import BackButton from "@/components/ui-custom/BackButton";
import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";
import DatePickerInput from "@/components/ui-custom/DatePickerInput";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "@/components/ui-custom/Disclosure";
import DisclosureHeaderContent from "@/components/ui-custom/DisclosureHeaderContent";
import FeedbackNoData from "@/components/ui-custom/FeedbackNoData";
import FeedbackNotFound from "@/components/ui-custom/FeedbackNotFound";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
import FileInput from "@/components/ui-custom/FileInput";
import Img from "@/components/ui-custom/Img";
import ItemContainer from "@/components/ui-custom/ItemContainer";
import ItemHeaderContainer from "@/components/ui-custom/ItemHeaderContainer";
import P from "@/components/ui-custom/P";
import SearchInput from "@/components/ui-custom/SearchInput";
import StringInput from "@/components/ui-custom/StringInput";
import TableComponent from "@/components/ui-custom/TableComponent";
import Textarea from "@/components/ui-custom/Textarea";
import TruncatedText from "@/components/ui-custom/TruncatedText";
import { Field } from "@/components/ui/field";
import { MenuItem } from "@/components/ui/menu";
import DeleteStatus from "@/components/widget/DeleteStatus";
import ExistingFileItem from "@/components/widget/ExistingFIleItem";
import PromoDisclosureTrigger from "@/components/widget/PromoDisclosureTrigger";
import StringArratInput from "@/components/widget/StringArrayInput";
import useLang from "@/context/useLang";
import useRenderTrigger from "@/context/useRenderTrigger";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import useDataState from "@/hooks/useDataState";
import useRequest from "@/hooks/useRequest";
import back from "@/utils/back";
import empty from "@/utils/empty";
import formatDate from "@/utils/formatDate";
import {
  FieldRoot,
  FieldsetRoot,
  HStack,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";

const Create = () => {
  // Hooks
  const { l } = useLang();
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`add-promo`, open, onOpen, onClose);
  const { req } = useRequest({
    id: "crud_promo",
  });

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { rt, setRt } = useRenderTrigger();

  // States
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      image: undefined as any,
      name: "",
      description: "",
      terms: [],
      promo_end: undefined as any,
    },
    validationSchema: yup.object().shape({
      image: yup.array().required(l.required_form),
      name: yup.string().required(l.required_form),
      description: yup.string().required(l.required_form),
      terms: yup.array().min(1, l.required_form).required(l.required_form),
      promo_end: yup.array().required(l.required_form),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values);

      back();

      const payload = new FormData();
      if (!empty(values?.image))
        payload.append("promo_banner_id[]", values?.image?.[0]);
      payload.append("name", values?.name);
      payload.append("description", values?.description);
      payload.append("terms", JSON.stringify(values?.terms));
      payload.append("promo_end", values?.promo_end?.[0]);
      const url = `/api/mamura/admin/promo`;
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

  return (
    <>
      <BButton
        iconButton
        colorPalette={themeConfig?.colorPalette}
        onClick={onOpen}
      >
        <Icon>
          <IconPlus />
        </Icon>
      </BButton>

      <DisclosureRoot open={open} lazyLoad size={"xs"}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent
              title={`${l.add} ${l.master_data_navs.promo}`}
            />
          </DisclosureHeader>

          <DisclosureBody>
            <FieldsetRoot>
              <form id="add_form" onSubmit={formik.handleSubmit}>
                <FieldRoot gap={4}>
                  <Field
                    label={l.promo_interface.image}
                    invalid={!!formik.errors.image}
                    errorText={formik.errors.image as string}
                  >
                    <FileInput
                      dropzone
                      onChangeSetter={(input) => {
                        formik.setFieldValue("image", input);
                      }}
                      inputValue={formik.values.image}
                      maxFileSize={10}
                      accept={".png, .jpg, .jpeg"}
                    />
                  </Field>

                  <Field
                    label={l.promo_interface.name}
                    invalid={!!formik.errors.name}
                    errorText={formik.errors.name as string}
                  >
                    <StringInput
                      onChangeSetter={(input) => {
                        formik.setFieldValue("name", input);
                      }}
                      inputValue={formik.values.name}
                    />
                  </Field>

                  <Field
                    label={l.promo_interface.description}
                    invalid={!!formik.errors.description}
                    errorText={formik.errors.description as string}
                  >
                    <Textarea
                      onChangeSetter={(input) => {
                        formik.setFieldValue("description", input);
                      }}
                      inputValue={formik.values.description}
                    />
                  </Field>

                  <Field
                    label={l.promo_interface.terms}
                    invalid={!!formik.errors.terms}
                    errorText={formik.errors.terms as string}
                  >
                    <StringArratInput
                      onConfirm={(input) => {
                        formik.setFieldValue("terms", input);
                      }}
                      inputValue={formik.values.terms}
                    />
                  </Field>

                  <Field
                    label={l.promo_interface.promo_end}
                    invalid={!!formik.errors.promo_end}
                    errorText={formik.errors.promo_end as string}
                  >
                    <DatePickerInput
                      onConfirm={(input) => {
                        formik.setFieldValue("promo_end", input);
                      }}
                      inputValue={formik.values.promo_end}
                    />
                  </Field>
                </FieldRoot>
              </form>
            </FieldsetRoot>
          </DisclosureBody>

          <DisclosureFooter>
            <BackButton />
            <BButton
              colorPalette={themeConfig?.colorPalette}
              type="submit"
              form="add_form"
            >
              {l.save}
            </BButton>
          </DisclosureFooter>
        </DisclosureContent>
      </DisclosureRoot>
    </>
  );
};
const Edit = (props: any) => {
  // Props
  const { initialData } = props;

  // Hooks
  const { l } = useLang();
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`edit-promo`, open, onOpen, onClose);
  const { req } = useRequest({
    id: "crud_promo",
  });

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { rt, setRt } = useRenderTrigger();

  // States
  const [existingImage, setExistingImage] = useState<any[]>([]);
  const [deletedImage, setDeletedImage] = useState<any[]>([]);
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      image: undefined as any,
      name: "",
      description: "",
      terms: [],
      promo_end: undefined as any,
    },
    validationSchema: yup.object().shape({
      image: yup.array().required(l.required_form),
      name: yup.string().required(l.required_form),
      description: yup.string().required(l.required_form),
      terms: yup.array().min(1, l.required_form).required(l.required_form),
      promo_end: yup.array().required(l.required_form),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values);

      back();

      const payload = new FormData();
      payload.append("_method", "patch");
      if (!empty(values?.image))
        payload.append("promo_banner_id[]", values?.image?.[0]);
      if (!empty(deletedImage)) {
        payload.append(
          "delete_banner_ids[]",
          JSON.stringify(deletedImage?.map((image) => image.id))
        );
      }
      payload.append("name", values?.name);
      payload.append("description", values?.description);
      payload.append("terms", JSON.stringify(values?.terms));
      payload.append("promo_end", values?.promo_end?.[0]);
      const url = `/api/mamura/admin/promo/${initialData?.id}`;
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

  // Handle initial values
  useEffect(() => {
    formik.setValues({
      image: initialData?.image,
      name: initialData?.name,
      description: initialData?.description,
      terms: initialData?.terms,
      promo_end: [initialData?.promo_end],
    });

    setExistingImage(initialData?.image);
  }, [initialData]);

  return (
    <>
      <MenuItem value="edit" onClick={onOpen}>
        Edit
      </MenuItem>

      <DisclosureRoot open={open} lazyLoad size={"xs"}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent
              title={`Edit ${l.master_data_navs.promo}`}
            />
          </DisclosureHeader>

          <DisclosureBody>
            <FieldsetRoot>
              <form id="edit_form" onSubmit={formik.handleSubmit}>
                <FieldRoot gap={4}>
                  <Field
                    label={l.promo_interface.image}
                    invalid={!!formik.errors.image}
                    errorText={formik.errors.image as string}
                  >
                    {!empty(existingImage) && (
                      <CContainer>
                        {existingImage?.map((item: any, i: number) => {
                          return (
                            <ExistingFileItem
                              key={i}
                              data={item}
                              onDelete={() => {
                                setExistingImage((prev) =>
                                  prev.filter((f) => f !== item)
                                );
                                setDeletedImage([...deletedImage, item]);
                              }}
                            />
                          );
                        })}
                      </CContainer>
                    )}

                    {empty(existingImage) && (
                      <FileInput
                        dropzone
                        name="image"
                        onChangeSetter={(input) => {
                          formik.setFieldValue("image", input);
                        }}
                        inputValue={formik.values.image}
                        maxFileSize={10}
                        accept={".png, .jpg, .jpeg"}
                      />
                    )}

                    {!empty(deletedImage) && (
                      <CContainer gap={2} mt={2}>
                        <P color={"fg.muted"}>{l.deleted_image}</P>

                        {deletedImage?.map((item: any, i: number) => {
                          return (
                            <ExistingFileItem
                              key={i}
                              data={item}
                              withDeleteButton={false}
                              withUndobutton
                              onUndo={() => {
                                setExistingImage((prev) => [...prev, item]);
                                setDeletedImage(
                                  deletedImage.filter((f: any) => f !== item)
                                );
                              }}
                            />
                          );
                        })}
                      </CContainer>
                    )}
                  </Field>

                  <Field
                    label={l.promo_interface.name}
                    invalid={!!formik.errors.name}
                    errorText={formik.errors.name as string}
                  >
                    <StringInput
                      onChangeSetter={(input) => {
                        formik.setFieldValue("name", input);
                      }}
                      inputValue={formik.values.name}
                    />
                  </Field>

                  <Field
                    label={l.promo_interface.description}
                    invalid={!!formik.errors.description}
                    errorText={formik.errors.description as string}
                  >
                    <Textarea
                      onChangeSetter={(input) => {
                        formik.setFieldValue("description", input);
                      }}
                      inputValue={formik.values.description}
                    />
                  </Field>

                  <Field
                    label={l.promo_interface.terms}
                    invalid={!!formik.errors.terms}
                    errorText={formik.errors.terms as string}
                  >
                    <StringArratInput
                      onConfirm={(input) => {
                        formik.setFieldValue("terms", input);
                      }}
                      inputValue={formik.values.terms}
                    />
                  </Field>

                  <Field
                    label={l.promo_interface.promo_end}
                    invalid={!!formik.errors.promo_end}
                    errorText={formik.errors.promo_end as string}
                  >
                    <DatePickerInput
                      onConfirm={(input) => {
                        formik.setFieldValue("promo_end", input);
                      }}
                      inputValue={formik.values.promo_end}
                    />
                  </Field>
                </FieldRoot>
              </form>
            </FieldsetRoot>
          </DisclosureBody>

          <DisclosureFooter>
            <BackButton />
            <BButton
              colorPalette={themeConfig?.colorPalette}
              type="submit"
              form="edit_form"
            >
              {l.save}
            </BButton>
          </DisclosureFooter>
        </DisclosureContent>
      </DisclosureRoot>
    </>
  );
};

const TableData = (props: any) => {
  // Props
  const { dataState } = props;
  const { data, pagination, limit, setLimit, page, setPage } = dataState;

  // Hooks
  const { l } = useLang();
  const { req, loading: deleteLoading } = useRequest({
    id: `crud_promo`,
  });

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { rt, setRt } = useRenderTrigger();

  // States
  const ths = [
    {
      th: l.promo_interface.image,
      wrapperProps: {
        justify: "center",
      },
    },
    {
      th: l.promo_interface.name,
      sortable: true,
    },
    {
      th: l.promo_interface.description,
    },
    {
      th: l.promo_interface.terms,
      wrapperProps: {
        justify: "center",
      },
    },
    {
      th: l.promo_interface.promo_end,
      sortable: true,
    },
    {
      th: l.delete_status,
      sortable: true,
    },
  ];
  const tds = data?.map((item: any) => {
    return {
      originalData: item,
      columnsFormat: [
        {
          value: item?.image?.[0]?.file_url,
          td: (
            <Link to={item?.image?.[0]?.file_url} target="_blank">
              <Img
                key={item?.image?.[0]?.file_url}
                src={item?.image?.[0]?.file_url}
                objectFit={"cover"}
                w={"50px"}
              />
            </Link>
          ),
          wrapperProps: {
            justify: "center",
          },
        },
        {
          value: item?.name,
          td: item?.name,
        },
        {
          value: item?.description,
          td: <TruncatedText>{item?.description}</TruncatedText>,
        },
        {
          value: item?.terms,
          td: (
            <PromoDisclosureTrigger id={`${item?.id}`} promoTerms={item?.terms}>
              <BButton
                colorPalette={themeConfig?.colorPalette}
                variant={"ghost"}
              >
                {l.view}
              </BButton>
            </PromoDisclosureTrigger>
          ),
          wrapperProps: {
            justify: "center",
          },
        },
        {
          value: item?.promo_end,
          td: formatDate(item?.promo_end),
          dataType: "date",
        },

        {
          value: item?.deleted_at,
          td: item?.deleted_at ? (
            <DeleteStatus deletedAt={item?.deleted_at} />
          ) : (
            ""
          ),
          dataType: "date",
        },
      ],
    };
  });
  const rowOptions = [
    {
      label: "Edit",
      component: (rowData: any) => {
        return <Edit initialData={rowData.originalData} />;
      },
    },
    {
      label: "Restore",
      disabled: (rowData: any): boolean => {
        return !rowData.originalData.deleted_at;
      },
      confirmation: (rowData: any) => ({
        id: `${rowData.id}`,
        title: "Restore?",
        description: `${l.restore_confirmation}`,
        confirmLabel: "Restore",
        confirmCallback: () => {
          back();

          const url = `/api/mamura/admin/promo/${rowData.originalData.id}/restore`;
          const config = {
            url,
            method: "POST",
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
      }),
    },
    {
      label: "Delete",
      disabled: (rowData: any) => {
        return rowData.originalData.deleted_at;
      },
      menuItemProps: {
        color: "red.400",
      },
      confirmation: (rowData: any) => ({
        id: `${rowData.id}`,
        title: "Delete?",
        description: `${l.perma_delete_confirmation}`,
        confirmLabel: "Delete",
        confirmButtonProps: {
          colorPalette: "red",
        },
        loading: deleteLoading,
        confirmCallback: () => {
          back();

          const url = `/api/mamura/admin/promo/${rowData.originalData.id}`;
          const config = {
            url,
            method: "DELETE",
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
      }),
    },
  ];

  return (
    <TableComponent
      ths={ths}
      tds={tds}
      originalData={data}
      rowOptions={rowOptions}
      limitControl={limit}
      setLimitControl={setLimit}
      pageControl={page}
      setPageControl={setPage}
      pagination={pagination}
    />
  );
};

const MasterDataPromoPage = () => {
  // Contexts
  const { rt } = useRenderTrigger();

  // States
  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
  });
  const dataState = useDataState({
    url: `/api/mamura/admin/promo`,
    method: "GET",
    payload: {
      search: filterConfig.search,
    },
    dependencies: [filterConfig, rt],
  });
  const { data, initialLoading, error, makeRequest } = dataState;
  const render = {
    loading: <ComponentSpinner flex={1} />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    notFound: <FeedbackNotFound />,
    loaded: <TableData dataState={dataState} />,
  };

  return (
    <CContainer flex={1} className={"scrollY"}>
      <ItemContainer flex={1} overflowY={"auto"}>
        <ItemHeaderContainer borderless>
          <HStack justify={"space-between"} w={"full"}>
            <SearchInput
              onChangeSetter={(input) => {
                setFilterConfig({
                  ...filterConfig,
                  search: input,
                });
              }}
              inputValue={filterConfig.search}
            />

            <Create />
          </HStack>
        </ItemHeaderContainer>

        {initialLoading && render.loading}
        {!initialLoading && (
          <>
            {error && render.error}
            {!error && (
              <>
                {data && render.loaded}

                {!data && render.empty}
              </>
            )}
          </>
        )}
      </ItemContainer>
    </CContainer>
  );
};

export default MasterDataPromoPage;
