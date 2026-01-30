import AssetLoader from "./AssetLoader.js";
import Transitions from "./transition.js";

class BuildSlot{
    constructor(app,parentContainer){
        this.parentContainer=parentContainer
        this.loader=new AssetLoader()
        this.transit=new Transitions()
        this.app=app
        this.SlotMachineContainer=new PIXI.Container()
        this.bounds=parentContainer.getBounds()
        this.SlotMachineContainer.position.set(this.bounds.minX+125,this.bounds.minY+120)

        this.cube=new PIXI.Graphics().rect(0,0,50,50).fill(0xffffff)


        this.reelContainer1=new PIXI.Container()
        this.reelContainer2=new PIXI.Container()
        this.reelContainer3=new PIXI.Container()
        this.reelContainer4=new PIXI.Container()
        this.reelContainer5=new PIXI.Container()

        this.i=0
        this.texture=[]
        this.blurTexture=[]

        this.symbolSprite=[]
        this.symbolBlurSprite=[]
        this.SlotMachineContainer.scale.set(0.48)
        this.app.stage.addChild(this.SlotMachineContainer)


        this.SlotMachineContainer.addChild(this.reelContainer1)
        this.SlotMachineContainer.addChild(this.reelContainer2)
        this.SlotMachineContainer.addChild(this.reelContainer3)
        this.SlotMachineContainer.addChild(this.reelContainer4)
        this.SlotMachineContainer.addChild(this.reelContainer5)


        this.spinning=false
        
        this.arr1=[]
        this.arr2=[]
        this.arr3=[]
        this.arr4=[]
        this.arr5=[]
    }

    async #loadAsset(){
       this.texture = await this.loader.load([
                '../Assets/symbols/assets/a.png',
                '../Assets/symbols/assets/b.png',
                '../Assets/symbols/assets/c.png',
                '../Assets/symbols/assets/d.png',
                '../Assets/symbols/assets/e.png',
                '../Assets/symbols/assets/f.png',
                '../Assets/symbols/assets/g.png',
                '../Assets/symbols/assets/h.png',
                '../Assets/symbols/assets/i.png',
                '../Assets/symbols/assets/k.png',
                '../Assets/symbols/assets/s.png',
                '../Assets/symbols/assets/w.png'
            ]);
            
            this.blurTexture = await this.loader.load([
                '../Assets/symbols/assets/a_blur.png',
                '../Assets/symbols/assets/b_blur.png',
                '../Assets/symbols/assets/c_blur.png',
                '../Assets/symbols/assets/d_blur.png',
                '../Assets/symbols/assets/e_blur.png',
                '../Assets/symbols/assets/f_blur.png',
                '../Assets/symbols/assets/g_blur.png',
                '../Assets/symbols/assets/h_blur.png',
                '../Assets/symbols/assets/i_blur.png',
                '../Assets/symbols/assets/w_blur.png'
            ]);

            this.symbolSprite=Object.values(this.texture); 
            this.symbolBlurSprite=Object.values(this.blurTexture); 
    
        
    }

    #buildReel(container,sprites,arr){

        for (let i = 0; i < 3; i++) {
            const index = Math.floor(Math.random()*sprites.length);
            const sprite = new PIXI.Sprite(sprites[index]);
            sprite.anchor.set(0.5);
            sprite.y = (i * 300);
            container.addChild(sprite);
            arr.push(sprite)
        }       
    }

    

    #buildBlurReel(container,sprites,arr){
            const index = Math.floor(Math.random()*sprites.length);
            const sprite = new PIXI.Sprite(sprites[index]);
            sprite.anchor.set(0.5);
            container.addChild(sprite); 
            sprite.position.set(0,-100)
            arr.push(sprite) 


            if(this.spinning)setTimeout(()=>{this.#buildBlurReel(container,sprites,arr)
                console.log(this.i)
            this.i++
                if(!this.spinning){
                    this.destroyBr()
                    this.buildR()
                }
            },70)
    }

    #animateBlurReel(arr,speed){
            for (let i=arr.length-1;i>=0;i--){
                const ele=arr[i];

                if (ele.y>=this.SlotMachineContainer.height+300){
                    ele.destroy();
                    arr.splice(i, 1);
                    continue;
                }
                ele.y+=speed;
            }
    }


    #removeBR(container,sprites,arr){
        arr.forEach((ele)=>{
            
            container.removeChild(ele)
        })
        arr=[]
    }

    buildR(){
        this.#buildReel(this.reelContainer1,this.symbolSprite,this.arr1);
        this.#buildReel(this.reelContainer2,this.symbolSprite,this.arr2);
        this.#buildReel(this.reelContainer3,this.symbolSprite,this.arr3);
        this.#buildReel(this.reelContainer4,this.symbolSprite,this.arr4);
        this.#buildReel(this.reelContainer5,this.symbolSprite,this.arr5);
    }


    buildBR(){
        this.#buildBlurReel(this.reelContainer1,this.symbolBlurSprite,this.arr1)
        this.#buildBlurReel(this.reelContainer2,this.symbolBlurSprite,this.arr2)
        this.#buildBlurReel(this.reelContainer3,this.symbolBlurSprite,this.arr3)
        this.#buildBlurReel(this.reelContainer4,this.symbolBlurSprite,this.arr4)
        this.#buildBlurReel(this.reelContainer5,this.symbolBlurSprite,this.arr5)
    }
    destroyBr(){
        this.#removeBR(this.reelContainer1,this.symbolBlurSprite,this.arr1)
        this.#removeBR(this.reelContainer2,this.symbolBlurSprite,this.arr2)
        this.#removeBR(this.reelContainer3,this.symbolBlurSprite,this.arr3)
        this.#removeBR(this.reelContainer4,this.symbolBlurSprite,this.arr4)
        this.#removeBR(this.reelContainer5,this.symbolBlurSprite,this.arr5)
    }
    #buildTickerMove(){
        const speed=100*this.app.ticker.deltaTime
        this.#animateBlurReel(this.arr1,speed)
        this.#animateBlurReel(this.arr2,speed)
        this.#animateBlurReel(this.arr3,speed)
        this.#animateBlurReel(this.arr4,speed)
        this.#animateBlurReel(this.arr5,speed)
    }



    playAnimation(){
        this.#buildTickerMove()
    }


    async buildSlot(){
        await this.#loadAsset()
        
        
        // this.#buildReel(this.reelContainer2);
        // this.#buildReel(this.reelContainer3);
        // this.#buildReel(this.reelContainer4);
        // this.#buildReel(this.reelContainer5);




       this.buildR()

        const spacing = 370;    
        const bounds=this.SlotMachineContainer.getLocalBounds()
        console.log(bounds)
        
        //this.reelContainer1.x =300;
        //this.reelContainer1.position.set(bounds.minY)


        //this.reelContainer1.scale.set(0.5)


        this.reelContainer2.x = spacing;
        this.reelContainer3.x = spacing * 2;
        this.reelContainer4.x = spacing * 3;
        this.reelContainer5.x = spacing * 4;



        console.log(this.app.ticker.deltaTime)
        

    }






}

export default BuildSlot 