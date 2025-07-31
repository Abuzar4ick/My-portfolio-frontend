import { useState } from 'react'
import axios from 'axios'

const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const request = async ({ url, method = 'GET', body = null, headers = {} }) => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios({
        method,
        url,
        data: body,
        headers,
      })
      setData(response.data)
      return response.data
    } catch (err) {
      setError(err.response?.data || { message: err.message })
      console.log('API ERROR:', err.response?.data || err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { request, loading, error, data }
}

export default useApi