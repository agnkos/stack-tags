import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Box, Stack, TablePagination, Table, TableBody, TableContainer, TableHead, TableRow, Paper, TableCell } from '@mui/material';
import { indigo, grey } from '@mui/material/colors'
import { useEffect, useMemo, useState } from 'react';
import SortElement from './SortElement';
import { Tag, TagArray } from '../types'

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
    tags: TagArray
}

const TagsTable = ({ tags }: Props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('count');

    const rows = tags.map((el: Tag) => createData(el.name, el.count))

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedRows = useMemo(() => {
        const sortedArray = [...rows];

        if (orderBy === 'name') {
            sortedArray.sort((a, b) =>
                order === 'asc'
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name)
            );
        } else if (orderBy === 'count') {
            sortedArray.sort((a, b) =>
                order === 'asc'
                    ? a.count - b.count
                    : b.count - a.count
            );
        }

        return sortedArray;
    }, [orderBy, order, rows]);

    const visibleRows = useMemo(() => sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage,), [page, rowsPerPage, sortedRows])

    useEffect(() => {
        console.log('order', order)
        console.log('order by', orderBy)
    }, [order, orderBy])

    return (
        <TableContainer component={Paper}>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ backgroundColor: grey[100] }}
            />
            <Table>
                <TableHead >
                    <TableRow >
                        <StyledTableCell >
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Box>Tag Name</Box>
                                <SortElement orderBy='name' setOrderBy={setOrderBy} setOrder={setOrder} />
                            </Stack>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Box>Number of posts</Box>
                                <SortElement orderBy='count' setOrderBy={setOrderBy} setOrder={setOrder} />
                            </Stack>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visibleRows.map((row) => (
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