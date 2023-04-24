import React,{useState,useEffect, useContext} from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Playlist from './components/Playlist';
import Home from './components/Home';
import Footer from './components/Footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RecentList from './components/RecentList';
import SearchBar from './components/SearchBar';
import Login from './components/Login';
import SpotifyWebApi from 'spotify-web-api-js';
import { getTokenFromUrl } from './components/spotify';
import { GlobalContext } from './components/GlobalStateContext';

const spotify = new SpotifyWebApi();

function App() {

  
  const [token, setToken] = useState(null);
  const [{playlist,curr_song,liked},dispatch] = useContext(GlobalContext);

  useEffect(() => {
    const hash = getTokenFromUrl();
    const _token = hash.access_token;

    if(_token){
      setToken(_token);
      spotify.setAccessToken(_token);
      // console.log(_token)

      dispatch({
        type: 'SET_TOKEN',
        token: _token
      })

      spotify.getMe()
      .then(user => {
        dispatch({
          type: 'SET_USER',
          user: user
        })
      });

      // spotify.getUserPlaylists()
      // .then((playlists) => {
      //   console.log(playlists.items);
      //   dispatch({
      //     type: 'SET_PLAYLIST',
      //     list: playlists.items
      //   })
      // })
    }

    // dispatch({
    //   type: 'SET_PLAYLIST',
    //   list: {Songs}
    // });

  },[]);
  
  return (
    <div className="container">
      {!token? <Login />:
      <Router>
        <div className="app">

          <div className="header">
              <Sidebar />
              <div className = 'body'>
                <div className="album-left">
                  <SearchBar />
                  <Routes>
                    <Route path='/Liked' element = {<Playlist list={playlist.filter((song) => song.favourite).map((song) => song.id)} playlistName='Liked'/>}></Route>
                    <Route path = '/Playlist' element = {<Playlist list = {Array.from({length: playlist.length}, (_,i) => i+1)} playlistName='Your Playlist'/>}></Route>
                    <Route path='/' element={<Home />}></Route>
                  </Routes>
                </div>
                <div className="album-right">
                  <RecentList />
                </div>
              </div>
              <img className = 'song__cover' src={playlist[curr_song].cover} alt="" />
          </div>

          <div className="footer">
            <Footer />
          </div>

        </div>
      </Router>
      }
    </div>
  );
}

export default App;
