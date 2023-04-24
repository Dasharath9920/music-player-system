import React,{useContext, useEffect} from 'react';
import './Playlist.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongStruct from './SongStruct';
import PlayCircle from '@mui/icons-material/PlayCircle';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import {GlobalContext} from './GlobalStateContext';

function Playlist({showHeader=true, list,playlistName = 'Liked'}) {

  const [{player,curr_song,recent,playlist},dispatch] = useContext(GlobalContext);

  const playSong =(id) => {

    let _recent = [...recent];

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

  const addToLikes = (id) => {

    let new_playlist = [...playlist];
    new_playlist[id-1].favourite = !playlist[id-1].favourite;
    dispatch({
      type: 'SET_PLAYLIST',
      list: new_playlist
    });
  }

  return (
    <div className="playlist">
        {
          showHeader && 
          <div className="playlist__header flex">
            <h2>{playlistName}</h2>
            <button><MoreHorizIcon/></button>
          </div>
        }
        <div className="playlist__songs__list">
          {list.length>0 && list.map((_id) => {
            let song = playlist[_id-1];
            return <div className="list__song flex" key={Math.random().toString()} id={song.id} onClick = {() => playSong(song.id)}>
                      <SongStruct title = {song.songName} id={song.id} artist={song.artist} image = {song.cover}/>
                      <div className="list__song__right flex">
                        <p>3:15</p>
                        <button>{curr_song!==song.id-1? <PlayCircle sx={{fontSize:20}} color='primary'/>: <PauseCircleFilledIcon sx={{fontSize:20}} color='success'/>}</button>
                        <button onClickCapture = {() => addToLikes(song.id)}>{!song.favourite? <ThumbUpOutlinedIcon sx={{fontSize:20}} color='primary'/>: <ThumbUpIcon color="success" sx={{fontSize:20}}/>}</button>
                      </div>
                    </div>
          })}
        </div>
    </div>
  )
}

export default Playlist;