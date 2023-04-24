import React,{useContext} from 'react';
import { GlobalContext } from './GlobalStateContext';
import HorizontalPlaylist from './HorizontalPlaylist';
import './Home.css';

const loading_gif = 'https://miro.medium.com/max/1838/1*e_Loq49BI4WmN7o9ItTADg.gif';

function Home() {

  const [{user,playlist,favourites,liked},dispatch] = useContext(GlobalContext);
  const songs = playlist;

  return (
    <div className="home">
      <div className="home-header">
        <img src={user? user.images[0].url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoDo9y4epI-H9dT98Y7si7l3dfmBPrNQiChA&usqp=CAU'} alt="" className="home-header-image" />
        <div className="home-header__info">
          <p>Profile</p>
          <h2>{user?.display_name}</h2>
          <p>{playlist?.length} Playlists • {user?.followers.total} Followers</p>
        </div>
      </div>
       <HorizontalPlaylist 
        header_name='Top Picks'
        list = {songs.filter((song) => favourites.includes(song.id))}
        />
      
      <HorizontalPlaylist 
        header_name='Your Favourites'
        list = {songs.filter((song) => !song.liked)}
      />
    </div>
  )
}

export default Home;