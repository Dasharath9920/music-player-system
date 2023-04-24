const reducer = (state,action) =>{

   switch(action.type){
      case 'SET_PLAYLIST':{
         return {...state,playlist: action.list};
      }
      case 'SET_LOOP':{
         return {...state,loop: action._loop};
      }
      case 'SET_RECENT':{
         return {...state,recent: action._recent};
      }
      case 'PLAY_SONG':{
         return {...state, 
            playing: action.playing, 
            curr_song: action.curr_song, 
            player: action.player,
            recent: action._recent
         };
      }
      case 'START_PLAYLIST':{
         return {...state,list: action.list,playing: action.playing,curr_song: 0};
      }
      case 'SET_USER':{
         return {...state,user: action.user};
      }
      case 'SET_TOKEN':{
         return {...state,token: action.token};
      }
      case 'PLAY_PAUSE':
         return {...state,playing: !state.playing};
      default:
         return state;
   }

}

export default reducer;