import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Box, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Paper, TableCell, Pagination, Typography, TextField, Button } from '@mui/material';
import { outlinedInputClasses, inputLabelClasses } from '@mui/material';
import { indigo, grey } from '@mui/material/colors';
import { useEffect, useState, ChangeEvent  } from 'react';
import SortElement from './SortElement';
import { Tag, TagArray } from '../types';

function createData(name: string, count: number) {
    return { name, count };
}

const StyledButton = styled(Button)({
    backgroundColor: indigo[300],
    "&:hover": { backgroundColor: indigo[500] }
})

const StyledTextField = styled(TextField)({
    [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: indigo[300]
    },
    [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: indigo[500]
    },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: indigo[500]
    },
    [`& .${inputLabelClasses.outlined}`]: {
        color: indigo[300]
    },
    [`&:hover .${inputLabelClasses.outlined}`]: {
        color: indigo[500]
    },
    [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
        color: indigo[500]
    }
})

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

const StyledPagination = styled(Pagination)({
    marginTop: "1rem",
    justifyContent: "center",
    display: 'flex',
    "& .MuiPaginationItem-root:hover": {
        backgroundColor: indigo[400],
    },
    "& .Mui-selected": {
        backgroundColor: indigo[200],
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
    const [resultsNumber, setResultsNumber] = useState(10)
    const [inputError, setInputError] = useState('')

    const rows = tags.map((el: Tag) => createData(el.name, el.count))

    const handleSetPagesize = () => {
        setInputError('')
        if (resultsNumber > 0) setPagesize(resultsNumber)
        else setInputError('Results number must be greater than 0')
    }

    useEffect(() => {
        console.log('results number', resultsNumber)
    }, [resultsNumber])

    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    return (
        <>
            <Stack sx={{ marginBottom: "1rem" }}>
                <Stack direction='row' alignItems='center' gap={2} sx={{ marginBottom: ".25rem" }}>
                    <StyledTextField type="number" id="outlined-number" label="Results per page" size="small" InputLabelProps={{
                        shrink: true,
                    }}
                        InputProps={{
                            inputProps: {
                                min: 1
                            }
                        }}
                        sx={{ width: 200, fieldset: { borderColor: indigo[400] } }} defaultValue={10}
                        onChange={(event) => {
                            console.log(event.target.value)
                            console.log('number?', typeof (event.target.value))
                            setResultsNumber(Number(event.target.value))
                        }}
                    />
                    <StyledButton variant="contained" onClick={handleSetPagesize}>Set pages</StyledButton>
                </Stack>
                {<Typography sx={{ color: 'error.main' }}>{inputError}</Typography>}
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
            <StyledPagination count={totalPages} sx={{ color: indigo[500] }} onChange={handlePageChange} />
        </>
    )
}
export default TagsTable