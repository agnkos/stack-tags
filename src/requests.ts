import axios from 'axios';

export const getTags = async (pagesize: number, page: number, order: string, sort: string) => {
    const response = await axios.get(`https://api.stackexchange.com/2.3/tags?site=stackoverflow&pagesize=${pagesize}&page=${page}&order=${order}&sort=${sort}&key=${import.meta.env.VITE_STACKEXCHANGE_API_KEY}`)
    return response.data
}
