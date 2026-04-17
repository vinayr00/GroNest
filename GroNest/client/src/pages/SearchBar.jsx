import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if(search.trim() !== ""){
      navigate(`/products?search=${search}`);
    }
  };

  return (
    <div className="searchbar-container">

      <form className="searchbar" onSubmit={handleSearch}>

        <input
          type="text"
          placeholder="Search groceries, fruits, snacks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">🔍</button>

      </form>

    </div>
  );
}

export default SearchBar;