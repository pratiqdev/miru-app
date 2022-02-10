import { Dispatch } from 'react';
import { connect } from 'react-redux';
import { runInit, handleMouseMove } from './controller';

const mapState = (state: any) => state;

const mapDispatch = (dispatch: Dispatch<any>) => ({
    runInit:            () => runInit(dispatch),
    handleMouseMove:    (e: any) => handleMouseMove(e,dispatch),
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