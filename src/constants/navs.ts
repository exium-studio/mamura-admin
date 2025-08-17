import {
  IconArticle,
  IconBriefcase,
  IconBuildings,
  IconCategory,
  IconChartArcs,
  IconContract,
  IconDeviceDesktop,
  IconHierarchy,
  IconLanguage,
  IconMap,
  IconMapPin,
  IconPercentage,
  IconQuestionMark,
  IconServerCog,
  IconShieldHalf,
  IconTag,
  IconWorld,
} from "@tabler/icons-react";

export const NAVS = [
  {
    labelKey: "navs.dashboard",
    path: "/dashboard",
    icon: IconChartArcs,
  },
  {
    labelKey: "navs.customer_inquiry",
    path: "/customer-inquiry",
    icon: IconContract,
  },
  {
    labelKey: "navs.cms",
    path: "/cms",
    icon: IconWorld,
  },
  {
    labelKey: "navs.blog",
    path: "/blog",
    icon: IconArticle,
  },
  {
    labelKey: "navs.job_application",
    path: "/job-application",
    icon: IconBriefcase,
  },
  {
    labelKey: "navs.master_data",
    path: "/master-data",
    icon: IconServerCog,
  },
];

export const MASTER_DATA_NAVS = [
  {
    groupLabelKey: "master_data_navs_group.internet",
    list: [
      {
        icon: IconTag,
        labelKey: "master_data_navs.pricing",
        path: "/master-data/pricing",
      },
      {
        icon: IconPercentage,
        labelKey: "master_data_navs.promo",
        path: "/master-data/promo",
      },
      {
        icon: IconBuildings,
        labelKey: "master_data_navs.coverage_city",
        path: "/master-data/coverage-city",
      },
      {
        icon: IconMapPin,
        labelKey: "master_data_navs.coverage_province",
        path: "/master-data/coverage-province",
      },
    ],
  },
  {
    groupLabelKey: "master_data_navs_group.blog",
    list: [
      {
        icon: IconCategory,
        labelKey: "master_data_navs.blog_category",
        path: "/master-data/blog-category",
      },
    ],
  },
  {
    groupLabelKey: "master_data_navs_group.career",
    list: [
      {
        icon: IconBriefcase,
        labelKey: "master_data_navs.job_category",
        path: "/master-data/job-category",
      },
      {
        icon: IconHierarchy,
        labelKey: "master_data_navs.employee_status",
        path: "/master-data/employee-status",
      },
      {
        icon: IconMap,
        labelKey: "master_data_navs.job_location",
        path: "/master-data/job-location",
      },
    ],
  },
  {
    groupLabelKey: "master_data_navs_group.others",
    list: [
      {
        icon: IconQuestionMark,
        labelKey: "master_data_navs.faqs",
        path: "/master-data/faqs",
      },
    ],
  },
];

export const SETTINGS_NAVS = [
  {
    groupLabelKey: "settings_navs_group.main",
    list: [
      {
        icon: IconDeviceDesktop,
        labelKey: "settings_navs.display",
        path: "/settings/display",
      },
      {
        icon: IconLanguage,
        labelKey: "settings_navs.regional",
        path: "/settings/regional",
      },
      {
        icon: IconShieldHalf,
        labelKey: "settings_navs.permissions",
        path: "/settings/permissions",
      },
    ],
  },
  // {
  //   groupLabelKey: "settings_navs_group.others",
  //   list: [
  //     {
  //       icon: IconExclamationCircle,
  //       labelKey: "settings_navs.report_problem",
  //       path: "/settings/report-problem",
  //     },
  //     {
  //       icon: IconGavel,
  //       labelKey: "settings_navs.terms_of_service",
  //       path: "/settings/terms-of-service",
  //     },
  //     {
  //       icon: IconShieldLock,
  //       labelKey: "settings_navs.privacy_policy",
  //       path: "/settings/privacy-policy",
  //     },
  //   ],
  // },
];
