import * as React from 'react'
import RightSidebar from './RightSidebar'
import CanvasController from './CanvasController'

const Scrawl = (props: any) => {

    return(
        <>
            <div id='canvas-container'>
                    


                    {/* <pre style={{border: '1px solid grey', fontSize: '.8rem', textAlign: 'left'}}>{JSON.stringify(props, null, 2)}</pre> */}
                <canvas width='720' height='900' 
                    // ref={canvasRef} 
                    // onMouseMove={props.handleMouseMove} 
                    // onMouseEnter={props.activateCursor} 
                    // onMouseLeave={props.deactivateCursor} 
                    id='canvas'></canvas>
                <CanvasController />


                <RightSidebar />
            </div>
        </>
    )
}

export default Scrawl