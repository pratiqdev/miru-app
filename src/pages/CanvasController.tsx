import * as React from 'react'
import { connector } from '../store/connector'
import Log from '../lib/logger'

const CanvasController = (props: any) => {
    const canvasRef= React.useRef<any>(null)
        
    let log = new Log({
        head: 'CanvasController.ts',
        debug: 4,
    })
    
  

    React.useEffect(()=>{
        return () => {
            canvasRef.current.removeEventListener('mousemove', handleMouseMoveRef) 
            canvasRef.current.removeEventListener('mouseenter', handleMouseEnterRef) 
            canvasRef.current.removeEventListener('mouseleave', handleMouseLeaveRef) 
            canvasRef.current.removeEventListener('wheel', handleMouseWheelRef) 
            canvasRef.current.removeEventListener('mousedown', handleMouseDownRef) 
            canvasRef.current.removeEventListener('mouseup', handleMouseUpRef) 
        }
    }, [])


    const handleMouseMoveRef = React.useCallback((e:any)=>{
        props.handleMouseMove(e)
    }, [])

    const handleMouseEnterRef = React.useCallback((e:any)=>{
        props.activateCursor(e)
        props.renderStart(e)
    }, [])

    const handleMouseLeaveRef = React.useCallback((e:any)=>{
        props.deactivateCursor(e)
        props.renderStop(e)
        props.disableMods()
    }, [])

    const handleMouseWheelRef = React.useCallback((e:any)=>{
        props.renderScroll(e)
    }, [])

    const handleMouseDownRef = React.useCallback(()=>{
        props.enableMods()
    }, [])

    const handleMouseUpRef = React.useCallback(()=>{
        props.disableMods()
    }, [])


    const setupCanvas = (canvas: any) => {
        log.main({
            head: 'setupCanvas',
            details: 'Created ref and setup event lisiteners on canvas',
            loc: '/src/pages/CanvasCoontroller.tsx | 43'
          })
        
        canvasRef.current = canvas
        canvasRef.current.width = 720
        canvasRef.current.height = window.innerHeight
        props.appInit()
        props.renderInit(canvasRef.current)

        canvasRef.current.addEventListener('mousemove', handleMouseMoveRef) 
        canvasRef.current.addEventListener('mouseenter', handleMouseEnterRef) 
        canvasRef.current.addEventListener('mouseleave', handleMouseLeaveRef) 
        canvasRef.current.addEventListener('wheel', handleMouseWheelRef) 
        canvasRef.current.addEventListener('mousedown', handleMouseDownRef) 
        canvasRef.current.addEventListener('mouseup', handleMouseUpRef) 
    }

    const findCanvas = () => {
        let canvas = document.querySelector('canvas')
        if(canvas == null){
            setTimeout(() => findCanvas(), 1000)
        }else{
            setupCanvas(canvas)
        }
    }

    React.useEffect(()=>{
        findCanvas()
    }, [])

    return null

}

export default connector(CanvasController)