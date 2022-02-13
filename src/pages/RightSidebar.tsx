import * as React from 'react'
import { connector } from '../store/connector'

const RightSidebar = (props: any) => {

    const [lockAspectRatio, setLockAspectRatio] = React.useState(false)
    const [aspectRatio, setAspectRatio] = React.useState(1)


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
                || val / aspectRatio <  1    
            ){
                console.log('blocked width') 
                return false 
            }

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
                || val * aspectRatio <  1    
            ){
                console.log('blocked height') 
                return false 
            }
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
        <div id='right-sidebar'>

                    <button onClick={props.renderStart}>start render</button>
                    <button onClick={props.renderStop}>stop render</button>
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
                    


                    <pre style={{border: '1px solid grey', fontSize: '.8rem', textAlign: 'left', overflowY: 'scroll', maxHeight: '50vh'}}>{JSON.stringify(props, null, 2)}</pre>
        </div>
    )
}

export default connector(RightSidebar)