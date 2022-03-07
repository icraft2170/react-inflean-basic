import React from 'react'
import './App.css';
import Title from './components/Title';
import Favorites from './components/Favorites'
import Form from './components/Form'
import MainCard from './components/MainCard'


const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
    const OPEN_API_DOMAIN = "https://cataas.com";
    const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
    const responseJson = await response.json();
    return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};


const App = () => {
  const CAT1 =
    "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const [counter, setCounter] = 
    React.useState(() => {
        return jsonLocalStorage.getItem("counter");
      }
    );
  const [mainCat, setMainCat] = React.useState(CAT1);
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || []
  });

  const alreadyFavorite = favorites.includes(mainCat);
  
  async function setInitialCat() {
    const newCat = await fetchCat('First CAT');
    console.log(newCat);
    setMainCat(newCat);
  }

  React.useEffect(() => {
    setInitialCat();
  }, []);

  function handleHeartClick(event) {
    const nextFavorites = [...favorites, mainCat]
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem('favorites', nextFavorites);
  }


  async function updateMainCat(value) {
    const newCat = await fetchCat(value);
    setMainCat(newCat)
    setCounter((prev) => {
      const nextCount = prev + 1;
      jsonLocalStorage.setItem("counter", nextCount)
      return prev + 1;
    });
  }
  
  const title = (counter != null) ? `${counter}번째 고양이 가라사대` : '고양이 가라사대';

  return(
    <div>
      <Title>{title}</Title>
      <Form updateMainCat={updateMainCat}/>
      <MainCard img={mainCat} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite} />
      <Favorites favorites={favorites}/>
    </div>
  )
}
  

export default App;