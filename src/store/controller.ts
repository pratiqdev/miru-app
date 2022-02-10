// import { debounce } from 'lodash'
import chalk from 'chalk'
import Log from '../lib/logger';

export const defaultState = {
  appInitialized: false,
  pixelArray: [],
  windowX: 480,
  windowY: 720,
  cursorType: 'round',
  cursorSize: 12,
  cursorColor: '#00F',
  cursorX: 0,
  cursorY: 0,
};

export const types = {
  APP_INITIALIZED: 'APP_INITIALIZED',  
  MOUSE_MOVE: 'MOUSE_MOVE',  
};


let log = new Log({
  head: 'controller.ts',
  debug: 4,
})



// + //////////////////////////////////////////////////////////// T H U N K
// + //////////////////////////////////////////////////////////////////////

/**
 * = runInit()
 * 
 * called once on app mount
 * iinitializes application state
 * 
 * @param dispatch - dispatch event
 */
export const runInit = (dispatch: any) => {
  log.main({
    head: 'runInit',
    details: 'Initialize the controller state',
    loc: '/src/store/controller.ts | 133'
  })

  dispatch({ type: types.APP_INITIALIZED })
}







/**
 * = handleMouseMove()
 * 
 * called once on app mount
 * iinitializes application state
 * 
 * @param e - mousemove event
 */
 export const handleMouseMove = (e: any, dispatch: any) => {
  log.text(`mousemove: x${e.x} y${e.y}`)

  dispatch({ 
    type: types.MOUSE_MOVE, 
    payload: {
      x: e.x, 
      y: e.y
    } 
  })
}













// + ///////////////////////////////////////////////////////  R E D U C E R
// + //////////////////////////////////////////////////////////////////////

export const globalReducer: any = (state = defaultState, action: any) => {
  switch (action.type) {

    //=======================================================================  INIT

    case types.APP_INITIALIZED:
    return {
      ...state,
      appInitialized: true,
    };





    //=======================================================================  MOUSE MOVE

    case types.MOUSE_MOVE:
    return {
      ...state,
      cursorX: action.payload.x,
      cursorY: action.payload.y
    };





    







    

    default: return state;
  }
};
