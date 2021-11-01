import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import AutoComplete from '../lib/components/AutoComplete/autoComplete'

const SimpleComplete = () =>{
   const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
  'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
//    const lakersWithNumber = [
//     {value: 'bradley', number: 11},
//     {value: 'pope', number: 1},
//     {value: 'caruso', number: 4},
//     {value: 'cook', number: 2},
//     {value: 'cousins', number: 15},
//     {value: 'james', number: 23},
//     {value: 'AD', number: 3},
//     {value: 'green', number: 14},
//     {value: 'howard', number: 39},
//     {value: 'kuzma', number: 0},
//   ]
  const handleFetch = (query: string) => {
    return lakers.filter(name => name.includes(query))
  }
  const renderOption = (item:string) =>{
      return (
          <h2>Name:{item}</h2>
      )
  }
//   const handleFetch = (query: string) => {
//     return lakersWithNumber.filter(player => player.value.includes(query))
//   }
  return(
      <AutoComplete fetchSuggestion={handleFetch} onSelect={action('selected')} renderOptions={renderOption}>
      </AutoComplete>
  )
}

storiesOf('AutoComplete Component', module)
  .add('AutoComplete', SimpleComplete)