import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Location() {
  const [loc, setLoc] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [page, setPage] = useState(1);
  const maxPages = 7;

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/location?page=${page}`)
      .then(res => {
        console.log(res.data.results);
        setLoc(res.data.results);
        setFilteredLocations(res.data.results);
      })
      .catch(err => {
        console.log(`Error fetching: ${err}`);
      });
  }, [page]);

  useEffect(() => {
    const filtered = loc.filter(
      location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, [searchTerm, loc]);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= maxPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <h1>Location from All Episodes</h1>
      <input
        type="text"
        placeholder="Search by name or episode"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredLocations.map(location => (
            <tr key={location.id}>
              <td>{location.name}</td>
              <td>{location.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'> 
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous page
        </button>
        <span className='Page'>{page}</span>
        <button onClick={() => handlePageChange(page + 1)}disabled={page === maxPages}>
          Next page
        </button>
      </div>
    </div>
  );
}
