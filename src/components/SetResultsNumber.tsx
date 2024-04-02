import { useState } from 'react'
import { Stack, outlinedInputClasses, inputLabelClasses, TextField, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { indigo } from '@mui/material/colors'

const StyledTextField = styled(TextField)((props) => ({
    width: '120px',
    [props.theme.breakpoints.up('sm')]: {
        width: '200px'
    },
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
}))

const StyledButton = styled(Button)({
    backgroundColor: indigo[300],
    '&:hover': { backgroundColor: indigo[500] }
})

type Props = {
    setPagesize: (arg: number) => void,
    setPage: (arg: number) => void
}

const SetResultsNumber = ({ setPagesize, setPage }: Props) => {
    const [resultsNumber, setResultsNumber] = useState(10)
    const [inputError, setInputError] = useState('')

    const handleSetPagesize = () => {
        setInputError('')
        if (resultsNumber > 0 && resultsNumber < 101) {
            setPagesize(resultsNumber)
            setPage(1)
        }
        else if (resultsNumber < 0) setInputError('Results number must be greater than 0')
        else setInputError('Results number must not be greater than 100')
    }

    return (
        <Stack sx={{ marginBottom: '1rem' }}>
            <Stack direction='row' alignItems='center' gap={2} sx={{ marginBottom: '.25rem' }}>
                <StyledTextField
                    type='number'
                    id='outlined-number'
                    label='Results per page'
                    size='small'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        inputProps: {
                            min: 1
                        }
                    }}
                    defaultValue={10}
                    onChange={(event) => {
                        setResultsNumber(Number(event.target.value))
                    }}
                />
                <StyledButton variant='contained' onClick={handleSetPagesize}>Set results</StyledButton>
            </Stack>
            {<Typography sx={{ color: 'error.main' }}>{inputError}</Typography>}
        </Stack>
    )
}
export default SetResultsNumber