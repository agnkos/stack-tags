
import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { indigo } from '@mui/material/colors'
import axios from "axios"
import TagsTable from "./components/TagsTable"
import LoadingElement from './components/LoadingElement'
import ErrorElement from "./components/ErrorElement"

function App() {

  const [tags, setTags] = useState([])
  const [sort, setSort] = useState('popular')
  const [order, setOrder] = useState('desc')
  const [page, setPage] = useState(1)
  const [pagesize, setPagesize] = useState(20)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
    setLoading(true)
    axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow&pagesize=${pagesize}&page=${page}&order=${order}&sort=${sort}&key=${import.meta.env.VITE_STACKEXCHANGE_API_KEY}`)
      .then(response => {
        console.log(response.data)
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
    console.log('tags', tags)
    console.log('pagesize', pagesize)
  }, [tags, pagesize])

  return (
    <Box p={4}>
      <Typography variant="h3" component="h1" sx={{ marginBottom: "1rem", fontWeight: "bold", color: indigo[600] }}>
        Tags App
      </Typography>
      {loading && <LoadingElement />}
      <TagsTable tags={tags} setOrder={setOrder} setSort={setSort} setPagesize={setPagesize} />
      {error && <ErrorElement />}
    </Box>
  )
}

export default App
