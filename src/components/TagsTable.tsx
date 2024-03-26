import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { indigo, grey } from '@mui/material/colors'

function createData(name: string, count: number) {
    return { name, count };
}

type Tag = {
    count: number,
    has_synonyms: boolean,
    is_moderator_only: boolean,
    is_required: boolean,
    name: string
}

type TagArray = Tag[]

type Props = {
    tags: TagArray
}

const StyledTableCell = styled(TableCell)({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: indigo[300],
        color: grey['A100'],
        fontWeight: 'bold'
    },
})

const StyledTableRow = styled(TableRow)({
    '&:nth-of-type(odd)': {
        backgroundColor: indigo[50]
    }
})

const TagsTable = ({ tags }: Props) => {

    const rows = tags.map((el: Tag) => createData(el.name, el.count))

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead >
                    <TableRow >
                        <StyledTableCell>Tag Name</StyledTableCell>
                        <StyledTableCell>Number of posts</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.count}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default TagsTable