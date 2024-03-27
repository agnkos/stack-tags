
import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { indigo } from '@mui/material/colors'
import axios from "axios"
import TagsTable from "./components/TagsTable"

function App() {

  const [tags, setTags] = useState([])

  useEffect(() => {
    axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow&pagesize=100&key=${import.meta.env.VITE_STACKEXCHANGE_API_KEY}`)
      .then(response => {
        console.log(response.data)
        setTags(response.data.items)
      })
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    console.log('tags', tags)
  }, [tags])

  return (
    <Box p={4}>
      <Typography variant="h3" component="h1" sx={{ marginBottom: "1rem", fontWeight: "bold", color: indigo[600] }}>
        Tags App
      </Typography>
      <TagsTable tags={tags} />
    </Box>
  )
}

export default App

// &filter=total