import { Grid, Paper } from '@mui/material'
import LoadingComponent from '../../app/layout/LoadingComponent'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import {
  setPageNumber,
  setProductParams,
} from './CatalogSlice'
import ProductList from './ProductList'
import ProductSearch from './ProductSearch'
import RadioButtonGroup from '../../app/components/RadioButtonGroup'
import CheckBoxGroup from '../../app/components/CheckBoxGroup'
import AppPagination from '../../app/components/AppPagination'
import useProducts from '../../app/hooks/useProducts'

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to low' },
  { value: 'price', label: 'Price - Low to high' },
]

export default function Catalog() {
  const { products, brands, types, filtersLoaded, metaData } = useProducts();
  const { productParams } = useAppSelector(
    (state) => state.catalog
  )
  const dispatch = useAppDispatch()

  if (!filtersLoaded)
    return <LoadingComponent message='Loading products...' />

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            options={sortOptions}
            onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
            selectedValue={productParams.orderBy}
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBoxGroup
            items={brands}
            onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
            checked={productParams.brands}
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBoxGroup
            items={types}
            onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
            checked={productParams.types}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} sx={{ mb: 2 }}>
        {metaData &&
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
          />}
      </Grid>
    </Grid>
  )
}
