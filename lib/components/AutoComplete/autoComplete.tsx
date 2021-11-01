import React,{FC,useState,ChangeEvent,ReactElement} from 'react'
import Input,{InputProps} from '../Input/input'

//自定义数据类型
interface DataSourceObject {
    value:string;
}
export type DataSourceType<T = {} > = T & DataSourceObject //合并用户输入的数据类型

export interface AutoCompleteProps extends Omit<InputProps,'onSelect'> {
    fetchSuggestion:(str:string) => DataSourceType[]; //用户可以自己定义，比如根据用户输入的值返回中返回符合的值
    onSelect?:(item:DataSourceType) => void,
    renderOptions?:(item:DataSourceType) => ReactElement //自定义展示模版
}

export const AutoComplete:FC<AutoCompleteProps> =(props) =>{
    const {fetchSuggestion,onSelect,value,renderOptions,...restProps} = props
    const [inputValue,setInputValue] = useState(value)//用户输入的值
    const [suggestions,setSuggestions] = useState<DataSourceType[]>([])//下拉菜单的内容
    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value.trim() //拿到用户输入的值
        setInputValue(value)
        if(value) {
            const results = fetchSuggestion(value)
            setSuggestions(results)
        }else{
            setSuggestions([])
        }
    }
    //自定义渲染模版
    const renderTemplate = (item:DataSourceType) =>{
        return renderOptions?renderOptions(item) :item.value
    }
    //点击下拉菜单，把内容填充到输入框，然后下拉菜单消失，触发props的onSelect方法
    const handleSelect = (item:DataSourceType) =>{
        setInputValue(item.value)
        setSuggestions([])
        if(onSelect){
            onSelect(item)
        }
    }
    //产生下拉菜单
    const generateDropDown = () =>{  
        return (
            <ul>
                {suggestions.map((item,index)=>{
                    //用户自定义的渲染模版
                    return (
                        <li key={index} onClick={()=>handleSelect(item)}>
                            {renderTemplate(item)} 
                        </li>
                    )
                })}
            </ul>
        )
    }
    return (
        <div className="rookie-auto-complete">
            <Input value={inputValue} {...restProps} onChange={handleChange}></Input>
            {suggestions.length >0 && generateDropDown()}
        </div>
    )
}

export default AutoComplete;