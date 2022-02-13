import { CursorTypes } from "../store/controller";
import Log from "./logger";



class Renderer{
    ctx: any;
    active: boolean;
    frameCount: number;
    cursor: any
    canvasWidth: number;
    canvasHeight: number;
    previousState: any;
    log: any;
    scrollDepth: number;
    timeline: any[];
    visibleTimeline: any[];
    modsEnabled: boolean;
    date: any;
    timelineLength: number;
    settings: any;
    timelineWorker: any;

    constructor(ctx: any){
        this.ctx = ctx
        this.active = false
        this.frameCount = 0
        this.canvasWidth = 720
        this.canvasHeight = 123
        this.cursor = {
            active: true,
            enabled: true,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            color: '#aaf'
        }

        this.previousState = {
            canvasWidth: 0,
            canvasHeight: 0,
            cursor: {
                x: 0,
                y: 0,
                width:0,
                height: 0,
            }
        }

        this.scrollDepth = 0
        this.timelineLength = 0
        this.modsEnabled = false
        this.timeline = []
        this.visibleTimeline = []
        this.settings = {
            maxCursorSize: 1000
        }


        this.log = new Log({
            head: 'Rnderer.ts',
            debug: 4,
        })

        //+ TIMELINE -----------------------------------------------------
        this.timelineWorker = null;

        if(typeof Worker !== 'undefined'){
            this.timelineWorker = new Worker('./src/lib/timelineWorker.js')
            this.timelineWorker.addEventListener('message', (e:any) => this.parseTimelineWorkerResponse(e.data))
        }else{
            this.timelineWorker = false
        }
    }

    parseTimelineWorkerResponse(data:any){
        // console.log('parse timeline data:', data)
        switch(data.type){
            case 'get_visible_timeline': this.visibleTimeline = data.payload
        }
    }

    clearFrame = () => {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    drawCursor(){
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(this.cursor.x, this.cursor.y, this.cursor.width, this.cursor.height)
    }

    hasDirtyPixels(){
        let isDirty = true;
        if(
            this.previousState.canvasWidth == this.canvasWidth
            && this.previousState.canvasHeight == this.canvasHeight
            && this.previousState.cursor.x == this.cursor.x 
            && this.previousState.cursor.y == this.cursor.y 
            && this.previousState.cursor.width == this.cursor.width 
            && this.previousState.cursor.height == this.cursor.height
        ){
            isDirty = false
        }else{
            this.previousState.canvasWidth = this.canvasWidth
            this.previousState.canvasHeight = this.canvasHeight
            this.previousState.cursor.x = this.cursor.x 
            this.previousState.cursor.y = this.cursor.y 
            this.previousState.cursor.width = this.cursor.width 
            this.previousState.cursor.height = this.cursor.height
        }

        return isDirty
    }

    // getVisibleTimeline(){
    //     let visibleRangeMin = 0 - this.settings.maxCursorSize
    //     let visibleRangeMax = this.canvasHeight + this.settings.maxCursorSize
    //     this.visibleTimeline = this.timeline.filter((x:any) => x.cursor.y <= visibleRangeMax && x.cursor.y >= visibleRangeMin)
    // }

    drawSquare(x:any, y:any, width:any, height:any, color:any){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
        // console.log('draw:', {x,y,width,height,color})
    }

    renderTimeline = async () => {
        this.visibleTimeline.forEach((x:any) => {
            switch(x.cursor.type){
                case CursorTypes.square: return this.drawSquare(x.cursor.x, x.cursor.y, x.cursor.width, x.cursor.height, x.cursor.color)
            }
        })
    }

    renderCycle = () => {
        // this.log.info('render frame')
        this.frameCount = this.frameCount + 1
        this.clearFrame()
        
        let w = this.canvasWidth
        let h = this.canvasHeight

        // this.ctx.fillStyle = "#FF0000";
        // this.ctx.fillRect(5, 5, 10, 10);

        // this.ctx.fillStyle = "#00ff00";
        // this.ctx.fillRect(5, h - 15, 10, 10);

        // this.ctx.fillStyle = "#ffff00";
        // this.ctx.fillRect(w - 15, h - 15, 10, 10);
        
        // this.ctx.fillStyle = "#0000ff";
        // this.ctx.fillRect(w - 15, 5, 10, 10);

        // this.ctx.fillStyle = "#aaa";
        // this.ctx.fillRect(50, 50, 100, 25);

        
        let date = new Date()
        let mod = {
            cursor:{
                x: this.cursor.x,
                y: this.cursor.y,
                type: CursorTypes.square,
                width: this.cursor.width,
                height: this.cursor.height,
                color: this.cursor.color
            },
            scrollDepth: this.scrollDepth,
            timestamp: date.getTime()
        }

        this.modsEnabled && this.timelineWorker.postMessage({type: 'new_mod', payload: mod})

        // this.modsEnabled && this.timeline.unshift(mod)
        // this.modsEnabled && this.visibleTimeline.unshift(mod)

        // this.timelineLength = this.timeline.length

        this.renderTimeline()
        
        // this.ctx.fillStyle = "#aaf";
        // this.ctx.fillRect(this.cursor.x, this.cursor.y, this.cursor.width, this.cursor.height)
        
        this.active && this.cursor.active && this.drawCursor()// must come last to be drawn on top of other content
        this.active && window && this.hasDirtyPixels() && window.requestAnimationFrame(this.renderCycle);
    }

    start = () => {
        this.active = true
        // this.getVisibleTimeline()
        this.timelineWorker.postMessage({type: 'get_visible_timeline'})
        window && window.requestAnimationFrame(this.renderCycle);
    }

    stop = () => {
        this.active = false
        this.renderCycle()
    }

    drawCenteredCursor(){
        this.active = true
        this.cursor.active = true
        this.cursor.x = Math.round((this.canvasWidth / 2) - (this.cursor.width / 2))
        this.cursor.y = Math.round((this.canvasHeight / 2) - (this.cursor.height / 2))
        this.renderCycle()
    }

    setRenderCtx = (ctx: any) => {
        this.ctx = ctx
    }

    setCursorPos = (cursor: any) => {
        this.cursor.x = cursor.x
        this.cursor.y = cursor.y
        this.renderCycle()
    }

    setCursorSize = (cursor: any) => {
        this.cursor.width = cursor.width
        this.cursor.height = cursor.height
        this.drawCenteredCursor()
    }

    setCursorActive = (isActive: boolean) => {
        this.cursor.active = isActive 
    }

    setCanvasDimensions = (canvas: any) => {
        this.canvasWidth = canvas.width
        this.canvasHeight = canvas.height
    }

    scroll = (value:any) => {
        this.scrollDepth = value
        this.timelineWorker.postMessage({type: 'get_visible_timeline'})
        this.renderCycle()
    }

    setModsEnabled = (isEnabled: boolean) => {
        this.modsEnabled = isEnabled
    }




}


export default Renderer

// export const renderCycle = (state: any) => {
//     console.log('render cycle')

//     state.render.active && window && window.requestAnimationFrame(renderCycle);
// }

// export const renderInit = (state: any, payload: any) => {
//     return {
//       ...state,
//       render: {
//         ...state.render,
//         ctx: payload.getContext('2d'),
//         width: payload.clientWidth,
//         height: payload.clientHeight
//       }
//     }
//   }
  
  

// export const renderStart = (state:any) => {
//     window && window.requestAnimationFrame(renderCycle);
//     return {
//         ...state,
//         render: {
//             ...state.render,
//             active: true,
//         }
//     }
// }
  
// export const renderStop = (state:any) => {
//     return {
//         ...state,
//         render: {
//             ...state.render,
//             active: false,
//         }
//     }
// }
  