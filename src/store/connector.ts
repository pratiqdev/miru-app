import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { runInit, handleMouseMove, handleCursorSize, Actions } from './controller';

const mapState = (state: any) => state;

const mapDispatch = (dispatch: Dispatch<any>) => ({
    runInit:            () => runInit(dispatch),
    handleMouseMove:    (e: any) => handleMouseMove(e,dispatch),
    handleCursorSize:   (w: number, h: number) => handleCursorSize(w,h, dispatch),

    // raw dispatch
    activateCursor:     () => dispatch({type: Actions.cursor_activate}),
    deactivateCursor:   () => dispatch({type: Actions.cursor_deactivate}),
    initRender:       (ctx: any) => dispatch({type: Actions.init_render, payload: ctx}),
    startRender:        () => dispatch({type: Actions.start_render}),
    stopRender:        () => dispatch({type: Actions.stop_render}),
});

export const connector = (Component: any) => {
    let connection;
    try{
        connection = connect(mapState, mapDispatch)(Component)
    }catch(err){
        console.log('connector error:', err)
    }finally{
        return connection
    }
};