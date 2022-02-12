// import { debounce } from 'lodash'
import chalk from 'chalk'
import Log from '../lib/logger';
import { draw } from '../lib/draw';
import Renderer from '../lib/Renderer';

export const defaultState = {
  settings: {
    maxCursorSize: 1000,
  },
  appInitialized: false,
  timeline: [],
  window: {
    height: 480,
    width: 720,
    depth: 0,
  },
  cursor: {
    active: false,
    enabled: true,
    color: '#00f',
    type: 'round',
    height: 2,
    width: 8,
    x: 0,
    y: 0,
  },
  redrawRequired: false,
  renderer: null,
};


export enum CursorTypes {
  'circle',
  'round',
  'square',
  'triangle',
}

export enum Actions {
  'app_initialized',
  'mouse_move',
  'cursor_size',
  'cursor_type',
  'cursor_activate',
  'cursor_deactivate',
  'validate_settings',
  'init_render',
  'start_render',
  'stop_render',
}


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


  dispatch({ type: Actions.app_initialized })
}





// + CURSOR ---------------------------------------------------------------

/**
 * = handleMouseMove()
 * 
 * called once on app mount
 * iinitializes application state
 * 
 * @param e - mousemove event
 */
 export const handleMouseMove = (e: any, dispatch: any) => {
  var rect = e.target.getBoundingClientRect();
  dispatch({ 
    type: Actions.mouse_move, 
    payload: {
      x: Math.round(e.clientX - rect.left), 
      y: Math.round(e.clientY - rect.top)
    } 
  })
}

export const handleCursorSize = (w: any, h: any, dispatch: any) => {
  dispatch({ 
    type: Actions.cursor_size, 
    payload: {w, h} 
  })
}

export const handleCursorType = (type: any, dispatch: any) => {
  let newType;
  switch(type.toLowerCase()){
    case 'square':    newType = CursorTypes.square; break;
    case 'triangle':  newType = CursorTypes.triangle; break;
    default:          newType = CursorTypes.circle; break;
  }
  dispatch({ 
    type: Actions.cursor_type, 
    payload: newType
  })
}




// + CANVAS ---------------------------------------------------------------








// + ///////////////////////////////////////////////////////  R E D U C E R
// + //////////////////////////////////////////////////////////////////////

export const globalReducer: any = (state = defaultState, action: any) => {
  switch (action.type) {

    //=======================================================================  INIT

    case Actions.app_initialized:{
      
      return {
        ...state,
        appInitialized: true,
      };
    }





    //=======================================================================  MOUSE MOVE

    case Actions.mouse_move: {
      return {
        ...state,
        cursor: {
          ...state.cursor,
          x: action.payload.x,
          y: action.payload.y
        }
      }
    }
      

    case Actions.cursor_size: {
      let w = action.payload.w
      let h = action.payload.h
      let Ws;
      let Hs;

      if(w < 1){ Ws = 1 }
      else if(w > state.settings.maxCursorSize){ Ws = state.settings.maxCursorSize }
      else{ Ws = parseInt(w) }

      if(h < 1){ Hs = 1 }
      else if(h > state.settings.maxCursorSize){ Hs = state.settings.maxCursorSize }
      else{ Hs = parseInt(h) }

      return {
        ...state,
        cursor: {
          ...state.cursor,
          width: Ws,
          height: Hs
        }
      }
    }

    case Actions.cursor_activate:
    return{
      ...state,
      cursor:{
        ...state.cursor,
        active: true,
      }
    }

    case Actions.cursor_deactivate:
    return{
      ...state,
      cursor:{
        ...state.cursor,
        active: false,
      }
    }

    case Actions.init_render:
    return{
      ...state,
      renderer: new Renderer(action.payload)
    }

    case Actions.start_render:{
    state.renderer && state.renderer.startRender()
    return state
    }

    case Actions.stop_render:{
      state.renderer && state.renderer.stopRender()
      return state
      }


      







    







    

    default: return state;
  }
};
