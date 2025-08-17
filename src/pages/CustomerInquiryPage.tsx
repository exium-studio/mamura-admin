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
import SearchInput from "@/components/ui-custom/SearchInput";
import StringInput from "@/components/ui-custom/StringInput";
import TableComponent from "@/components/ui-custom/TableComponent";
import Textarea from "@/components/ui-custom/Textarea";
import TruncatedText from "@/components/ui-custom/TruncatedText";
import { Field } from "@/components/ui/field";
import { MenuItem } from "@/components/ui/menu";
import DeleteStatus from "@/components/widget/DeleteStatus";
import useEditAnimalDisclosure from "@/context/useEditAnimalDisclosure";
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
import { IconPlus } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";

const Create = () => {
  // Hooks
  const { l } = useLang();
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`add-faq`, open, onOpen, onClose);
  const { req } = useRequest({
    id: "crud_faq",
  });

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { rt, setRt } = useRenderTrigger();

  // States
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      question: "",
      answer: "",
    },
    validationSchema: yup.object().shape({
      question: yup.string().required(l.required_form),
      answer: yup.string().required(l.required_form),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values);

      back();

      const payload = {
        question: values?.question,
        answer: values?.answer,
      };
      const url = `/api/mamura/admin/faq`;
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
              title={`${l.add} ${l.master_data_navs.faqs}`}
            />
          </DisclosureHeader>

          <DisclosureBody>
            <FieldsetRoot>
              <form id="add_form" onSubmit={formik.handleSubmit}>
                <FieldRoot gap={4}>
                  <Field
                    label={l.faqs_interface.question}
                    invalid={!!formik.errors.question}
                    errorText={formik.errors.question as string}
                  >
                    <Textarea
                      onChangeSetter={(input) => {
                        formik.setFieldValue("question", input);
                      }}
                      inputValue={formik.values.question}
                    />
                  </Field>

                  <Field
                    label={l.faqs_interface.answer}
                    invalid={!!formik.errors.answer}
                    errorText={formik.errors.answer as string}
                  >
                    <Textarea
                      onChangeSetter={(input) => {
                        formik.setFieldValue("answer", input);
                      }}
                      inputValue={formik.values.answer}
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
  useBackOnClose(`edit-faq`, open, onOpen, onClose);
  const { req } = useRequest({
    id: "crud_faq",
  });

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { rt, setRt } = useRenderTrigger();

  // States
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      question: "",
      answer: "",
    },
    validationSchema: yup.object().shape({
      question: yup.string().required(l.required_form),
      answer: yup.string().required(l.required_form),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values);

      back();

      const payload = {
        _method: "patch",
        question: values?.question,
        answer: values?.answer,
      };
      const url = `/api/mamura/admin/faq/${initialData?.id}`;
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
      question: initialData.question,
      answer: initialData.answer,
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
              title={`Edit ${l.master_data_navs.faqs}`}
            />
          </DisclosureHeader>

          <DisclosureBody>
            <FieldsetRoot>
              <form id="edit_form" onSubmit={formik.handleSubmit}>
                <FieldRoot gap={4}>
                  <Field
                    label={l.faqs_interface.question}
                    invalid={!!formik.errors.question}
                    errorText={formik.errors.question as string}
                  >
                    <StringInput
                      onChangeSetter={(input) => {
                        formik.setFieldValue("question", input);
                      }}
                      inputValue={formik.values.question}
                    />
                  </Field>

                  <Field
                    label={l.faqs_interface.answer}
                    invalid={!!formik.errors.answer}
                    errorText={formik.errors.answer as string}
                  >
                    <Textarea
                      onChangeSetter={(input) => {
                        formik.setFieldValue("answer", input);
                      }}
                      inputValue={formik.values.answer}
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

  // States
  const ths = [
    {
      th: l.customer_inquiry_interface.name,
      sortable: true,
    },
    {
      th: l.customer_inquiry_interface.preferred_package,
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
          value: item?.question,
          td: <TruncatedText>{item?.question}</TruncatedText>,
        },
        {
          value: item?.answer,
          td: <TruncatedText>{item?.answer}</TruncatedText>,
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

  return (
    <TableComponent
      ths={ths}
      tds={tds}
      originalData={data}
      limitControl={limit}
      setLimitControl={setLimit}
      pageControl={page}
      setPageControl={setPage}
      pagination={pagination}
    />
  );
};

const CustomerInquiryPage = () => {
  // Contexts
  const { rt } = useRenderTrigger();

  // States
  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
  });
  const dataState = useDataState({
    url: `/api/mamura/admin/inquiry`,
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
    <CContainer flex={1} overflowY={"auto"} p={4} pt={0}>
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

export default CustomerInquiryPage;
