import { Box, Typography, Pagination } from "@mui/material"
import { MetaData } from "../models/pagination"
import { useState } from "react";

interface Props {
    metaData: MetaData
    onPageChange: (page: number) => void
}

export default function AppPagination({ metaData, onPageChange }: Props) {
    const { CurrentPage, TotalCount, TotalPages, PageSize } = metaData;
    const [pageNumber, setPageNumber] = useState(CurrentPage)

    function handlePageChange(page: number) {
        setPageNumber(page)
        onPageChange(page)
    }

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
                Displaying {(CurrentPage - 1) * PageSize + 1} - {CurrentPage * PageSize > TotalCount ? TotalCount : CurrentPage * PageSize} of {TotalCount} items
            </Typography>
            <Pagination
                color='secondary'
                size='large'
                count={TotalPages}
                page={pageNumber}
                onChange={(_e, page) => handlePageChange(page)}
            />
        </Box>
    )
}