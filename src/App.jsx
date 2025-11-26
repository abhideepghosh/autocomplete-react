import { useState } from "react";
import './App.css';
const url = 'https://jsonplaceholder.typicode.com/posts';


function App() {
  const [search, setSearch] = useState('');
  const [autocomplete, setAutocomplete] = useState([]);


  const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    }
  }

  const fetchAndFilterData = async (searchTerm) => {
    const data = await getData();
    const filteredData = data.filter((item) => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setAutocomplete(filteredData);
  };

  const debouncedFetchAndFilter = debounce(fetchAndFilterData, 1000);


  const onSearch = (e) => {

    const value = e.target.value;
    setSearch(value);
    if (value !== '') debouncedFetchAndFilter(value);
    else setAutocomplete([]);
  };

  const handleListClick = (item) => {
    setSearch(item.title);
    setAutocomplete([]);
  };



  return (
    <div className="autocomplete-container">
      <h1 className="autocomplete-title">Autocomplete</h1>
      <input
        type="text"
        value={search}
        onChange={onSearch}
        className="autocomplete-input"
        placeholder="Search..."
      />

      {autocomplete.length > 0 && (
        <ul className="autocomplete-list">
          {autocomplete.map((item) => (
            <li
              key={item.id}
              onClick={() => handleListClick(item)}
              className="autocomplete-list-item"
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>

  )
}

export default App
