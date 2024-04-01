import { Box, Typography, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { indigo } from '@mui/material/colors'
import axios from 'axios'
import SetResultsElement from './components/SetResultsElement'
import TagsTable from './components/TagsTable'
import LoadingElement from './components/LoadingElement'
import ErrorElement from './components/ErrorElement'
import ResultsPagination from './components/ResultsPagination'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

function App() {
  const [totalPages, setTotalPages] = useState<number>()
  const [sort, setSort] = useState('popular')
  const [order, setOrder] = useState('desc')
  const [page, setPage] = useState(1)
  const [pagesize, setPagesize] = useState(10)

  const { data: tagsResults, isError: isTagsError, isFetching } = useQuery({
    queryKey: ['tags', page, pagesize, order, sort],
    queryFn: () => axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow&pagesize=${pagesize}&page=${page}&order=${order}&sort=${sort}&key=${import.meta.env.VITE_STACKEXCHANGE_API_KEY}`).then(res => res.data.items),
    placeholderData: keepPreviousData
  })

  const { data: totalResults, isSuccess: isTotalResultsSuccess, isError: isTotalResultsError } = useQuery({
    queryKey: ['total'],
    queryFn: () => axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow&filter=total&key=${import.meta.env.VITE_STACKEXCHANGE_API_KEY}`).then(res => res.data.total)
  })

  useEffect(() => {
    if (isTotalResultsSuccess) {
      setTotalPages(Math.ceil(totalResults / pagesize))
    }
  }, [isTotalResultsSuccess, totalResults, pagesize])

  return (
    <Box sx={{ p: { xs: 1, sm: 4 } }}>
      <Typography variant='h3' component='h1' sx={{ marginBottom: '1rem', fontWeight: 'bold', color: indigo[600] }}>
        Tags App
      </Typography>
      <Typography variant='subtitle2' sx={{ marginBottom: '.5rem' }}>Set number of results per page between 1 and 100.</Typography>
      <Stack direction='row' gap={6}>
        <SetResultsElement setPagesize={setPagesize} setPage={setPage} />
        {isFetching && <LoadingElement />}
      </Stack>
      <TagsTable tags={tagsResults || []} setOrder={setOrder} setSort={setSort} setPage={setPage} order={order} sort={sort} />
      {(!isFetching && (isTagsError || isTotalResultsError)) && <ErrorElement />}
      {isTotalResultsSuccess && <ResultsPagination totalPages={totalPages} setPage={setPage} page={page} />}

    </Box>
  )
}

export default App
