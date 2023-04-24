import React,{useState,useContext, useEffect} from 'react';
import './Playlist.css';
import SearchIcon from '@mui/icons-material/Search';
import { GlobalContext } from './GlobalStateContext';
import Playlist from './Playlist';

function SearchBar() {

  const [inputText,setInputText] = useState('');
  const [{playlist},dispatch] = useContext(GlobalContext);
  let [results,setResults] = useState([]);

  useEffect(() => {
    let reg = RegExp(`${inputText}`,'ig');
    setResults(playlist.filter((song) => reg.test(song.songName)).map((song) => song.id));
  },[inputText])

  return (
    <div className="search-bar">
      <input type="text" 
      placeholder='Search for songs, artists..'
      value = {inputText}
      onChange = {(e) => setInputText(e.target.value)}
      />
      <SearchIcon sx={{fontSize:22}}/>
      <div className="search-bar__results">
        {inputText.length>0 && results.length>0 && <Playlist showHeader = {false} list={results}/>}
      </div>
   </div>
  )
}

export default SearchBar;