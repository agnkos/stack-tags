import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { indigo } from '@mui/material/colors'
import axios from "axios"
import SetResultsElement from "./components/SetResultsElement"
import TagsTable from "./components/TagsTable"
import LoadingElement from './components/LoadingElement'
import ErrorElement from "./components/ErrorElement"
import ResultsPagination from "./components/ResultsPagination"
import { useQuery } from '@tanstack/react-query'
// import { getTags } from './requests'

function App() {
  const [tags, setTags] = useState([])
  const [totalPages, setTotalPages] = useState<number>()
  const [totalPages2, setTotalPages2] = useState<number>()
  const [sort, setSort] = useState('popular')
  const [order, setOrder] = useState('desc')
  const [page, setPage] = useState(1)
  const [pagesize, setPagesize] = useState(10)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // const tags = useQuery({
  //   queryKey: ['tags', pagesize, page, order, sort],
  //   queryFn: async () => {
  //     const { data } = await axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow&pagesize=${pagesize}&page=${page}&order=${order}&sort=${sort}&key=${import.meta.env.VITE_STACKEXCHANGE_API_KEY}`)
  //     console.log('axios data', data)
  //     return data.items
  //   },

  // })

  // const tagsData = useQuery({
  //   queryKey: ['tags', page, pagesize, order, sort],
  //   queryFn: async () => {
  //     const response = await axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow&pagesize=${pagesize}&page=${page}&order=${order}&sort=${sort}&key=${import.meta.env.VITE_STACKEXCHANGE_API_KEY}`);
  //     console.log('response tags', response)
  //     const dataAxios = response.data
  //     console.log('data', dataAxios)
  //     return response.data.items;
  //   }
  // });
  // const { data: tagsData } = useQuery({
  //   queryKey: ['tags', page, pagesize, order, sort],
  //   queryFn: () => getTags(pagesize, page, order, sort)
  // });

  // console.log('tags data', tagsData.data)

  useEffect(() => {
    console.log('page', page)
  }, [page])

  // useEffect(() => {
  //   // Re-fetch the data when the page changes
  //   // if (tagsResults) {
  //     tags.refetch();
  //   // }
  // }, [page]);

  // console.log('status', tagsData.fetchStatus)

  const { data: tagsResults, isPending, isError } = useQuery({
    queryKey: ['tags', page, pagesize, order, sort],
    queryFn: () => axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow&pagesize=${pagesize}&page=${page}&order=${order}&sort=${sort}&key=${import.meta.env.VITE_STACKEXCHANGE_API_KEY}`).then(res => {
      console.log('response query tags', res)
      return res.data.items
    })
  })

  console.log('tag results', tagsResults)

  const { data: totalResults, isSuccess: isTotalResultsSuccess } = useQuery({
    queryKey: ['total'],
    queryFn: () => axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow&filter=total&key=${import.meta.env.VITE_STACKEXCHANGE_API_KEY}`).then(res => {
      console.log('response total', res)
      return res.data.total
    })
  })
  console.log('total', totalResults)

  useEffect(() => {
    if (isTotalResultsSuccess) {
      setTotalPages2(Math.ceil(totalResults / pagesize))
    }
    console.log('total pages 2', totalPages2)
  }, [isTotalResultsSuccess, totalResults, pagesize, totalPages2])


  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  // console.log('query tags', tags.data)
  // console.log('error', tagsError)

  // const totalPages = Math.ceil(totalResults / pagesize)
  // if (isTotalResultsSuccess) setTotalPages(Math.ceil(totalResults / pagesize))

  // useEffect(() => {
  //   setError(false)
  //   setLoading(true)
  //   axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow&pagesize=${pagesize}&page=${page}&order=${order}&sort=${sort}&key=${import.meta.env.VITE_STACKEXCHANGE_API_KEY}`)
  //     .then(response => {
  //       // console.log('response', response.data)
  //       setTags(response.data.items)
  //       setLoading(false)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       setLoading(false)
  //       setError(true)
  //     })
  // }, [order, page, pagesize, sort])

  // useEffect(() => {
  //   setError(false)
  //   setLoading(true)
  //   axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow&filter=total&key=${import.meta.env.VITE_STACKEXCHANGE_API_KEY}`)
  //     .then(response => {
  //       if (response.data.total !== undefined) setTotalPages(Math.ceil(response.data.total / pagesize))
  //       setLoading(false)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       setLoading(false)
  //       setError(true)
  //     })
  // }, [pagesize])

  // useEffect(() => {
  //   console.log('tags', tags)
  // }, [tags])

  return (
    <Box sx={{ p: { xs: 1, sm: 4 } }}>
      <Typography variant="h3" component="h1" sx={{ marginBottom: "1rem", fontWeight: "bold", color: indigo[600] }}>
        Tags App
      </Typography>
      {loading && <LoadingElement />}
      {isPending && <LoadingElement />}
      <Typography variant="subtitle2" sx={{ marginBottom: ".5rem" }}>Set number of results per page between 1 and 100.</Typography>
      <SetResultsElement setPagesize={setPagesize} setPage={setPage} />
      <TagsTable tags={tagsResults} setOrder={setOrder} setSort={setSort} setPage={setPage} order={order} sort={sort} />
      {error && <ErrorElement />}
      {/* {!error && <ResultsPagination totalPages={totalPages} setPage={setPage} page={page} />} */}
      <ResultsPagination totalPages={totalPages2} setPage={setPage} page={page} />
    </Box>
  )
}

export default App
