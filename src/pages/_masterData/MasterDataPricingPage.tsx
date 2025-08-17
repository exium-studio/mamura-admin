import BackButton from "@/components/ui-custom/BackButton";
import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";
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
import ItemContainer from "@/components/ui-custom/ItemContainer";
import ItemHeaderContainer from "@/components/ui-custom/ItemHeaderContainer";
import NumberInput from "@/components/ui-custom/NumberInput";
import SearchInput from "@/components/ui-custom/SearchInput";
import StringInput from "@/components/ui-custom/StringInput";
import TableComponent from "@/components/ui-custom/TableComponent";
import Textarea from "@/components/ui-custom/Textarea";
import TruncatedText from "@/components/ui-custom/TruncatedText";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { MenuItem } from "@/components/ui/menu";
import DeleteStatus from "@/components/widget/DeleteStatus";
import SelectPricingCategory from "@/components/widget/SelectPricingCategory";
import useEditAnimalDisclosure from "@/context/useEditAnimalDisclosure";
import useLang from "@/context/useLang";
import useRenderTrigger from "@/context/useRenderTrigger";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import useDataState from "@/hooks/useDataState";
import useRequest from "@/hooks/useRequest";
import back from "@/utils/back";
import formatNumber from "@/utils/formatNumber";
import {
  FieldRoot,
  FieldsetRoot,
  HStack,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";

const Create = () => {
  // Hooks
  const { l } = useLang();
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`add-pricing`, open, onOpen, onClose);
  const { req } = useRequest({
    id: "crud_pricing",
    errorMessage: {
      409: {
        DUPLICATE_ANIMAL_CATEGORY_AND_BREED: {
          ...l.error_duplicate_animal_category_and_breed_toast,
        },
      },
    },
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
    onSubmit: (values, { resetForm }) => {
      // console.log(values);

      back();

      const payload = {
        animal_category_id: values.animal_category[0].id,
        animal_breed_id: values.animal_breed[0].id,
        average_weight: values.average_weight,
        birth_date: values.birth_date[0],
        stock: values.stock,
      };
      const url = `/api/piramid/admin/master-data/animals`;
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
              title={`${l.add} ${l.master_data_navs.pricing}`}
            />
          </DisclosureHeader>

          <DisclosureBody>
            <FieldsetRoot>
              <form id="add_animal_form" onSubmit={formik.handleSubmit}></form>
            </FieldsetRoot>
          </DisclosureBody>

          <DisclosureFooter>
            <BackButton />
            <BButton
              colorPalette={themeConfig?.colorPalette}
              type="submit"
              form="add_animal_form"
            >
              {l.add}
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
  useBackOnClose(`edit-pricing`, open, onOpen, onClose);
  const { req } = useRequest({
    id: "crud_pricing",
    errorMessage: {
      409: {
        DUPLICATE_ANIMAL_CATEGORY_AND_BREED: {
          ...l.error_duplicate_animal_category_and_breed_toast,
        },
      },
    },
  });

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { rt, setRt } = useRenderTrigger();

  // States
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      pricing_category: [
        {
          id: initialData.pricing_category.id,
          label: initialData.pricing_category.name,
        },
      ],
      name: initialData.name,
      description: initialData.description,
      internet_speed: initialData.internet_speed,
      price: initialData.price,
      is_recommended: initialData.is_recommended,
    },
    validationSchema: yup.object().shape({
      pricing_category: yup.array().required(l.required_form),
      name: yup.string().required(l.required_form),
      description: yup.string().required(l.required_form),
      internet_speed: yup.string().required(l.required_form),
      price: yup.string().required(l.required_form),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values);

      back();

      const payload = {
        _method: "patch",
        pricing_category_id: values.pricing_category[0].id,
        name: values.name,
        description: values.description,
        internet_speed: values.internet_speed,
        price: values.price,
        is_recommended: values.is_recommended,
      };
      const url = `/api/mamura/admin/pricing/${initialData.id}`;
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
      pricing_category: [
        {
          id: initialData.pricing_category.id,
          label: initialData.pricing_category.name,
        },
      ],
      name: initialData.name,
      description: initialData.description,
      internet_speed: initialData.internet_speed,
      price: initialData.price,
      is_recommended: initialData.is_recommended,
    });
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
              title={`Edit ${l.master_data_navs.pricing}`}
            />
          </DisclosureHeader>

          <DisclosureBody>
            <FieldsetRoot>
              <form id="edit_pricing_form" onSubmit={formik.handleSubmit}>
                <FieldRoot gap={4}>
                  <Field
                    label={l.pricing_interface.category}
                    invalid={!!formik.errors.pricing_category}
                    errorText={formik.errors.pricing_category as string}
                  >
                    <SelectPricingCategory
                      onConfirm={(input) => {
                        formik.setFieldValue("pricing_category", input);
                      }}
                      inputValue={formik.values.pricing_category}
                    />
                  </Field>

                  <Field
                    label={l.name}
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
                    label={l.pricing_interface.description}
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
                    label={l.pricing_interface.internet_speed}
                    invalid={!!formik.errors.internet_speed}
                    errorText={formik.errors.internet_speed as string}
                  >
                    <NumberInput
                      onChangeSetter={(input) => {
                        formik.setFieldValue("internet_speed", input);
                      }}
                      inputValue={formik.values.internet_speed}
                    />
                  </Field>

                  <Field
                    label={l.pricing_interface.price}
                    invalid={!!formik.errors.price}
                    errorText={formik.errors.price as string}
                  >
                    <NumberInput
                      onChangeSetter={(input) => {
                        formik.setFieldValue("price", input);
                      }}
                      inputValue={formik.values.price}
                    />
                  </Field>

                  <Field
                    invalid={!!formik.errors.is_recommended}
                    errorText={formik.errors.is_recommended as string}
                  >
                    <Checkbox
                      checked={formik.values.is_recommended}
                      onCheckedChange={(e) =>
                        formik.setFieldValue("is_recommended", e.checked)
                      }
                    >
                      {l.pricing_interface.is_recommended}
                    </Checkbox>
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
              form="edit_pricing_form"
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
  const dataId = useEditAnimalDisclosure((s) => s.data?.id);
  const { req, loading: deleteLoading } = useRequest({
    id: `crud_pricing-${dataId}`,
  });

  // Contexts
  const { rt, setRt } = useRenderTrigger();

  // States
  const ths = [
    {
      th: l.pricing_interface.category,
      sortable: true,
    },
    {
      th: l.pricing_interface.name,
      sortable: true,
    },
    {
      th: l.pricing_interface.internet_speed,
      sortable: true,
      wrapperProps: {
        justify: "end",
      },
    },
    {
      th: l.pricing_interface.price,
      sortable: true,
      wrapperProps: {
        justify: "end",
      },
    },
    {
      th: l.pricing_interface.is_recommended,
      sortable: true,
      wrapperProps: {
        justify: "center",
      },
    },
    {
      th: l.pricing_interface.description,
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
          value: item?.pricing_category?.name,
          td: item?.pricing_category?.name,
        },
        {
          value: item?.name,
          td: item?.name,
        },
        {
          value: item?.internet_speed,
          td: `${formatNumber(item?.internet_speed)} Mbps`,
          wrapperProps: {
            justify: "end",
          },
          dataType: "number",
        },
        {
          value: item?.birth_date,
          td: `Rp ${formatNumber(item?.price)}`,
          dataType: "number",
          wrapperProps: {
            justify: "end",
          },
        },
        {
          value: item?.is_recommended,
          dataType: "boolean",
          td: (
            <Icon
              boxSize={5}
              color={item?.is_recommended ? "green.500" : "fg.subtle"}
            >
              {item?.is_recommended ? <IconCheck /> : <IconX />}
            </Icon>
          ),
          wrapperProps: {
            justify: "center",
          },
        },
        {
          value: item?.description,
          td: <TruncatedText>{item.description}</TruncatedText>,
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

          const url = `/api/mamura/admin/pricing/${rowData.originalData.id}/restore`;
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

          const url = `/api/mamura/admin/pricing/${rowData.originalData.id}`;
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

const MasterDataPricingPage = () => {
  // Contexts
  const { rt } = useRenderTrigger();

  // States
  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
  });
  const dataState = useDataState({
    url: `/api/mamura/admin/pricing`,
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
    <CContainer flex={1} overflowY={"auto"}>
      <ItemContainer flex={1} overflowY={"auto"}>
        <ItemHeaderContainer borderless>
          <HStack py={2} justify={"space-between"} w={"full"}>
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

export default MasterDataPricingPage;
