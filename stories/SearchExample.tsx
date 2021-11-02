import React from "react";
import Search, { DataSourceType, SearchProps } from '../lib/components/Search/search'


const data = ['uzi', 'deft', 'clearlove', 'doinb', 'rookie', 'knight', 'xiye', 'faker', 'teddy'];
const myfilter = (query: string) => {
    return data.filter(name => name.includes(query)).map(v => ({ value: v }))
}
const SearchExample = () => {
    return <Search prepend='Search' fetchSuggestion={myfilter}
        onSelect={(item) => console.log(item)}
    ></Search>
}

export default SearchExample


const ToUseTemplete = () => {
	return (
		<Search
			renderOption={(item) => <h1>{item.value}</h1>}
			fetchSuggestion={myfilter}
            prepend='Search'
		></Search>
	);
};
export { ToUseTemplete };

const asyncfilter: (query: string) => Promise<DataSourceType[]> = (query: string) => {
	return new Promise((res) => {
		setTimeout(() => {
			res(data.filter((name) => name.includes(query)).map((v) => ({ value: v })));
		}, 1000);
	});
};

export const AsyncTest = () => {
	return <Search fetchSuggestion={asyncfilter}  prepend='Search'></Search>;
};