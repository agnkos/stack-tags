import { Box } from "@mui/material"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { indigo } from '@mui/material/colors'
import { useEffect } from "react";

type Props = {
    sortBy: string,
    setSort: (arg: string) => void,
    setOrder: (arg: string) => void
}

const SortElement = ({ sortBy, setSort, setOrder }: Props) => {

    const sortData = (sortBy: string, order: string) => {
        setOrder(order)
        setSort(sortBy)
    }

    useEffect(() => {
        console.log('sort by', sortBy)
    }, [sortBy])

    return (
        <Box >
            <ArrowDownwardIcon sx={{ cursor: 'pointer', '&:hover': { color: indigo[900] }, transition: 'color 300ms' }} onClick={() => sortData(sortBy, 'desc')} />
            <ArrowUpwardIcon sx={{ cursor: 'pointer', '&:hover': { color: indigo[900] }, transition: 'color 300ms' }} onClick={() => sortData(sortBy, 'asc')} />
        </Box>
    )
}
export default SortElement