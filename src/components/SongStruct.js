import React,{useContext} from 'react'
import './RecentList.css';
import { GlobalContext } from './GlobalStateContext';
import { Avatar } from '@mui/material';

function SongStruct({title='',image='',artist='',id}) {

  const [{recent,playlist,curr_song,player},dispatch] = useContext(GlobalContext);
  let _recent = [];
  for(let i = 0; i < recent?.length; i++)
    _recent.push(recent[i]);

  const playSong = (id) => {

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
    <button className="recent__item" onClick = {() => playSong(id)}>
         <Avatar src={image} sx={{width: 35, height: 35}}/>
         <div className="recent__item__info">
            <h5>{title}</h5>
            <p>{artist}</p>
         </div>
      </button>
  )
}

export default SongStruct;