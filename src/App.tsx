
import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { indigo } from '@mui/material/colors'
import axios from "axios"
import SetResultsElement from "./components/SetResultsElement"
import TagsTable from "./components/TagsTable"
import LoadingElement from './components/LoadingElement'
import ErrorElement from "./components/ErrorElement"
import ResultsPagination from "./components/ResultsPagination"

function App() {
  const [tags, setTags] = useState([])
  const [totalPages, setTotalPages] = useState<number>()
  const [sort, setSort] = useState('popular')
  const [order, setOrder] = useState('desc')
  const [page, setPage] = useState(1)
  const [pagesize, setPagesize] = useState(10)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
    setLoading(true)
    axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow&pagesize=${pagesize}&page=${page}&order=${order}&sort=${sort}&key=${import.meta.env.VITE_STACKEXCHANGE_API_KEY}`)
      .then(response => {
        setTags(response.data.items)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        setError(true)
      })
  }, [order, page, pagesize, sort])

  useEffect(() => {
    setError(false)
    setLoading(true)
    axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow&filter=total&key=${import.meta.env.VITE_STACKEXCHANGE_API_KEY}`)
      .then(response => {
        if (response.data.total !== undefined) setTotalPages(Math.ceil(response.data.total / pagesize))
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        setError(true)
      })
  }, [pagesize])

  useEffect(() => {
    console.log('tags', tags)
  }, [tags])

  return (
    <Box p={4}>
      <Typography variant="h3" component="h1" sx={{ marginBottom: "1rem", fontWeight: "bold", color: indigo[600] }}>
        Tags App
      </Typography>
      {loading && <LoadingElement />}
      <SetResultsElement setPagesize={setPagesize} />
      <TagsTable tags={tags} setOrder={setOrder} setSort={setSort} />
      {error && <ErrorElement />}
      <ResultsPagination totalPages={totalPages} setPage={setPage} />
    </Box>
  )
}

export default App
