import Home from "@containers/Home/Home"
import BreedDetail from "../pages/BreedDetail/BreedDetail"
import Products from "../pages/Products/Products"
import About from "../pages/About/About"
import StylingDemoPage from "../pages/StylingDemo/StylingDemo"

// Core Concepts Live Examples
import AppShellDemo from "../pages/Documentation/CoreConcepts/AppShellDemo/AppShellDemo"
import DataFetchingDemo from "../pages/Documentation/CoreConcepts/DataFetchingDemo/DataFetchingDemo"
import RoutingDemo from "../pages/Documentation/CoreConcepts/RoutingDemo/RoutingDemo"
import StateManagementDemo from "../pages/Documentation/CoreConcepts/StateManagementDemo/StateManagementDemo"
import FetchFunctionDemo from "../pages/Documentation/CoreConcepts/FetchFunctionDemo/FetchFunctionDemo"
import LifecycleDemo from "../pages/Documentation/CoreConcepts/LifecycleDemo/LifecycleDemo"

// Features Live Examples
import FeaturesStylingDemo from "../pages/Documentation/Features/FeaturesStylingDemo/FeaturesStylingDemo"
import CodeSplittingDemo from "../pages/Documentation/Features/CodeSplittingDemo/CodeSplittingDemo"
import MiddlewareDemo from "../pages/Documentation/Features/MiddlewareDemo/MiddlewareDemo"
import AssetsDemo from "../pages/Documentation/Features/AssetsDemo/AssetsDemo"
import DynamicMetadataDemo from "../pages/Documentation/Features/DynamicMetadataDemo/DynamicMetadataDemo"
import CustomDocumentDemo from "../pages/Documentation/Features/CustomDocumentDemo/CustomDocumentDemo"
import ModuleAliasesDemo from "../pages/Documentation/Features/ModuleAliasesDemo/ModuleAliasesDemo"
import CSRFDemo from "../pages/Documentation/Features/CSRFDemo/CSRFDemo"
import SuspenseDemo from "../pages/Documentation/Features/SuspenseDemo/SuspenseDemo"
import FontsDemo from "../pages/Documentation/Features/FontsDemo/FontsDemo"

const routes = [
    {
        path: "/",
        end: true,
        component: Home,
    },
    {
        path: "/breed/:breedId",
        component: BreedDetail,
    },
    {
        path: "/products",
        component: Products,
    },
    {
        path: "/about",
        component: About,
    },
    {
        path: "/styling",
        component: StylingDemoPage,
    },
    // Core Concepts Live Examples
    {
        path: "/docs/core-concepts/app-shell",
        component: AppShellDemo,
    },
    {
        path: "/docs/core-concepts/data-fetching",
        component: DataFetchingDemo,
    },
    {
        path: "/docs/core-concepts/routing",
        component: RoutingDemo,
    },
    {
        path: "/docs/core-concepts/state-management",
        component: StateManagementDemo,
    },
    {
        path: "/docs/core-concepts/fetch-function",
        component: FetchFunctionDemo,
    },
    {
        path: "/docs/core-concepts/lifecycle",
        component: LifecycleDemo,
    },
    // Features Live Examples
    {
        path: "/docs/features/styling",
        component: FeaturesStylingDemo,
    },
    {
        path: "/docs/features/code-splitting",
        component: CodeSplittingDemo,
    },
    {
        path: "/docs/features/middleware",
        component: MiddlewareDemo,
    },
    {
        path: "/docs/features/assets",
        component: AssetsDemo,
    },
    {
        path: "/docs/features/dynamic-metadata",
        component: DynamicMetadataDemo,
    },
    {
        path: "/docs/features/custom-document",
        component: CustomDocumentDemo,
    },
    {
        path: "/docs/features/module-aliases",
        component: ModuleAliasesDemo,
    },
    {
        path: "/docs/features/csrf",
        component: CSRFDemo,
    },
    {
        path: "/docs/features/suspense",
        component: SuspenseDemo,
    },
    {
        path: "/docs/features/fonts",
        component: FontsDemo,
    },
]

export default routes
