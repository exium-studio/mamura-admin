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
import FileInput from "@/components/ui-custom/FileInput";
import Img from "@/components/ui-custom/Img";
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
import SelectBlogCategory from "@/components/widget/SelectBlogCategory";
import useLang from "@/context/useLang";
import useRenderTrigger from "@/context/useRenderTrigger";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import useDataState from "@/hooks/useDataState";
import useRequest from "@/hooks/useRequest";
import back from "@/utils/back";
import empty from "@/utils/empty";
import formatNumber from "@/utils/formatNumber";
import slugify from "@/utils/slugify";
import { fileValidation } from "@/utils/validationSchemas";
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
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const Create = () => {
  // Hooks
  const { l } = useLang();
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`add-blog`, open, onOpen, onClose);
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
      thumbnail: undefined as any,
      title: "",
      slug: "",
      blog_category: undefined as any,
      description: "",
    },
    validationSchema: yup.object().shape({
      thumbnail: fileValidation({
        maxSizeMB: 10,
        allowedExtensions: ["png", "jpeg", "jpg"],
      }).required(l.required_form),
      title: yup.string().required(l.required_form),
      slug: yup.string().required(l.required_form),
      blog_category: yup.array().required(l.required_form),
      description: yup.string().required(l.required_form),
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values);

      back();

      const payload = new FormData();
      if (!empty(values?.thumbnail))
        payload.append("thumbnail_id[]", values?.thumbnail?.[0]);
      payload.append("title", values?.title);
      payload.append("slug", values?.slug);
      payload.append("blog_category_id", values?.blog_category?.[0]?.id);
      payload.append("description", values?.description);
      payload.append("blog_content", values?.description);
      const url = `/api/mamura/admin/blog`;
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

  useEffect(() => {
    formik.setFieldValue("slug", slugify(formik.values.title));
  }, [formik.values.title]);

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
              title={`${l.add} ${l.master_data_navs.job_category}`}
            />
          </DisclosureHeader>

          <DisclosureBody>
            <FieldsetRoot>
              <form id="add_form" onSubmit={formik.handleSubmit}>
                <FieldRoot gap={4}>
                  <Field
                    label={l.blog_interface.thumbnail}
                    invalid={!!formik.errors.thumbnail}
                    errorText={formik.errors.thumbnail as string}
                    helperText={"Aspect ratio 2:1"}
                  >
                    <FileInput
                      dropzone
                      onChangeSetter={(input) => {
                        formik.setFieldValue("thumbnail", input);
                      }}
                      inputValue={formik.values.thumbnail}
                      maxFileSize={10}
                      accept=".png, .jpeg, .jpg"
                    />
                  </Field>

                  <Field
                    label={l.blog_interface.title}
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
                    label={l.blog_interface.slug}
                    invalid={!!formik.errors.slug}
                    errorText={formik.errors.slug as string}
                  >
                    <StringInput
                      onChangeSetter={(input) => {
                        formik.setFieldValue("slug", input);
                      }}
                      inputValue={formik.values.slug}
                    />
                  </Field>

                  <Field
                    label={l.blog_interface.category}
                    invalid={!!formik.errors.blog_category}
                    errorText={formik.errors.blog_category as string}
                  >
                    <SelectBlogCategory
                      onConfirm={(input) => {
                        formik.setFieldValue("blog_category", input);
                      }}
                      inputValue={formik.values.blog_category}
                    />
                  </Field>

                  <Field
                    label={l.blog_interface.description}
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

const TableData = (props: any) => {
  // Props
  const { dataState } = props;
  const { data, pagination, limit, setLimit, page, setPage } = dataState;

  // Hooks
  const { l } = useLang();
  const { req, loading: deleteLoading } = useRequest({
    id: `crud_job_vacancy`,
  });
  const navigate = useNavigate();

  // Contexts
  const { rt, setRt } = useRenderTrigger();

  // States
  const ths = [
    {
      th: l.blog_interface.thumbnail,
      wrapperProps: {
        justify: "center",
      },
    },
    {
      th: l.blog_interface.views,
      sortable: true,
      wrapperProps: {
        justify: "center",
      },
    },
    {
      th: l.blog_interface.title,
      sortable: true,
    },
    {
      th: l.blog_interface.slug,
      sortable: true,
    },
    {
      th: l.blog_interface.category,
      sortable: true,
    },
    {
      th: l.blog_interface.description,
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
          value: item?.thumbnail?.[0]?.file_url,
          td: (
            <Link to={item?.thumbnail?.[0]?.file_url} target="_blank">
              <Img
                w={"50px"}
                key={item?.thumbnail?.[0]?.file_url}
                src={item?.thumbnail?.[0]?.file_url}
                objectFit={"cover"}
              />
            </Link>
          ),
          wrapperProps: {
            justify: "center",
          },
        },
        {
          value: item?.views,
          td: formatNumber(item?.views),
          wrapperProps: {
            justify: "center",
          },
        },
        {
          value: item?.title,
          td: item?.title,
        },
        {
          value: item?.slug,
          td: item?.slug,
        },
        {
          value: item?.blog_category?.name,
          td: item?.blog_category?.name,
        },
        {
          value: item?.description,
          td: <TruncatedText>{item?.description}</TruncatedText>,
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
        return (
          <MenuItem
            value="edit"
            onClick={() => {
              navigate(`/blog/editor/${rowData.originalData.id}`);
            }}
          >
            Edit
          </MenuItem>
        );
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

          const url = `/api/mamura/admin/blog/${rowData.originalData.id}/restore`;
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

          const url = `/api/mamura/admin/blog/${rowData.originalData.id}`;
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

const BlogPage = () => {
  // Contexts
  const { rt } = useRenderTrigger();

  // States
  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
  });
  const dataState = useDataState({
    url: `/api/mamura/admin/blog`,
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
    <CContainer flex={1} px={[2, null, 4]} pt={[4, null, 0]} pb={4}>
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

export default BlogPage;
