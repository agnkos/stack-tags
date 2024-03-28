import { ChangeEvent } from 'react';
import { styled } from '@mui/material/styles';
import { Pagination } from '@mui/material';
import { indigo } from '@mui/material/colors';

const StyledPagination = styled(Pagination)({
    marginTop: "1rem",
    justifyContent: "center",
    display: 'flex',
    "& .MuiPaginationItem-root:hover": {
        backgroundColor: indigo[400],
    },
    "& .Mui-selected": {
        backgroundColor: indigo[200],
    },
    "& .Mui-selected:hover": {
        backgroundColor: indigo[400],
    }
})

type Props = {
    totalPages: number | undefined,
    setPage: (arg: number) => void
}

const ResultsPagination = ({ totalPages, setPage }: Props) => {

    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    return (
        <StyledPagination count={totalPages} sx={{ color: indigo[500] }} onChange={handlePageChange} />
    )
}
export default ResultsPagination