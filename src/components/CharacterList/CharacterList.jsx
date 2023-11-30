import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CharacterList.css'; 


export default function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
                setCharacters(response.data.results);
                console.log(response.data.results);
               
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            }
        };
        fetchData();
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className='wrap'> 
                        <ul className='card-list'> 
                {characters.map((character) => (
                    <div key={character.id} className='card'> 
                        <img src={character.image} alt={character.id} />
                        <h2>{character.name}</h2>
                        {character.gender && <p>Gender: {character.gender}</p>}
                        {character.status && <p>Status: {character.status}</p>}
                    </div>
                ))}
            </ul>
            <div className='pagination'> 
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    Previous page
                </button>
                <span className='Page'>{page}</span>
                <button onClick={() => handlePageChange(page + 1)}>Next page</button>
            </div>
        </div>
    );
}
