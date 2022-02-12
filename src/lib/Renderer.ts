class Renderer{
    ctx: any;
    active: boolean;

    constructor(ctx: any){
        this.ctx = ctx
        this.active = false
    }

    render = () => {
        console.log('render frame')
            
        this.active && window && window.requestAnimationFrame(this.render);
    }

    startRender = () => {
        this.active = true
        window && window.requestAnimationFrame(this.render);
    }

    stopRender = () => {
        this.active = false
    }

    setRenderCtx = (ctx: any) => {
        this.ctx = ctx
    }

    init = () => {
        console.log('render')
    }



}

export default Renderer