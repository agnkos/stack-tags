import { ChangeEvent } from 'react';
import { styled } from '@mui/material/styles';
import { Pagination } from '@mui/material';
import { indigo } from '@mui/material/colors';
import { useMediaQuery, useTheme } from '@mui/material';

const StyledPagination = styled(Pagination)(({ theme }) => ({
    marginTop: "1rem",
    justifyContent: "center",
    display: 'flex',
    [theme.breakpoints.down("sm")]: {
        padding: '5px'
    },
    "& .MuiPaginationItem-root:hover": {
        backgroundColor: indigo[400],
    },
    "& .Mui-selected, MuiPaginationItem-page": {
        backgroundColor: indigo[200],
    },
    "& .Mui-selected:hover": {
        backgroundColor: indigo[400],
    }
}))

type Props = {
    totalPages: number | undefined,
    setPage: (arg: number) => void,
    page: number
}

const ResultsPagination = ({ totalPages, setPage, page }: Props) => {
    const theme = useTheme()
    const xs = useMediaQuery(theme.breakpoints.down('sm'))
    const boundaryCount = xs ? 1 : 2
    const siblingCount = xs ? 0 : 1
    const size = xs ? 'small' : 'medium'

    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    return (
        <StyledPagination count={totalPages} sx={{ color: indigo[500] }} onChange={handlePageChange} page={page} boundaryCount={boundaryCount} siblingCount={siblingCount} size={size} />
    )
}
export default ResultsPagination