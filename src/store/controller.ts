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
    width: 8,
    height: 2,
    x: 0,
    y: 0,
  },
  redrawRequired: false,
  scrollDepth: 0,
  br: '----------------------------------',
  renderEngine: null,
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
  'render_init',
  'render_stop',
  'render_start',
  'render_scroll',
  'set_mods_enabled',
}


let log = new Log({
  head: 'controller.ts',
  debug: 4,
})










//- ////////////////////////////////////////////////////////////////////// D I R E C T
//- //////////////////////////////////////////////////////////////////////////////////
//-   Any function that can directly return the new state object 
//-   without a delay or any async actions





const initializeApp = (state: any) => {
  log.main({
    head: 'initializeApp',
    details: 'Initialize the controller state',
    loc: '/src/store/controller.ts | 133'
  })

  return{
    ...state,
    appInitialized: true
  }
}

//-------------------------------------------------------------------- MOUSE / CURSOR

const handleMouseMove = (state: any, payload: any) => {
  var rect = payload.target.getBoundingClientRect();
  let x = Math.round(payload.clientX - rect.left)
  let y = Math.round(payload.clientY - rect.top)
  state.renderEngine.setCursorPos({x, y})

  return {
    ...state,
    cursor: {
      ...state.cursor,
      x,
      y,
    }
  }
}

const handleCursorSize = (state:any, payload: any) => {
  let w = parseInt(payload.w)
  let h = parseInt(payload.h)
  let Ws;
  let Hs;

  if(w < 1){ Ws = 1 }
  else if(w > state.settings.maxCursorSize){ Ws = state.settings.maxCursorSize }
  else{ Ws = w }

  if(h < 1){ Hs = 1 }
  else if(h > state.settings.maxCursorSize){ Hs = state.settings.maxCursorSize }
  else{ Hs = h }

  state.renderEngine.setCursorSize({
    width: Ws,
    height: Hs
  })

  return {
    ...state,
    cursor: {
      ...state.cursor,
      width: Ws,
      height: Hs
    }
  }
}

const handleCursorType = (type: any, dispatch: any) => {
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

const setCursorActive = (state:any, isActive: boolean) => {
  state.renderEngine.setCursorActive(isActive)
    return {
      ...state,
      cursor: {
        ...state.cursor,
        active: isActive,
      }
    }
}


//-------------------------------------------------------------------------- RENDERER 

const renderInit = (state: any, payload: any) => {
  let engine = new Renderer(payload.getContext('2d'))

  engine.setCanvasDimensions({
    width: payload.clientWidth,
    height: payload.clientHeight
  })

  engine.setCursorPos({
    x: 0,
    y: 0,
  })
  engine.setCursorSize({
    width: state.cursor.width,
    height: state.cursor.height
  })

  return {
    ...state,
    renderEngine: engine
  }
}

const renderStart = (state:any) => {
  state.renderEngine.start()
  return state
}

const renderStop = (state:any) => {
  state.renderEngine.stop()
  return state
}

const renderScroll = (state:any, payload:any) => {
  let scrollDepth = payload.deltaY > 0 ? state.scrollDepth + 1 : state.scrollDepth - 1;
  state.renderEngine.scroll(scrollDepth)
  return {
    ...state,
    scrollDepth
  }
}

const setModsEnabled = (state: any, payload: any) => {
  state.renderEngine.setModsEnabled(payload)
  return state
}






//? //////////////////////////////////////////////////////////////////////// T H U N K
//? //////////////////////////////////////////////////////////////////////////////////
//?   Any functions that require a delay in the state update must be
//?   called directly then dispatch an event that will update the state
//?   e.g. fetch timeline from db

export const someAsyncFunction = (state:any, payload:any) => {}









//+ ///////////////////////////////////////////////////////////////////  R E D U C E R
//+ ///////////////////////////////////////////////////////////////////////////////////
//+   Any functions that directly affect the state without complex 
//+   computations should call dispatch directly and logic handled 
//+   within the reducer

export const globalReducer: any = (state = defaultState, action: any) => {
  switch (action.type) {

    case Actions.app_initialized: return initializeApp(state)

    case Actions.mouse_move: return handleMouseMove(state, action.payload) 
     
    case Actions.cursor_size: return handleCursorSize(state, action.payload)

    case Actions.cursor_activate: return setCursorActive(state, true)

    case Actions.cursor_deactivate: return setCursorActive(state, false)

    case Actions.render_init: return renderInit(state, action.payload)

    case Actions.render_start: return renderStart(state)

    case Actions.render_stop: return renderStop(state)

    case Actions.render_scroll: return renderScroll(state, action.payload)

    case Actions.set_mods_enabled: return setModsEnabled(state, action.payload)

      







    







    

    default: return state;
  }
};
