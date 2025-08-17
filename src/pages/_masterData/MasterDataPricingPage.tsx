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
import ItemContainer from "@/components/ui-custom/ItemContainer";
import ItemHeaderContainer from "@/components/ui-custom/ItemHeaderContainer";
import NumberInput from "@/components/ui-custom/NumberInput";
import SearchInput from "@/components/ui-custom/SearchInput";
import TableComponent from "@/components/ui-custom/TableComponent";
import TruncatedText from "@/components/ui-custom/TruncatedText";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import DeleteStatus from "@/components/widget/DeleteStatus";
import SelectAnimalBreed from "@/components/widget/SelectAnimalBreed";
import SelectAnimalCategory from "@/components/widget/SelectAnimalCategory";
import useEditAnimalDisclosure from "@/context/useEditAnimalDisclosure";
import useLang from "@/context/useLang";
import useRenderTrigger from "@/context/useRenderTrigger";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import useDataState from "@/hooks/useDataState";
import useRequest from "@/hooks/useRequest";
import back from "@/utils/back";
import formatNumber from "@/utils/formatNumber";
import { FieldsetRoot, HStack, Icon, useDisclosure } from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

const Create = () => {
  // Hooks
  const { l } = useLang();
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`add-animal`, open, onOpen, onClose);
  const { req } = useRequest({
    id: "crud-animal",
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
              <form id="add_animal_form" onSubmit={formik.handleSubmit}>
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
                  invalid={!!formik.errors.animal_breed}
                  errorText={formik.errors.animal_breed as string}
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

const TableData = (props: any) => {
  // Props
  const { dataState } = props;
  const { data, pagination, limit, setLimit, page, setPage } = dataState;

  // Hooks
  const { l } = useLang();
  const dataId = useEditAnimalDisclosure((s) => s.data?.id);
  const { req, loading: deleteLoading } = useRequest({
    id: `crud-pricing-${dataId}`,
  });

  // Contexts
  const { rt, setRt } = useRenderTrigger();
  const setAnimalData = useEditAnimalDisclosure((s) => s.setData);
  const editAnimalOnOpen = useEditAnimalDisclosure((s) => s.onOpen);

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
      callback: (rowData: any) => {
        setAnimalData(rowData?.originalData);
        editAnimalOnOpen();
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
