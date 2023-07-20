import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home";
import Catalog from "../../features/catalog/Catalog";
import ContactPage from "../../features/contact";
import AboutPage from "../../features/about";
import ProductDetails from "../../features/catalog/ProductDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage/>},
            {path: 'catalog', element: <Catalog/>},
            {path: 'catalog/:id', element: <ProductDetails/>},
            {path: 'about', element: <AboutPage/>},
            {path: 'contact', element: <ContactPage/>},
        ]
    }
])