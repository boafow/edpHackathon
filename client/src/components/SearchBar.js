//create a simple searchbar component using only jsx
import React from 'react';

const SearchBar = () => {

    return (
        <div>
            <form>
                <input type="text" />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchBar;