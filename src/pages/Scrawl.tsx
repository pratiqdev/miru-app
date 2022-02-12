import * as React from 'react'
import { connector } from '../store/connector'

const Scrawl = (props: any) => {
    const canvasRef = React.useRef<any>(null)
    const widthRef = React.useRef<any>(null)

    const [lockAspectRatio, setLockAspectRatio] = React.useState(false)
    const [aspectRatio, setAspectRatio] = React.useState(1)

    React.useEffect(()=>{
        if(canvasRef.current){ 
            canvasRef.current.addEventListener('mousemove', props.handleMouseMove) 
            props.initRender(canvasRef.current.getContext('2d'))
        }
        // if(window){ window.addEventListener('mouseup', removeDrags) }
        return () => {canvasRef.current.removeEventListener('mousemove', props.handleMouseMove)}
    }, [])


    const handleWidthScroll = (e: any) => handleCursorWidth(e.deltaY < 0 ? props.cursor.width + 1 : props.cursor.width - 1)

    const handleHeightScroll = (e: any) => handleCursorHeight(e.deltaY < 0 ? props.cursor.height + 1 : props.cursor.height - 1)

    const handleAspectRatio = () => {
        if(!lockAspectRatio){
            setLockAspectRatio(true)
            setAspectRatio(props.cursor.width / props.cursor.height)
            console.log('aspect ratio:', props.cursor.width / props.cursor.height)
        }else{
            setLockAspectRatio(false)
        }
    }

    const handleCursorWidth = (val: number) => {
        if(lockAspectRatio){
            if(
                val / aspectRatio > props.settings.maxCursorSize
                || val / aspectRatio <  0    
            ){ return false }

            props.handleCursorSize(
                val,    
                Math.round(val / aspectRatio),
            )
        }else{
            props.handleCursorSize(
                val,    
                props.cursor.height
            )
        }
    }

    const handleCursorHeight = (val: number) => {
        if(lockAspectRatio){
            if(
                val * aspectRatio > props.settings.maxCursorSize
                || val * aspectRatio <  0    
            ){ return false }
            props.handleCursorSize(
                Math.round(val * aspectRatio),
                val    
            )
        }else{
            props.handleCursorSize(
                props.cursor.width,
                val    
            )
        }
    }

    return(
        <>
            <div id='canvas-container'>
                <div id='sidebar-right'>

                    <button onClick={props.startRender}>start render</button>
                    <button onClick={props.stopRender}>stop render</button>
                    <button onClick={handleAspectRatio}>{lockAspectRatio ? 'Unlock' : 'Lock'} aspect ratio</button>
                    
                   
                    <div className='flex' 
                        onWheel={handleWidthScroll} 
                        // onMouseDown={enableDragWidth} 
                        // ref={widthRef}
                        >
                        Cursor Width                    
                        <input type="number" min="1" max="1000" value={props.cursor.width} onChange={(e:any) => handleCursorWidth(e.target.value)} />
                    </div>
                    <div className='flex' 
                        onWheel={handleHeightScroll} 
                        // onMouseDown={enableDragHeight}
                        >
                        Cursor Height                    
                        <input type="number" min="1" max="1000" value={props.cursor.height} onChange={(e:any) => handleCursorHeight(e.target.value)} />
                    </div>
                    


                    <pre style={{border: '1px solid grey', fontSize: '.8rem', textAlign: 'left'}}>{JSON.stringify(props, null, 2)}</pre>
                </div>
                <canvas ref={canvasRef} onMouseMove={props.handleMouseMove} onMouseEnter={props.activateCursor} onMouseLeave={props.deactivateCursor} id='canvas'></canvas>
            </div>
        </>
    )
}

export default connector(Scrawl)