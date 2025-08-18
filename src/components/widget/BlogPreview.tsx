import CContainer from "@/components/ui-custom/CContainer";
import empty from "@/utils/empty";
import formatCount from "@/utils/formatCount";
import formatDate from "@/utils/formatDate";
import { handleShareBlog } from "@/utils/handleShare";
import { HStack, Icon, Stack, StackProps } from "@chakra-ui/react";
import { IconCircleFilled, IconEye, IconShare } from "@tabler/icons-react";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import BButton from "../ui-custom/BButton";
import FeedbackNoData from "../ui-custom/FeedbackNoData";
import Heading1 from "../ui-custom/Heading1";
import Img from "../ui-custom/Img";
import P from "../ui-custom/P";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../ui/accordion";

interface Props extends StackProps {
  blog: any;
}
type TocItem = {
  id: string;
  level: number;
  text: string;
};

const BlogPreview = (props: Props) => {
  // Props
  const { blog } = props;

  // States
  const [toc, setToc] = useState<TocItem[]>([]);
  const [html, setHtml] = useState("");

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(blog?.blog_content || "", "text/html");
    const headings = Array.from(doc.querySelectorAll("h1, h2, h3, h4, h5, h6"));

    const items: TocItem[] = headings.map((el, idx) => {
      const id = `heading-${idx}`;
      el.setAttribute("id", id);
      return {
        id,
        level: Number(el.tagName.replace("H", "")),
        text: el.textContent || "",
      };
    });

    setToc(items);
    setHtml(doc.body.innerHTML);
  }, [blog]);

  return (
    <CContainer>
      <CContainer>
        <Img
          borderRadius={16}
          aspectRatio={2 / 1}
          key={blog?.thumbnail?.[0]?.file_url}
          src={blog?.thumbnail?.[0]?.file_url}
          alt={blog?.thumbnail?.[0]?.file_url}
        />
      </CContainer>

      <CContainer my={"32px"}>
        <Stack flexDir={"column"} gap={"32px"}>
          <CContainer
            bg={"bg.subtle"}
            borderRadius={16}
            h={"fit"}
            // pos={["", null, "sticky"]}
            top={"calc(70px + 16px)"}
          >
            <CContainer
              bg={"s.500"}
              color={"white"}
              p={4}
              fontSize={"lg"}
              fontWeight={"bold"}
              borderRadius={16}
            >
              Daftar isi
            </CContainer>

            <CContainer p={4} pl={0}>
              <AccordionRoot multiple defaultValue={["toc"]}>
                <AccordionItem value="toc" border={"none"}>
                  <AccordionItemTrigger indicatorPlacement="start" ml={2} p={0}>
                    <CContainer>
                      <P>{formatDate(blog?.updated_at || Date())}</P>
                    </CContainer>
                  </AccordionItemTrigger>

                  <AccordionItemContent p={0}>
                    <CContainer pl={4} pt={4} overflow={"visible"}>
                      {empty(toc) && (
                        <FeedbackNoData
                          title=""
                          description="Tidak memiliki daftar isi"
                        />
                      )}

                      {!empty(toc) &&
                        toc?.map((item) => (
                          <HStack
                            pos={"relative"}
                            borderLeft={"1px solid"}
                            borderColor={"p.500"}
                            pl={4}
                            py={2}
                            cursor={"pointer"}
                            onClick={() =>
                              document
                                .getElementById(item.id)
                                ?.scrollIntoView({ behavior: "smooth" })
                            }
                          >
                            <Icon
                              boxSize={3}
                              color={"p.500"}
                              zIndex={2}
                              pos={"absolute"}
                              left={"-6px"}
                              top={"50%"}
                              transform={"translateY(-50%)"}
                            >
                              <IconCircleFilled />
                            </Icon>
                            <P key={item?.id} fontWeight={"medium"}>
                              {item?.text}
                            </P>
                          </HStack>
                        ))}
                    </CContainer>
                  </AccordionItemContent>
                </AccordionItem>
              </AccordionRoot>
            </CContainer>
          </CContainer>

          <CContainer gap={4}>
            <Heading1 fontWeight={"bold"}>{blog?.title}</Heading1>

            <HStack>
              <HStack>
                <Icon boxSize={"18px"}>
                  <IconEye stroke={1.5} />
                </Icon>
                <P color={"fg.muted"}>{`${formatCount(
                  blog?.views
                )} Dilihat`}</P>
              </HStack>

              <BButton
                size={"xs"}
                variant={"ghost"}
                fontWeight={"normal"}
                onClick={(e) => {
                  e.stopPropagation();
                  if (blog) {
                    handleShareBlog(
                      blog,
                      `https://mamura.com/blog/${blog.slug}`
                    );
                  }
                }}
              >
                <Icon boxSize={4}>
                  <IconShare stroke={1.5} />
                </Icon>
                Share
              </BButton>
            </HStack>

            {/* <CContainer>{parse(blog?.blog_content || "")}</CContainer> */}
            <CContainer gap={4}>{parse(html || "")}</CContainer>
          </CContainer>
        </Stack>
      </CContainer>
    </CContainer>
  );
};

export default BlogPreview;
