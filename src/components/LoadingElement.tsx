import { Stack, Typography } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';

const LoadingElement = () => {
    return (
        <Stack direction="row" alignItems="center" gap={2} marginBottom={2}>
            <Typography sx={{ color: 'success.main', fontWeight: 'bold' }}>Loading data...</Typography>
            <CircularProgress color="success" size='1.25rem' />
        </Stack>
    )
}
export default LoadingElement