import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";
import FeedbackNoData from "@/components/ui-custom/FeedbackNoData";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
import FileInput from "@/components/ui-custom/FileInput";
import P from "@/components/ui-custom/P";
import StringInput from "@/components/ui-custom/StringInput";
import Textarea from "@/components/ui-custom/Textarea";
import { Field } from "@/components/ui/field";
import BlogPreview from "@/components/widget/BlogPreview";
import ExistingFileItem from "@/components/widget/ExistingFIleItem";
import SelectBlogCategory from "@/components/widget/SelectBlogCategory";
import useLang from "@/context/useLang";
import useRenderTrigger from "@/context/useRenderTrigger";
import { useThemeConfig } from "@/context/useThemeConfig";
import useDataState from "@/hooks/useDataState";
import useRequest from "@/hooks/useRequest";
import empty from "@/utils/empty";
import formatDate from "@/utils/formatDate";
import formatNumber from "@/utils/formatNumber";
import { fileValidation } from "@/utils/validationSchemas";
import { FieldRoot, HStack, Icon, SimpleGrid } from "@chakra-ui/react";
import { IconEye } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";

const Editor = (props: any) => {
  // Props
  const { blog } = props;

  // Hooks
  const { l } = useLang();
  const { req, loading: loading } = useRequest({
    id: "crud_blog",
  });

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { rt, setRt } = useRenderTrigger();

  // States
  const [existingThumbnail, setExistingThumbnail] = useState<any[]>([]);
  const [deletedThumbnail, setDeletedThumbnail] = useState<any[]>([]);
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

      const payload = new FormData();
      payload.append("_method", "patch");
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

  // Handle initial values
  useEffect(() => {
    formik.setValues({
      thumbnail: undefined,
      title: blog?.title,
      slug: blog?.slug,
      blog_category: [
        {
          id: blog?.blog_category?.id,
          label: blog?.blog_category?.name,
        },
      ],
      description: blog?.description,
    });

    setExistingThumbnail(blog?.thumbnail);
  }, []);

  return (
    <CContainer
      flex={1}
      pb={4}
      px={[2, null, 4]}
      pt={[4, null, 0]}
      className="scrollY"
    >
      <HStack justify={"space-between"} px={[2, null, 4]} pb={4}>
        <CContainer>
          <HStack>
            <Icon boxSize={5}>
              <IconEye stroke={1.5} />
            </Icon>
            <P>{`${formatNumber(blog?.views)}`}</P>
          </HStack>
          <P>{`${l.last_updated}: ${formatDate(blog?.updated_at)}`}</P>
        </CContainer>

        <HStack>
          <BButton
            type="submit"
            form={"edit_form"}
            colorPalette={themeConfig.colorPalette}
            size={"sm"}
            loading={loading}
          >
            {l.save}
          </BButton>
        </HStack>
      </HStack>

      <form id="edit_form">
        <SimpleGrid
          columns={[1, null, 2]}
          flex={1}
          maxH={[
            "calc(100dvh - 50px - 80px - 80px)",
            null,
            "calc(100dvh - 50px - 80px)",
          ]}
          bg={"body"}
          borderRadius={themeConfig.radii.container}
          className="scrollY"
        >
          {/* Basic */}
          <CContainer
            pt={4}
            px={4}
            borderRight={["none", null, "1px solid {colors.border.muted}"]}
            minH={"full"}
            className="scrollY"
          >
            <FieldRoot gap={4}>
              <Field
                label={l.blog_interface.thumbnail}
                invalid={!!formik.errors.thumbnail}
                errorText={formik.errors.thumbnail as string}
                helperText={"Aspect ratio 2:1"}
              >
                {!empty(existingThumbnail) && (
                  <CContainer>
                    {existingThumbnail?.map((item: any, i: number) => {
                      return (
                        <ExistingFileItem
                          key={i}
                          data={item}
                          onDelete={() => {
                            setExistingThumbnail((prev) =>
                              prev.filter((f) => f !== item)
                            );
                            setDeletedThumbnail([...deletedThumbnail, item]);
                          }}
                        />
                      );
                    })}
                  </CContainer>
                )}

                {empty(existingThumbnail) && (
                  <FileInput
                    dropzone
                    name="image"
                    onChangeSetter={(input) => {
                      formik.setFieldValue("image", input);
                    }}
                    inputValue={formik.values.thumbnail}
                    maxFileSize={10}
                    accept={".png, .jpg, .jpeg"}
                  />
                )}

                {!empty(deletedThumbnail) && (
                  <CContainer gap={2} mt={2}>
                    <P color={"fg.muted"}>{l.deleted_image}</P>

                    {deletedThumbnail?.map((item: any, i: number) => {
                      return (
                        <ExistingFileItem
                          key={i}
                          data={item}
                          withDeleteButton={false}
                          withUndobutton
                          onUndo={() => {
                            setExistingThumbnail((prev) => [...prev, item]);
                            setDeletedThumbnail(
                              deletedThumbnail.filter((f: any) => f !== item)
                            );
                          }}
                        />
                      );
                    })}
                  </CContainer>
                )}
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
          </CContainer>

          {/* Content */}
          <CContainer
            minH={"full"}
            pt={4}
            px={4}
            borderTop={["1px solid {colors.border.muted}", null, "none"]}
            overflowY={"auto"}
            maxH={[
              "calc(100dvh - 50px - 80px - 80px)",
              null,
              "calc(100dvh - 50px - 80px)",
            ]}
            className="scrollY"
          >
            <BlogPreview blog={blog} />
          </CContainer>
        </SimpleGrid>
      </form>
    </CContainer>
  );
};

const BlogEditorPage = () => {
  // States
  const { blogId } = useParams();
  const { error, initialLoading, data, makeRequest } = useDataState<any>({
    url: `/api/mamura/admin/blog/${blogId}`,
    dependencies: [],
    dataResource: false,
  });
  const render = {
    loading: <ComponentSpinner />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    loaded: <Editor blog={data} />,
  };

  return (
    <>
      {initialLoading && render.loading}
      {!initialLoading && (
        <>
          {error && render.error}
          {!error && (
            <>
              {data && render.loaded}
              {(!data || empty(data)) && render.empty}
            </>
          )}
        </>
      )}
    </>
  );
};

export default BlogEditorPage;
