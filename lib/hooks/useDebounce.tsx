import {useState,useEffect} from 'react'


function useDebounce(value:any,delay = 300){
    const [debounceValue,setdebounceValue] = useState(value)
    useEffect(()=>{
        const handler = window.setTimeout(()=>{
            setdebounceValue(value)
        },delay)
        return () =>{ //return的结果会在下次调用useEffect的时候执行
            clearTimeout(handler)
        }
    },[value,delay])
    return debounceValue
}

export default useDebounce