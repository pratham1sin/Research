import React, { useState } from "react";
import axios from "axios";

const ResearchTab = ({ handleCitation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = () => {
    axios
      .post("https://api.gyanibooks.com/search_publication/", {
        keyword: searchTerm,
        limit: 10,
      })
      .then((response) => {
        setSearchResults(response.data.data);
        setError("");
      })
      .catch((error) => {
        if (error.response && error.response.status === 429) {
          setTimeout(handleSearch, 5000); // Retry after 5 seconds
        } else {
          setSearchResults([]); // Reset search results
          setError("An error occurred while fetching search results.");
          console.error(error);
        }
      });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search for academic or non-academic material..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-96 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none"
          onClick={handleCitation}
        >
          Generate Citation
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {searchResults && searchResults.length > 0 && (
        <div className="max-w-xl">
          <h2 className="text-lg font-semibold mb-2 ">Search Results</h2>

          {searchResults.map((result) => (
            <div
              key={result.paperId}
              className="bg-gray-100 rounded-md p-4 mb-4"
            >
              <a href={result.url} className="text-blue-500 hover:underline">
                {result.title}
              </a>
              <p className="text-gray-600 mb-2">{result.abstract}</p>
              <p className="text-gray-500">
                Authors:{" "}
                {result.authors
                  ? result.authors.map((author) => author.name).join(", ")
                  : "N/A"}
              </p>
              <p className="text-gray-500">
                Citation Count: {result.citationCount}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResearchTab;
