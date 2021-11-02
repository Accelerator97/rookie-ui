import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Search,{DataSourceType} from '../lib/components/Search/search'

interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}
const SimpleSearch = () =>{
    // const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
  // 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
  // const lakersWithNumber = [
  //   {value: 'bradley', number: 11},
  //   {value: 'pope', number: 1},
  //   {value: 'caruso', number: 4},
  //   {value: 'cook', number: 2},
  //   {value: 'cousins', number: 15},
  //   {value: 'james', number: 23},
  //   {value: 'AD', number: 3},
  //   {value: 'green', number: 14},
  //   {value: 'howard', number: 39},
  //   {value: 'kuzma', number: 0},
  // ]
  // const handleFetch = (query: string) => {
  //   return lakers.filter(name => name.includes(query)).map(name => ({value: name}))
  // }
  // const handleFetch = (query: string) => {
  //   return lakersWithNumber.filter(player => player.value.includes(query))
  // }
  const renderOption = (item:DataSourceType) =>{
    const itemWithGithub = item as DataSourceType<GithubUserProps>
      return (
          <>
          <h2>Name:{itemWithGithub.value}</h2>
          <p>Url:{itemWithGithub.url}</p>
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
  return(
      <Search fetchSuggestion={handleFetch} onSelect={action('selected')} renderOption={renderOption}>
      </Search>
  )
}

storiesOf('Search Component', module)
  .add('Search', SimpleSearch)