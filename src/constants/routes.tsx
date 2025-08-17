import DashboardPage from "@/pages/DashboardPage";
import MasterDataPage from "@/pages/MasterDataPage";
import RootPage from "@/pages/RootPage";
import SettingsPage from "@/pages/SettingsPage";
import DisplaySettingsPage from "@/pages/_settings/DisplaySettingsPage";
import PermissionsSettingsPage from "@/pages/_settings/PermissionsSettingsPage";
import PrivacyPolictPage from "@/pages/_settings/PrivacyPolictPage";
import RegionalSettingsPage from "@/pages/_settings/RegionalSettingsPage";
import ReportProblemPage from "@/pages/_settings/ReportProblemPage";
import TermsOfServicePage from "@/pages/_settings/TermsOfServicePage";
import ProfilePage from "../pages/ProfilePage";
import { Interface__PrivateRoute, Interface__Route } from "./interfaces";
import MasterDataPricingPage from "@/pages/_masterData/MasterDataPricingPage";
import MasterDataPromoPage from "@/pages/_masterData/MasterDataPromoPage";
import MasterDataCityCoveragePage from "@/pages/_masterData/MasterDataCityCoveragePage";

export const ROUTES: Interface__Route[] = [
  {
    path: "/",
    activePath: "/",
    element: <RootPage />,
  },
];

export const PRIVATE_ROUTES: Interface__PrivateRoute[] = [
  {
    path: "/dashboard",
    activePath: "/dashboard",
    titleKey: "navs.dashboard",
    element: <DashboardPage />,
  },

  // Master Data
  {
    path: "/master-data",
    activePath: "/master-data",
    titleKey: "navs.master_data",
    element: <MasterDataPage />,
  },

  // Settings
  {
    path: "/settings",
    activePath: "/settings",
    titleKey: "navs.settings",
    element: <SettingsPage />,
  },
  {
    path: "/settings/display",
    activePath: "/settings",
    titleKey: "settings_navs.display",
    backPath: "/settings",
    element: <DisplaySettingsPage />,
  },
  {
    path: "/settings/regional",
    activePath: "/settings",
    titleKey: "settings_navs.regional",
    backPath: "/settings",
    element: <RegionalSettingsPage />,
  },
  {
    path: "/settings/permissions",
    activePath: "/settings",
    titleKey: "settings_navs.permissions",
    backPath: "/settings",
    element: <PermissionsSettingsPage />,
  },
  {
    path: "/settings/report-problem",
    activePath: "/settings",
    titleKey: "settings_navs.report_problem",
    backPath: "/settings",
    element: <ReportProblemPage />,
  },
  {
    path: "/settings/terms-of-service",
    activePath: "/settings",
    titleKey: "settings_navs.terms_of_service",
    backPath: "/settings",
    element: <TermsOfServicePage />,
  },
  {
    path: "/settings/privacy-policy",
    activePath: "/settings",
    titleKey: "settings_navs.privacy_policy",
    backPath: "/settings",
    element: <PrivacyPolictPage />,
  },
  {
    path: "/profile",
    activePath: "/profile",
    titleKey: "navs.profile",
    element: <ProfilePage />,
  },
];

export const MASTER_DATA_ROUTES: Interface__PrivateRoute[] = [
  {
    path: "/master-data/pricing",
    activePath: "/master-data/pricing",
    backPath: "/master-data",
    titleKey: "master_data_navs.pricing",
    element: <MasterDataPricingPage />,
  },
  {
    path: "/master-data/promo",
    activePath: "/master-data/promo",
    backPath: "/master-data",
    titleKey: "master_data_navs.promo",
    element: <MasterDataPromoPage />,
  },
  {
    path: "/master-data/coverage-city",
    activePath: "/master-data/coverage-city",
    backPath: "/master-data",
    titleKey: "master_data_navs.coverage_city",
    element: <MasterDataCityCoveragePage />,
  },
  {
    path: "/master-data/coverage-province",
    activePath: "/master-data/coverage-province",
    backPath: "/master-data",
    titleKey: "master_data_navs.coverage_province",
    element: <MasterDataPage />,
  },
  {
    path: "/master-data/blog-category",
    activePath: "/master-data/blog-category",
    backPath: "/master-data",
    titleKey: "master_data_navs.blog_category",
    element: <MasterDataPage />,
  },
  {
    path: "/master-data/job-category",
    activePath: "/master-data/job-category",
    backPath: "/master-data",
    titleKey: "master_data_navs.job_category",
    element: <MasterDataPage />,
  },
  {
    path: "/master-data/employee-status",
    activePath: "/master-data/employee-status",
    backPath: "/master-data",
    titleKey: "master_data_navs.employee_status",
    element: <MasterDataPage />,
  },
  {
    path: "/master-data/job-location",
    activePath: "/master-data/job-location",
    backPath: "/master-data",
    titleKey: "master_data_navs.job_location",
    element: <MasterDataPage />,
  },
  {
    path: "/master-data/faqs",
    activePath: "/master-data/faqs",
    backPath: "/master-data",
    titleKey: "master_data_navs.faqs",
    element: <MasterDataPage />,
  },
];
