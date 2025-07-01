import Home from "@containers/Home/Home"
import BreedDetail from "../pages/BreedDetail/BreedDetail"
import Products from "../pages/Products/Products"
import About from "../pages/About/About"
import StylingDemo from "../pages/StylingDemo/StylingDemo"

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
        component: StylingDemo,
    },
]

export default routes
