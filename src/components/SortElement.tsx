import { Box } from "@mui/material"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { indigo } from '@mui/material/colors'

type Props = {
    orderBy: string,
    setOrderBy: (arg: string) => void,
    setOrder: (arg: string) => void
}

const SortElement = ({ orderBy, setOrderBy, setOrder }: Props) => {

    const sortData = (orderBy: string, order: string) => {
        setOrderBy(orderBy)
        setOrder(order)
    }

    return (
        <Box >
            <ArrowDownwardIcon sx={{ cursor: 'pointer', '&:hover': { color: indigo[900] }, transition: 'color 300ms' }} onClick={() => sortData(orderBy, 'desc')} />
            <ArrowUpwardIcon sx={{ cursor: 'pointer', '&:hover': { color: indigo[900] }, transition: 'color 300ms' }} onClick={() => sortData(orderBy, 'asc')} />
        </Box>
    )
}
export default SortElement