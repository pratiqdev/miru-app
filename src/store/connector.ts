import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { Actions } from './controller';

const mapState = (state: any) => state;

const mapDispatch = (dispatch: Dispatch<any>) => ({
    // thunks
    // someAsyncFunction:   (v: any) => doAsyncWork(v, dispatch),
    
    // raw dispatch
    appInit:            () => dispatch({type: Actions.app_initialized}),
    renderInit:       (ctx: any) => dispatch({type: Actions.render_init, payload: ctx}),
    
    activateCursor:     () => dispatch({type: Actions.cursor_activate, payload: {dispatch}}),
    deactivateCursor:   () => dispatch({type: Actions.cursor_deactivate}),
    handleMouseMove:    (e:any) => dispatch({type: Actions.mouse_move, payload: e,}),
    handleCursorSize:   (w:any,h:any) => dispatch({type: Actions.cursor_size, payload: {w,h}}),
    renderStart:        () => dispatch({type: Actions.render_start}),
    renderStop:         () => dispatch({type: Actions.render_stop}),
    renderScroll:       (e:any) => dispatch({type: Actions.render_scroll, payload: e}),
    enableMods:         () => dispatch({type: Actions.set_mods_enabled, payload: true}),
    disableMods:        () => dispatch({type: Actions.set_mods_enabled, payload: false}),
});

export const connector = (Component: any) => connect(mapState, mapDispatch)(Component)


// export const connector = (Component: any) => {
//     let connection;
//     try{
//         connection = connect(mapState, mapDispatch)(Component)
//     }catch(err){
//         console.log('connector error:', err)
//     }finally{
//         return connection
//     }
// };