import React,{useContext} from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import SidebarRow from './SidebarRow';
import HomeIcon from '@mui/icons-material/Home';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SettingsIcon from '@mui/icons-material/Settings';
import {GlobalContext} from './GlobalStateContext';

function Sidebar() {

  const [{user},dispatch] = useContext(GlobalContext);

  return (
    <div className="sidebar">
       <h2 className="sidebar__logo">Tune<span>Coder</span></h2>
       <h4 className="sidebar__header">Library</h4>
       <NavLink style = {({ isActive }) => ({color: isActive? 'red': 'transparent'})} to='/'><SidebarRow Icon = {HomeIcon} text='Home'/></NavLink>
       <NavLink style = {({ isActive }) => ({color: isActive? 'red': 'transparent'})} to='/Playlist'><SidebarRow Icon = {QueueMusicIcon} text='Playlist'/></NavLink>
       <NavLink style = {({ isActive }) => ({color: isActive? 'red': 'transparent'})} to='/Artists'><SidebarRow Icon = {KeyboardVoiceIcon} text='Artists'/></NavLink>
       <NavLink style = {({ isActive }) => ({color: isActive? 'red': 'transparent'})} to='/Albums'><SidebarRow Icon = {VideoLibraryIcon} text='Albums'/></NavLink>
       <NavLink style = {({ isActive }) => ({color: isActive? 'red': 'transparent'})} to='/Songs'><SidebarRow Icon = {MusicNoteIcon} text='Songs'/></NavLink>
       
       <h4 className="sidebar__header">discover</h4>
       <NavLink style = {({ isActive }) => ({color: isActive? 'red': 'transparent'})} to='/Store'><SidebarRow Icon = {LocalMallIcon} text='Store'/></NavLink>
       <NavLink style = {({ isActive }) => ({color: isActive? 'red': 'transparent'})} to='/Liked'><SidebarRow Icon = {ThumbUpIcon} text='Liked'/></NavLink>
       <NavLink style = {({ isActive }) => ({color: isActive? 'red': 'transparent'})} to='/Settings'><SidebarRow Icon = {SettingsIcon} text='Settings'/></NavLink>
       
    </div>
  )
}

export default Sidebar;