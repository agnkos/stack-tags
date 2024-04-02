import { styled } from '@mui/material/styles'
import { tableCellClasses } from '@mui/material/TableCell'
import { Box, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Paper, TableCell } from '@mui/material'
import { indigo, grey } from '@mui/material/colors'
import SortResults from './SortResults'
import { Tag, TagArray } from '../types'

function createData(name: string, count: number) {
    return { name, count };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: indigo[300],
        color: grey['A100'],
        fontWeight: 'bold',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '8px',
        textAlign: 'center'
    }
}))

const StyledTableRow = styled(TableRow)({
    '&:nth-of-type(odd)': {
        backgroundColor: indigo[50]
    }
})

type Props = {
    tags: TagArray,
    order: string,
    sort: string,
    setOrder: (arg: string) => void,
    setSort: (arg: string) => void,
    setPage: (arg: number) => void
}

const TagsTable = ({ tags, setOrder, setSort, setPage, order, sort }: Props) => {

    const rows = tags.map((el: Tag) => createData(el.name, el.count))

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead >
                    <TableRow >
                        <StyledTableCell>
                            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between' alignItems='center'>
                                <Box>Tag Name</Box>
                                <SortResults sortBy='name' setOrder={setOrder} setSort={setSort} setPage={setPage} order={order} sort={sort} />
                            </Stack>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between' alignItems='center'>
                                <Box>Number of posts</Box>
                                <SortResults sortBy='popular' setOrder={setOrder} setSort={setSort} setPage={setPage} order={order} sort={sort} />
                            </Stack>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <TableCell sx={{ width: '50%' }}>{row.name}</TableCell>
                            <TableCell sx={{ width: '50%' }}>{row.count}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default TagsTable