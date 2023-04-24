import React,{useContext} from 'react';
import './Footer.css';
import './RecentList.css';
import SongStruct from './SongStruct';
import { GlobalContext } from './GlobalStateContext';
import { Slide, sliderClasses } from '@mui/material';

function RecentList() {

  const [{recent,playlist},dispatch] = useContext(GlobalContext);

  let curr = 1;
  let perc = 0;
  let _recent = [...recent];
  
  const slide = (cnt) => {
    if(recent.length===0)
      return;
    
    if(cnt==='next'){
      if(curr===_recent.length)
        return;
      perc-=50;
      document.getElementById('recent__list-slide').style.transform = `translate(${perc}%)`;
      curr++;
    }
    else{
      if(curr===1)
        return;
      perc += 50;
      document.getElementById('recent__list-slide').style.transform = `translate(${perc}%)`;
      curr--;
    }
  }

  return (
     <div className="recent">
        <div className="recent__header">
          <h2>Recent</h2>
          <button onClick = {() => slide('prev')}>&lt;</button>
          <button onClick ={() => slide('next')}>&gt;</button>
        </div>

        <div className="recent__list">
            <div id="recent__list-slide">
              {recent?.map((id) => {
              let song = playlist[id-1];
              return <SongStruct
                key = {Math.random().toString()} 
                id = {song.id}
                title={song.songName}
                image={song.cover}
                artist = {song.artist}
              />
            })}</div>
         </div>
      </div>  
  )
}

export default RecentList;