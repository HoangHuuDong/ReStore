import { useEffect } from "react"
import { productSeletors, fetchProductsAsync, fetchFilters } from "../../features/catalog/CatalogSlice"
import { useAppSelector, useAppDispatch } from "../store/configureStore"

export default function useProducts() {
    const products = useAppSelector(productSeletors.selectAll)
    const { productsLoaded, filtersLoaded, brands, types, metaData } = useAppSelector(
        (state) => state.catalog
    )
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync())
    }, [dispatch, productsLoaded])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters())
    }, [dispatch, filtersLoaded])

    return {
        products,
        productsLoaded,
        filtersLoaded,
        brands,
        types,
        metaData
    }
}