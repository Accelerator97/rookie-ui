import React, { FC, useState, ChangeEvent, ReactElement, useEffect, KeyboardEvent,useRef } from 'react'
import Input, { InputProps } from '../Input/input'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import classNames from 'classnames'

//自定义数据类型
interface DataSourceObject {
    value: string;
}
//合并用户输入的数据类型
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    //用户可以自己定义，比如根据用户输入的值返回中返回符合的值  同步请求返回数组或者异步请求返回数组
    fetchSuggestion: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void, //选中之后执行的回调
    renderOption?: (item: DataSourceType) => ReactElement //自定义展示模版
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const { fetchSuggestion, onSelect, value, renderOption, ...restProps } = props
    const [inputValue, setInputValue] = useState(value as string)//用户输入的值
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])//下拉菜单的内容，为数组
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const debouncedValue = useDebounce(inputValue, 500) //函数防抖延迟更新
    //添加变量来控制是否触发搜索，避免按下键盘回车键又再一次发送搜索请求
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)

    useClickOutside(componentRef,()=>{
        setSuggestions([]) //点击组件外部就关闭下拉菜单
    })

    useEffect(() => { //只有debounceValue发生改变时才会调用函数
        if (debouncedValue && triggerSearch.current === true) {
            const results = fetchSuggestion(debouncedValue)
            if (results instanceof Promise) { //如果result是一个promise对象
                results.then(data => {
                    setSuggestions(data)
                })
            } else { //如果result不是promise对象，是一个数组
                setSuggestions(results)
            }
        } else {
            setSuggestions([])
        }
        setHighlightIndex(-1) //重置高亮部分
    }, [debouncedValue])

    const hightlight = (index: number) => {
        if (index < 0) index = 0
        if (index >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHighlightIndex(index)
    }
    //键盘事件
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13: //回车键
                if(suggestions[highlightIndex]){
                    handleSelect(suggestions[highlightIndex])
                }
                break
            case 38: //上箭头
                hightlight(highlightIndex - 1)
                break
            case 40: //下箭头
                hightlight(highlightIndex + 1)
                break
            case 27://Esc键
                setSuggestions([])
                break
            default:
                break
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim() //拿到用户输入的值，更新useState的inputValue
        setInputValue(value)
        triggerSearch.current = true
    }
    //自定义渲染模版
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }
    //点击下拉菜单，把内容填充到输入框，然后下拉菜单消失，触发props的onSelect方法
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }
    //产生下拉菜单
    const generateDropDown = () => {
        return (
            <ul>
                {suggestions.map((item, index) => {
                    //用户选择的部分添加高亮样式
                    const classes = classNames('suggestion-item', {
                        'item-highlighted': index === highlightIndex
                    })
                    //用户自定义的渲染模版
                    return (
                        <li key={index} className={classes} onClick={() => handleSelect(item)}>
                            {renderTemplate(item)}
                        </li>
                    )
                })}
            </ul>
        )
    }
    return (
        <div className="rookie-auto-complete" ref={componentRef}>
            <Input value={inputValue} {...restProps} onChange={handleChange} onKeyDown={handleKeyDown}></Input>
            {suggestions.length > 0 && generateDropDown()}
        </div>
    )
}

export default AutoComplete;