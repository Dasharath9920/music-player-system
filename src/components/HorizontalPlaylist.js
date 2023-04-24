import React,{useContext} from 'react';
import './HorizontalPlaylist.css';
import { GlobalContext } from './GlobalStateContext';

function HorizontalPlaylist({header_name,list}) {

  const [{player,curr_song,playlist,recent},dispatch] = useContext(GlobalContext);
  let _recent = [];
  for(let i = 0; i < recent?.length; i++)
    _recent.push(recent[i]);

  // console.log(_recent);

  const playSong =(id) => {

    if(_recent.length===0 || _recent[0]!==id){
      _recent.unshift(id);
      if(_recent.length>50) 
          _recent.pop();
    }
    if(curr_song!==id-1){
      player.pause();
      dispatch({
        type: 'PLAY_SONG',
        curr_song: id-1,
        playing: true,
        player: new Audio(playlist[id-1].audio),
        _recent: _recent
      })
    }
  }

  return (
      <div className="playlist">
        <h2>{header_name}</h2>
        <div className="playlist__list">
          {
             list.map((item) => {
               return <div className="playlist__list__item" key={Math.random().toString()} id = {item.id} onClick = {() => playSong(item.id)}>
                  <img src={item.cover? item.cover: '../loading.gif'} alt="" />
                  <h4>{item.songName}</h4>
                  <p>{item.artist}</p>
               </div>
             })
          }
        </div>
      </div>
  )
}

export default HorizontalPlaylist;