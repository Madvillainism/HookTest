import axios from 'axios'
import {useState, useEffect} from 'react'

function useFetch(url) {

    //contenedores de datos, loading y errores
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true);
    axios.get(url).then((res) => {
        setData(res.data)
    }).catch((err) => {
        setError(err)
    }).finally(() =>{
        setLoading(false)
    })
  }, [url])

  const reFetch = () => {
    setLoading(true);
    axios.get(url).then((res) => {
        setData(res.data)
    }).catch((err) => {
        setError(err)
    }).finally(() =>{
        setLoading(false)
    })
  }
  
  return {data, loading, error, reFetch}
    
}

export default useFetch