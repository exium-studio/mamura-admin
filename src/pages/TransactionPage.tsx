import BackButton from "@/components/ui-custom/BackButton";
import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import ComponentSpinner from "@/components/ui-custom/ComponentSpinner";
import DateRangePickerInput from "@/components/ui-custom/DateRangePickerInput";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "@/components/ui-custom/Disclosure";
import DisclosureHeaderContent from "@/components/ui-custom/DisclosureHeaderContent";
import FeedbackNoData from "@/components/ui-custom/FeedbackNoData";
import FeedbackRetry from "@/components/ui-custom/FeedbackRetry";
import P from "@/components/ui-custom/P";
import TableComponent from "@/components/ui-custom/TableComponent";
import { byServices } from "@/constants/lateral";
import { Type__DateRange } from "@/constants/types";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import useDataState from "@/hooks/useDataState";
import formatDate from "@/utils/formatDate";
import formatNumber from "@/utils/formatNumber";
import getThisMonthDateRange from "@/utils/getThisMonthDateRange";
import { Badge, Center, HStack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const DetailOrder = (props: any) => {
  // Props
  const { order_detail } = props;

  // Hooks
  const { l } = useLang();
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`detail-order-${order_detail.id}`, open, onOpen, onClose);

  // Contexts
  const { themeConfig } = useThemeConfig();

  return (
    <>
      <BButton
        variant={"ghost"}
        colorPalette={themeConfig?.colorPalette}
        onClick={onOpen}
      >
        Detail
      </BButton>

      <DisclosureRoot open={open} lazyLoad size={"xs"}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent title={l.order_detail} />
          </DisclosureHeader>

          <DisclosureBody>
            <CContainer gap={4}>
              {order_detail?.detail?.map((item: any) => {
                const product =
                  item?.[
                    byServices[
                      order_detail?.service_type
                        ?.label as keyof typeof byServices
                    ].productName
                  ];

                return (
                  <CContainer gap={1}>
                    <P>{product?.name}</P>
                    <P>{`Rp ${formatNumber(item?.price)}`}</P>
                    <P>{`qty: ${item?.quantity}`}</P>
                  </CContainer>
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

const DataTable = (props: any) => {
  // Props
  const { data, limit, page, setLimit, setPage, totalData } = props;

  // Hooks
  const { l } = useLang();

  // States
  const ths = [
    {
      th: l.trx_ths[1],
      sortable: true,
    },
    {
      th: l.trx_ths[2],
      sortable: true,
    },
    {
      th: l.trx_ths[3],
      wrapperProps: {
        justify: "center",
      },
    },
    {
      th: l.trx_ths[4],
      sortable: true,
      wrapperProps: {
        justify: "end",
      },
    },
    {
      th: l.trx_ths[5],
      sortable: true,
    },
    {
      th: l.trx_ths[6],
      sortable: true,
    },
    {
      th: l.trx_ths[7],
      sortable: true,
      wrapperProps: {
        justify: "center",
      },
    },
  ];
  const tds = data.map((item: any) => ({
    id: item.id,
    item: item,
    columnsFormat: [
      {
        value: item.payment_detail?.payment_order_id,
        td: item.payment_detail?.payment_order_id,
      },
      {
        value: item.order_detail?.service_type?.label,
        td: item.order_detail?.service_type?.label,
      },
      {
        value: "Detail",
        wrapperProps: {
          justify: "center",
        },
        td: <DetailOrder order_detail={item.order_detail} />,
      },
      {
        value: item.productPrice,
        td: `Rp ${formatNumber(item.grand_total)}`,
        dataType: "number",
        wrapperProps: {
          justify: "end",
        },
      },
      {
        value: item.qty,
        td: formatDate(item?.transaction_date),
        dataType: "date",
      },
      {
        value: item.grandTotal,
        td: `Rp ${formatDate(item.settlement_date)}`,
        dataType: "date",
      },
      {
        value: item.transaction_status?.label,
        td: (
          <Badge
            colorPalette={
              item.transaction_status?.label === "Completed" ? "green" : "red"
            }
          >
            {item.transaction_status?.label}
          </Badge>
        ),
        wrapperProps: {
          justify: "center",
        },
      },
    ],
  }));

  return (
    <TableComponent
      originalData={data}
      ths={ths}
      tds={tds}
      limitControl={limit}
      setLimitControl={setLimit}
      pageControl={page}
      setPageControl={setPage}
      pagination={{
        meta: {
          last_page: totalData / limit,
        },
      }}
      overflowY={"auto"}
      maxH={"calc(100dvh - 216px)"}
    />
  );
};

const TransactionPage = () => {
  // States
  const [dateRange, setDateRange] = useState<Type__DateRange>(
    getThisMonthDateRange()
  );
  const {
    error,
    loading,
    data,
    pagination,
    makeRequest,
    limit,
    setLimit,
    page,
    setPage,
  } = useDataState<any>({
    url: "/api/piramid/admin/transaction/get-list",
    method: "GET",
    payload: {
      startDate: dateRange.from,
      endDate: dateRange.to,
    },
    dependencies: [dateRange],
  });

  return (
    <CContainer p={4} pt={0} align={"center"} flex={1} overflowY={"auto"}>
      {loading && <ComponentSpinner m={"auto"} />}

      {!loading && (
        <>
          {error && <FeedbackRetry onRetry={makeRequest} />}

          {!error && (
            <CContainer borderRadius={16} bg={"body"} pb={4} overflowY={"auto"}>
              <HStack
                p={4}
                borderBottom={"1px solid {colors.border.subtle}"}
                justify={"space-between"}
                overflowX={"auto"}
                flexShrink={0}
              >
                <HStack ml={"auto"}>
                  <DateRangePickerInput
                    w={"fit"}
                    onConfirm={(input) => {
                      setDateRange(input);
                    }}
                    inputValue={dateRange}
                    nonNullable
                  />
                </HStack>
              </HStack>

              {data && (
                <DataTable
                  data={data}
                  limit={limit}
                  page={page}
                  setLimit={setLimit}
                  setPage={setPage}
                  pagination={pagination}
                />
              )}

              {!data && (
                <Center flex={1} p={10}>
                  <FeedbackNoData />
                </Center>
              )}
            </CContainer>
          )}
        </>
      )}
    </CContainer>
  );
};

export default TransactionPage;
