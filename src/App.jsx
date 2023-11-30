import React, { useState } from 'react';
import './App.css';
import CharacterList from './components/CharacterList/CharacterList';
import HomePage from './components/HomePage/HomePage'
import Episod from './components/episodPage/Episod';
import Location from './components/Location/Location';
import WatchList from './components/WatchList/WatchList';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className='realHome'>
      <div className="top">
       <HomePage/>
        <div className="menuButtons">
          <button onClick={() => handleButtonClick('characters')}>Characters List</button>
          <button onClick={() => handleButtonClick('episodes')}>Episodes List</button>
          <button onClick={() => handleButtonClick('locations')}>Locations List</button>
          <button onClick={() => handleButtonClick('watchlist')}>Watch List</button>
        </div>
      </div>
      <div className="content">
        {activeComponent === 'characters' && <CharacterList />}
        {activeComponent === 'episodes' && <Episod />}
        {activeComponent === 'locations' && <Location />}
        {activeComponent === 'watchlist' && <WatchList />}
      </div>
    </div>
  )
}

export default App;
