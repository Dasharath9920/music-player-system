import React,{useReducer, createContext} from 'react';
import reducer from './reducer.js';
import Songs from './songs';
// console.log(Songs);
const initializer = {
   user: null,
   playing: false,
   playlist: [...Songs],
   favourites: [2,5,3,6,9,4],
   recent: [],
   curr_song: 1,
   loop: false,
   player: new Audio(Songs[1].audio),
   token: 'BQCt4GnsIX8VeSMz5X2cp0bB2FV8ebBr1X1fwKxF7WR4Wdh2EzqLNliJJO3PFV0wB4VApm-wldjmdxRQs-PSFaWKTjiiGWRqejiMw6wh5Xjf4cV5sdxQStZum8Tg_rb3W-8urhyACdP3Omj5t0oaG2VXicGC7KFS_f0cdpzWj-ODSg6Nd5Ux'
}

export const GlobalContext = createContext(initializer);

export const GlobalContextProvider = ({children}) => {
   return <GlobalContext.Provider value = {useReducer(reducer,initializer)}>
      {children}
   </GlobalContext.Provider>
}