import { Box, Typography, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { indigo } from '@mui/material/colors'
import axios from "axios"
import SetResultsElement from "./components/SetResultsElement"
import TagsTable from "./components/TagsTable"
import LoadingElement from './components/LoadingElement'
import ErrorElement from "./components/ErrorElement"
import ResultsPagination from "./components/ResultsPagination"
import { useQuery, keepPreviousData } from '@tanstack/react-query'
// import { getTags } from './requests'

function App() {
  const [totalPages, setTotalPages] = useState<number>()
  const [sort, setSort] = useState('popular')
  const [order, setOrder] = useState('desc')
  const [page, setPage] = useState(1)
  const [pagesize, setPagesize] = useState(10)

  const { data: tagsResults, isPending, error: tagsError, refetch: refetchTags, isLoading } = useQuery({
    queryKey: ['tags', page, pagesize, order, sort],
    queryFn: () => axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow&pagesize=${pagesize}&page=${page}&order=${order}&sort=${sort}&key=${import.meta.env.VITE_STACKEXCHANGE_API_KEY}`).then(res => {
      console.log('response query tags', res)
      return res.data.items
    }),
    placeholderData: keepPreviousData
  })

  console.log('tag results', tagsResults)

  const { data: totalResults, isSuccess: isTotalResultsSuccess, error: totalResultsError } = useQuery({
    queryKey: ['total'],
    queryFn: () => axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow&filter=total&key=${import.meta.env.VITE_STACKEXCHANGE_API_KEY}`).then(res => {
      console.log('response total', res)
      return res.data.total
    })
  })
  console.log('total', totalResults)

  useEffect(() => {
    if (isTotalResultsSuccess) {
      setTotalPages(Math.ceil(totalResults / pagesize))
    }
  }, [isTotalResultsSuccess, totalResults, pagesize])

  // refetchTags - old data is displayed in the table until new data is succesfully fetched (table does not disappear, which takes place when dependencies are added to queryKey)
  // useEffect(() => {
  //   refetchTags()
  // }, [page, pagesize, order, sort])

  return (
    <Box sx={{ p: { xs: 1, sm: 4 } }}>
      <Typography variant="h3" component="h1" sx={{ marginBottom: "1rem", fontWeight: "bold", color: indigo[600] }}>
        Tags App
      </Typography>
      <Typography variant="subtitle2" sx={{ marginBottom: ".5rem" }}>Set number of results per page between 1 and 100.</Typography>
      <Stack direction="row" gap={6}>
        <SetResultsElement setPagesize={setPagesize} setPage={setPage} />
        {isPending && <LoadingElement />}
      </Stack>
      {/* {isSuccess &&
        <TagsTable tags={tagsResults} setOrder={setOrder} setSort={setSort} setPage={setPage} order={order} sort={sort} />
      } */}
      <TagsTable tags={tagsResults || []} setOrder={setOrder} setSort={setSort} setPage={setPage} order={order} sort={sort} />
      {(tagsError || totalResultsError) && <ErrorElement />}
      {isTotalResultsSuccess && <ResultsPagination totalPages={totalPages} setPage={setPage} page={page} />}
    </Box>
  )
}

export default App
