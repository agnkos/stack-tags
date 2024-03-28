import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Box, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Paper, TableCell } from '@mui/material';
import { indigo, grey } from '@mui/material/colors';
import SortElement from './SortElement';
import SetResultsElement from './SetResultsElement';
import ResultsPagination from './ResultsPagination';
import { Tag, TagArray } from '../types';

function createData(name: string, count: number) {
    return { name, count };
}

const StyledTableCell = styled(TableCell)({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: indigo[300],
        color: grey['A100'],
        fontWeight: 'bold',
    },
})

const StyledTableRow = styled(TableRow)({
    '&:nth-of-type(odd)': {
        backgroundColor: indigo[50]
    }
})

type Props = {
    tags: TagArray,
    totalPages: number | undefined,
    setOrder: (arg: string) => void,
    setSort: (arg: string) => void,
    setPagesize: (arg: number) => void,
    setPage: (arg: number) => void
}

const TagsTable = ({ tags, setOrder, setSort, setPagesize, totalPages, setPage }: Props) => {

    const rows = tags.map((el: Tag) => createData(el.name, el.count))

    return (
        <>
            <SetResultsElement setPagesize={setPagesize} />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead >
                        <TableRow >
                            <StyledTableCell >
                                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                    <Box>Tag Name</Box>
                                    <SortElement sortBy='name' setOrder={setOrder} setSort={setSort} />
                                </Stack>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                    <Box>Number of posts</Box>
                                    <SortElement sortBy='popular' setOrder={setOrder} setSort={setSort} />
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
            <ResultsPagination totalPages={totalPages} setPage={setPage} />
        </>
    )
}
export default TagsTable