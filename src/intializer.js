class Initializer{
    static app=new PIXI.Application()
    static async intiailzeApp(){
        try {
            await this.app.init({
                resizeTo:window,
                background:0x1e1e1e
            })
            document.body.appendChild(this.app.canvas)
            return this.app
        } catch (error) {
            console.log(error)
        }
    }
}

export default  Initializer