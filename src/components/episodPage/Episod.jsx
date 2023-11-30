import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Episod.css"

export default function Episode() {
  const [episodes, setEpisodes] = useState([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const maxPages = 5; 

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`)
      .then(res => {
        console.log(res.data.results);
        setEpisodes(res.data.results);
        setFilteredEpisodes(res.data.results);
      })
      .catch(err => {
        console.log(`Error fetching: ${err}`);
      });
  }, [page]);


  useEffect(() => {
    const filtered = episodes.filter(
      episode =>
        episode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.episode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEpisodes(filtered);
  }, [searchTerm, episodes]);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= maxPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <h1>Episode Page</h1>
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
            <th>Episode</th>
            <th>Air Date</th>
            <th>Characters</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {filteredEpisodes.map(episode => (
            <tr key={episode.id}>
              <td>{episode.name}</td>
              <td>{episode.episode}</td>
              <td>{episode.air_date}</td>
              <td>{episode.characters.length}</td> 
              <td>{new Date(episode.created).toLocaleString()}</td> 
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'> 
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous page
        </button>
        <span className='Page'>{page}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === maxPages}>
          Next page
        </button>
      </div>
    </div>
  );
}
