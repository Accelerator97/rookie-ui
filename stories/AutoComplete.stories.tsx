import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import AutoComplete,{DataSourceType} from '../lib/components/AutoComplete/autoComplete'

interface LakerPlayerProps {
    value: string;
    number: number;
}
interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}
const SimpleComplete = () =>{
//    const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
//   'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
   const lakersWithNumber = [
    {value: 'bradley', number: 11},
    {value: 'pope', number: 1},
    {value: 'caruso', number: 4},
    {value: 'cook', number: 2},
    {value: 'cousins', number: 15},
    {value: 'james', number: 23},
    {value: 'AD', number: 3},
    {value: 'green', number: 14},
    {value: 'howard', number: 39},
    {value: 'kuzma', number: 0},
  ]
//   const handleFetch = (query: string) => {
//     return lakersWithNumber.filter(player => player.value.includes(query)).map(name => ({value: name}))
//   }
  const renderOption = (item:DataSourceType<GithubUserProps>) =>{
      return (
          <>
          <h2>Name:{item.value}</h2>
          <p>Number:{item.url}</p>
          </>
      )
  }
const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => { //拿到json里面的items
        console.log(items)
        //返回的值加上value属性，value = item.login
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
      })
  }
//   const handleFetch = (query: string) => {
//     return lakersWithNumber.filter(player => player.value.includes(query))
//   }
  return(
      <AutoComplete fetchSuggestion={handleFetch} onSelect={action('selected')} renderOption={renderOption}>
      </AutoComplete>
  )
}

storiesOf('AutoComplete Component', module)
  .add('AutoComplete', SimpleComplete)