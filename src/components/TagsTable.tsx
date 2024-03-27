import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Box, Stack, TablePagination, Table, TableBody, TableContainer, TableHead, TableRow, Paper, TableCell, Pagination, OutlinedInput, Typography, TextField, Button } from '@mui/material';
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
    tags: TagArray,
    setOrder: (arg: string) => void,
    setSort: (arg: string) => void,
    setPagesize: (arg: number) => void
}

const TagsTable = ({ tags, setOrder, setSort, setPagesize}: Props) => {
    
    const rows = tags.map((el: Tag) => createData(el.name, el.count))

    return (
        <>
            <Stack direction='row' alignItems='center' gap={2} sx={{ marginBottom: "1rem" }}>
                {/* <Typography>Results for page</Typography>
                <OutlinedInput type="number" /> */}
                <TextField type="number" id="outlined-number" label="Results for page" InputLabelProps={{
                    shrink: true,
                }}
                    InputProps={{
                        inputProps: {
                            min: 0
                        }
                    }}
                    sx={{ width: 200 }} defaultValue={10}
                    onChange={(event) => {
                        console.log(event.target.value)
                        if (typeof (event.target.value) === 'number' && event.target.value > 0) setPagesize(event.target.value)
                    }}
                />
                <Button>Set pages</Button>
            </Stack>
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
            <Pagination />
        </>
    )
}
export default TagsTable