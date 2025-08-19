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
import P from "@/components/ui-custom/P";
import SearchInput from "@/components/ui-custom/SearchInput";
import StringInput from "@/components/ui-custom/StringInput";
import TableComponent from "@/components/ui-custom/TableComponent";
import { Field } from "@/components/ui/field";
import { MenuItem } from "@/components/ui/menu";
import DeleteStatus from "@/components/widget/DeleteStatus";
import SelectEmployeeStatus from "@/components/widget/SelectEmployeeStatus";
import SelectJobCategory from "@/components/widget/SelectJobCategory";
import SelectJobLocation from "@/components/widget/SelectJobLocation";
import StringArratInput from "@/components/widget/StringArrayInput";
import useLang from "@/context/useLang";
import useRenderTrigger from "@/context/useRenderTrigger";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import useDataState from "@/hooks/useDataState";
import useRequest from "@/hooks/useRequest";
import back from "@/utils/back";
import {
  FieldRoot,
  FieldsetRoot,
  HStack,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { IconCircleFilled, IconPlus } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";

const Create = () => {
  // Hooks
  const { l } = useLang();
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`add-job-vacancy`, open, onOpen, onClose);
  const { req } = useRequest({
    id: "crud_job_vacancy",
  });

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { rt, setRt } = useRenderTrigger();

  // States
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      title: "",
      job_category: undefined as any,
      employee_status: undefined as any,
      job_location: undefined as any,
      qualifications: [],
    },
    validationSchema: yup.object().shape({
      title: yup.string().required(l.required_form),
      job_category: yup.array().required(l.required_form),
      employee_status: yup.array().required(l.required_form),
      job_location: yup.array().required(l.required_form),
      qualifications: yup.array().required(l.required_form),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values);

      back();

      const payload = {
        title: values?.title,
        carrier_category_id: values?.job_category?.[0].id,
        employee_status_id: values?.employee_status?.[0].id,
        job_location_id: values?.employee_status?.[0].id,
        qualification: values?.qualifications,
      };
      const url = `/api/mamura/admin/carrier`;
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
              title={`${l.add} ${l.master_data_navs.job_vacancy}`}
            />
          </DisclosureHeader>

          <DisclosureBody>
            <FieldsetRoot>
              <form id="add_form" onSubmit={formik.handleSubmit}>
                <FieldRoot gap={4}>
                  <Field
                    label={l.job_vacancy_interface.title}
                    invalid={!!formik.errors.title}
                    errorText={formik.errors.title as string}
                  >
                    <StringInput
                      onChangeSetter={(input) => {
                        formik.setFieldValue("title", input);
                      }}
                      inputValue={formik.values.title}
                    />
                  </Field>

                  <Field
                    label={l.job_vacancy_interface.job_category}
                    invalid={!!formik.errors.job_category}
                    errorText={formik.errors.job_category as string}
                  >
                    <SelectJobCategory
                      onConfirm={(input) => {
                        formik.setFieldValue("job_category", input);
                      }}
                      inputValue={formik.values.job_category}
                    />
                  </Field>

                  <Field
                    label={l.job_vacancy_interface.employee_status}
                    invalid={!!formik.errors.employee_status}
                    errorText={formik.errors.employee_status as string}
                  >
                    <SelectEmployeeStatus
                      onConfirm={(input) => {
                        formik.setFieldValue("employee_status", input);
                      }}
                      inputValue={formik.values.employee_status}
                    />
                  </Field>

                  <Field
                    label={l.job_vacancy_interface.job_location}
                    invalid={!!formik.errors.job_location}
                    errorText={formik.errors.job_location as string}
                  >
                    <SelectJobLocation
                      onConfirm={(input) => {
                        formik.setFieldValue("job_location", input);
                      }}
                      inputValue={formik.values.job_location}
                    />
                  </Field>

                  <Field
                    label={l.job_vacancy_interface.qualification}
                    invalid={!!formik.errors.qualifications}
                    errorText={formik.errors.qualifications as string}
                  >
                    <StringArratInput
                      onConfirm={(input) => {
                        formik.setFieldValue("qualifications", input);
                      }}
                      inputValue={formik.values.qualifications}
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
  useBackOnClose(`edit-job-vacancy`, open, onOpen, onClose);
  const { req } = useRequest({
    id: "crud_job_vacancy",
  });

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { rt, setRt } = useRenderTrigger();

  // States
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      title: "",
      job_category: undefined as any,
      employee_status: undefined as any,
      job_location: undefined as any,
      qualifications: [],
    },
    validationSchema: yup.object().shape({
      title: yup.string().required(l.required_form),
      job_category: yup.array().required(l.required_form),
      employee_status: yup.array().required(l.required_form),
      job_location: yup.array().required(l.required_form),
      qualifications: yup.array().required(l.required_form),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values);

      back();

      const payload = {
        _method: "patch",
        carrier_category_id: values?.job_category?.[0].id,
        employee_status_id: values?.employee_status?.[0].id,
        job_location_id: values?.employee_status?.[0].id,
        qualification: values?.qualifications,
      };
      const url = `/api/mamura/admin/carrier`;
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
      title: initialData?.title,
      job_category: [
        {
          id: initialData?.carrier_category?.id,
          label: initialData?.carrier_category?.name,
        },
      ],
      employee_status: [
        {
          id: initialData?.employee_status?.id,
          label: initialData?.employee_status?.name,
        },
      ],
      job_location: [
        {
          id: initialData?.job_location?.id,
          label: initialData?.job_location?.name,
        },
      ],
      qualifications: initialData?.qualification,
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
              title={`Edit ${l.master_data_navs.job_vacancy}`}
            />
          </DisclosureHeader>

          <DisclosureBody>
            <FieldsetRoot>
              <form id="edit_form" onSubmit={formik.handleSubmit}>
                <FieldRoot gap={4}>
                  <Field
                    label={l.job_vacancy_interface.title}
                    invalid={!!formik.errors.title}
                    errorText={formik.errors.title as string}
                  >
                    <StringInput
                      onChangeSetter={(input) => {
                        formik.setFieldValue("title", input);
                      }}
                      inputValue={formik.values.title}
                    />
                  </Field>

                  <Field
                    label={l.job_vacancy_interface.job_category}
                    invalid={!!formik.errors.job_category}
                    errorText={formik.errors.job_category as string}
                  >
                    <SelectJobCategory
                      onConfirm={(input) => {
                        formik.setFieldValue("job_category", input);
                      }}
                      inputValue={formik.values.job_category}
                    />
                  </Field>

                  <Field
                    label={l.job_vacancy_interface.employee_status}
                    invalid={!!formik.errors.employee_status}
                    errorText={formik.errors.employee_status as string}
                  >
                    <SelectEmployeeStatus
                      onConfirm={(input) => {
                        formik.setFieldValue("employee_status", input);
                      }}
                      inputValue={formik.values.employee_status}
                    />
                  </Field>

                  <Field
                    label={l.job_vacancy_interface.job_location}
                    invalid={!!formik.errors.job_location}
                    errorText={formik.errors.job_location as string}
                  >
                    <SelectJobLocation
                      onConfirm={(input) => {
                        formik.setFieldValue("job_location", input);
                      }}
                      inputValue={formik.values.job_location}
                    />
                  </Field>

                  <Field
                    label={l.job_vacancy_interface.qualification}
                    invalid={!!formik.errors.qualifications}
                    errorText={formik.errors.qualifications as string}
                  >
                    <StringArratInput
                      onConfirm={(input) => {
                        formik.setFieldValue("qualifications", input);
                      }}
                      inputValue={formik.values.qualifications}
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
const JobQualifications = (props: any) => {
  // Props
  const { jobVacancy } = props;

  // Hooks
  const { l } = useLang();
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`job-qualifications-${jobVacancy?.id}`, open, onOpen, onClose);

  // Contexts
  const { themeConfig } = useThemeConfig();

  return (
    <>
      <BButton
        colorPalette={themeConfig.colorPalette}
        variant={"ghost"}
        onClick={onOpen}
      >
        {l.view}
      </BButton>

      <DisclosureRoot open={open} lazyLoad size={"xs"}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent title={l.qualification} />
          </DisclosureHeader>

          <DisclosureBody>
            <CContainer gap={2}>
              {jobVacancy?.qualification?.map((qualification: any) => {
                return (
                  <HStack key={qualification}>
                    <Icon boxSize={1}>
                      <IconCircleFilled />
                    </Icon>

                    <P>{qualification}</P>
                  </HStack>
                );
              })}
            </CContainer>
          </DisclosureBody>

          <DisclosureFooter>
            <BackButton />
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
    id: `crud_job_vacancy`,
  });

  // Contexts
  const { rt, setRt } = useRenderTrigger();

  // States
  const ths = [
    {
      th: l.job_vacancy_interface.title,
      sortable: true,
    },
    {
      th: l.job_vacancy_interface.job_category,
      sortable: true,
    },
    {
      th: l.job_vacancy_interface.employee_status,
      sortable: true,
    },
    {
      th: l.job_vacancy_interface.job_location,
      sortable: true,
    },
    {
      th: l.job_vacancy_interface.qualification,
      wrapperProps: {
        justify: "center",
      },
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
          value: item?.title,
          td: item?.title,
        },
        {
          value: item?.carrier_category?.name,
          td: item?.carrier_category?.name,
        },
        {
          value: item?.employee_status?.name,
          td: item?.employee_status?.name,
        },
        {
          value: item?.job_location?.name,
          td: item?.job_location?.name,
        },
        {
          value: "",
          td: <JobQualifications jobVacancy={item} />,
          wrapperProps: {
            justify: "center",
          },
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

          const url = `/api/mamura/admin/carrier/${rowData.originalData.id}/restore`;
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

          const url = `/api/mamura/admin/carrier/${rowData.originalData.id}`;
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

const MasterDataJobVacancyPage = () => {
  // Contexts
  const { rt } = useRenderTrigger();

  // States
  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
  });
  const dataState = useDataState({
    url: `/api/mamura/admin/carrier`,
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

export default MasterDataJobVacancyPage;
