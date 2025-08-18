export const OPTIONS_RELIGION = [
  { id: 1, label: "Islam" },
  { id: 2, label: "Kristen" },
  { id: 3, label: "Katolik" },
  { id: 4, label: "Budha" },
  { id: 5, label: "Hindu" },
  { id: 6, label: "Konghucu" },
];

export const OPTIONS_GENDER = [
  { id: 1, label: "Male" },
  { id: 2, label: "Female" },
];

export const OPTIONS_DASHBOARD_PERIOD = [
  {
    id: "today",
    labelKey: "today",
    lastCount: "yesterday_count",
    percentageComparison: "percentage_compare_yesterday",
  },
  {
    id: "this_week",
    labelKey: "this_week",
    lastCount: "last_week_count",
    percentageComparison: "percentage_compare_last_week",
  },
  {
    id: "this_month",
    labelKey: "this_month",
    lastCount: "last_month_count",
    percentageComparison: "percentage_compare_last_month",
  },
  {
    id: "this_year",
    labelKey: "this_year",
    lastCount: "last_year_count",
    percentageComparison: "percentage_compare_last_year",
  },
];
