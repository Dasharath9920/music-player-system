import React,{useContext, useEffect, useState} from 'react';
import './Footer.css';
import { Avatar, Slider } from '@mui/material';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import RepeatIcon from '@mui/icons-material/Repeat';
import {GlobalContext} from './GlobalStateContext';

function Footer() {

  const [{playing,player,recent,playlist,loop,curr_song},dispatch] = useContext(GlobalContext);
  const [range,setRange] = useState(0);
  let _recent = [];
  for(let i = 0; i < recent?.length; i++)
    _recent.push(recent[i]);

  const playPause = () => {
    dispatch({
      type: 'PLAY_PAUSE'
    })
  }

  const playSong = (ind) => {

    if(_recent.length===0 || _recent[0]!==ind){
      _recent.unshift(ind);
      if(_recent.length>50)
          _recent.pop();
    }

    dispatch({
      type: 'PLAY_SONG',
      playing: true,
      curr_song: ind-1,
      player: new Audio(playlist[ind-1].audio),
      _recent: _recent
    });
  }

  const jump = (jmp) => {
    if(jmp===0){
      player.play();
    }
    else{
      player.pause();
      let nxt_song = (curr_song+jmp+playlist.length)%playlist.length;
      playSong(nxt_song+1);
    }
  }

  const repeatHandler = () =>{
    dispatch({
      type: 'SET_LOOP',
      _loop: !loop
    })
  }

  if(playing)
    player.play();
  else
    player.pause();

  useEffect(() => {
    player.addEventListener('ended', () => {
      if(loop) jump(0);
      else jump(1);
    });
    
    return () => {
      player.removeEventListener('ended', () => console.log('song removed'));
    };
  }, [curr_song]);

  return (
    <div className="controls">
      <div className="footer-left flex">
        <Avatar src={playlist[curr_song].cover} sx={{width: 50, height: 50}}/>
        <div className="footer-left__info">
          <h5>{playlist[curr_song].songName}</h5>
          <p>{playlist[curr_song].artist}</p>
        </div>
      </div>
      <div className="play__controls flex">
        <div className="control-btns flex">
          <button><ShuffleIcon /></button>
          <button onClick = {() => jump(-1)}><SkipPreviousIcon /></button>
          <button onClick = {playPause}>{!playing? <PlayCircleIcon className='play-btn'/>: <PauseCircleFilledIcon className='play-btn'/>}</button>
          <button onClick = {() => jump(1)}><SkipNextIcon /></button>
          <button onClick = {repeatHandler}>{!loop? <RepeatIcon />: <RepeatOneIcon/>}</button>   
        </div>
        <Slider 
          size="small"
          value={range}
          onChange = {(e) => setRange(e.target.value)}
        />
      </div>
      <div className="footer-right flex">
        <button><VolumeUpIcon /></button>
        <Slider 
          size="small"
          defaultValue={70}
          valueLabelDisplay="auto"
        />
      </div>
    </div>
  )
}

export default Footer;