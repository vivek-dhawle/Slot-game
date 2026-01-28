class AssetLoader{
    async load(val){
        try {
            const temp=await PIXI.Assets.load(val)
            return temp
        } catch (error) {
            console.log(error)
        }
    }
}


export default AssetLoader