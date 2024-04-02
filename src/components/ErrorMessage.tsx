import { Typography } from '@mui/material'

const ErrorMessage = () => {
    return (
        <Typography sx={{ color: 'error.main', fontWeight: 'bold', marginTop: '1rem' }}>Ups! There was an error while loading data...</Typography>
    )
}
export default ErrorMessage