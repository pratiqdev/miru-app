class Renderer{
    ctx: any;
    active: boolean;
    frameCount: number;
    cursor: any
    canvasWidth: number;
    canvasHeight: number;

    constructor(ctx: any){
        this.ctx = ctx
        this.active = false
        this.frameCount = 0
        this.canvasWidth = 720
        this.canvasHeight = 123
        this.cursor = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    }

    clearFrame = () => {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    render = () => {
        console.log('render frame')
        this.frameCount = this.frameCount + 1
        this.clearFrame()

        let w = this.canvasWidth
        let h = this.canvasHeight

        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(5, 5, 10, 10);

        this.ctx.fillStyle = "#00ff00";
        this.ctx.fillRect(5, h - 15, 10, 10);

        this.ctx.fillStyle = "#ffff00";
        this.ctx.fillRect(w - 15, h - 15, 10, 10);

        this.ctx.fillStyle = "#0000ff";
        this.ctx.fillRect(w - 15, 5, 10, 10);

        this.ctx.fillStyle = "#aaa";
        this.ctx.fillRect(50, 50, 100, 25);
            
        this.active && window && window.requestAnimationFrame(this.render);
    }

    start = () => {
        this.active = true
        window && window.requestAnimationFrame(this.render);
    }

    stop = () => {
        this.active = false
    }

    setRenderCtx = (ctx: any) => {
        this.ctx = ctx
    }

    setCursorPos = (cursor: any) => {
        this.cursor.x = cursor.x
        this.cursor.y = cursor.y
    }

    setCursorSize = (cursor: any) => {
        this.cursor.width = cursor.width
        this.cursor.height = cursor.height
    }

    setCanvasDimensions = (canvas: any) => {
        this.canvasWidth = canvas.width
        this.canvasHeight = canvas.height
    }




}

export default Renderer