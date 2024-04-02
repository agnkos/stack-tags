import { Box } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { indigo } from '@mui/material/colors'

type Props = {
    sortBy: string,
    order: string,
    sort: string,
    setSort: (arg: string) => void,
    setOrder: (arg: string) => void,
    setPage: (arg: number) => void
}

const SortResults = ({ sortBy, setSort, setOrder, setPage, order, sort }: Props) => {

    const sortData = (sortBy: string, order: string) => {
        setOrder(order)
        setSort(sortBy)
        setPage(1)
    }

    return (
        <Box >
            <ArrowDownwardIcon sx={{ cursor: 'pointer', color: `${sortBy === sort && order === 'desc' ? indigo[500] : ''}`, '&:hover': { color: indigo[900] }, transition: 'color 300ms' }} onClick={() => sortData(sortBy, 'desc')} />
            <ArrowUpwardIcon sx={{ cursor: 'pointer', color: `${sortBy === sort && order === 'asc' ? indigo[500] : ''}`, '&:hover': { color: indigo[900] }, transition: 'color 300ms' }} onClick={() => sortData(sortBy, 'asc')} />
        </Box>
    )
}
export default SortResults