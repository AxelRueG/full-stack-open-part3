const Search = ({ search, handleFilter }) => {
	return (
		<div>
			filter shown with <input onChange={handleFilter} value={search} />
		</div>
	);
};

export default Search;
