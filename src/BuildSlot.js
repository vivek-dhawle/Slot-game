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

        this.mapContainer=new PIXI.Container()
        this.mapContainer.position.set((this.bounds.minX+this.bounds.maxX)/2,(this.bounds.minY+this.bounds.maxY)/2)

        this.cube=new PIXI.Graphics().rect(0,0,900,500).fill(0xffffff)
        this.cube.pivot.set(450,250)
        this.cube.visible=false
        
        this.mapContainer.addChild(this.cube)
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

        this.app.stage.addChild(this.mapContainer)
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



        this.winarr=[]
        this.winLines = [

/* ---------------- HORIZONTAL ---------------- */
[0,3,6,9,12],
[1,4,7,10,13],
[2,5,8,11,14],

/* length 3 horizontals */
[0,3,6],[3,6,9],[6,9,12],
[1,4,7],[4,7,10],[7,10,13],
[2,5,8],[5,8,11],[8,11,14],

/* ---------------- DIAGONALS ---------------- */
[0,4,8,10,12],
[2,4,6,10,14],

/* length 3 diagonals */
[0,4,8],
[4,8,10],
[2,4,6],
[4,6,10],

/* ---------------- V SHAPE ---------------- */
// [0,4,8,4,0],
// [2,4,8,4,2],

/* length 3 V */
[0,4,8],
[8,4,0],
[2,4,8],
[8,4,2],

/* ---------------- INVERTED V ---------------- */
[1,3,7,11,13],
[1,5,7,9,13],

/* length 3 inverted V */
[1,3,7],
[7,11,13],
[1,5,7],
[7,9,13],

/* ---------------- ZIGZAG ---------------- */
[0,4,6,10,12],
[2,4,8,10,14],
[1,3,7,9,13],
[1,5,7,11,13],

/* length 3 zigzag */
[0,4,6],
[4,6,10],
[2,4,8],
[4,8,10],
[1,3,7],
[3,7,9],
[1,5,7],
[5,7,11],

/* ---------------- W / M SHAPES ---------------- */
[0,4,6,4,12],
[2,4,8,4,14],

/* length 3 W/M */
[0,4,6],
[6,4,12],
[2,4,8],
[8,4,14]
];
        this.speed=100*this.app.ticker.deltaTime
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
                '../Assets/symbols/assets/k_trigger.png',
                '../Assets/symbols/assets/s_blur.png',
                '../Assets/symbols/assets/w_blur.png'
            ]);

            this.symbolSprite=Object.values(this.texture); 
            this.symbolBlurSprite=Object.values(this.blurTexture); 
    
        
    }

    #buildReel(container,sprites,arr){
        
        for (let i = 0; i < 3; i++) {

            // if(i==1){
            //     //const index = Math.floor(Math.random()*sprites.length);
            //     const sprite = new PIXI.Sprite(sprites[0]);
            //     sprite.anchor.set(0.5);
            //     sprite.y = (i * 300);
            //     container.addChild(sprite);
            //     arr.push(sprite)
            //     this.winarr.push(0)
            //     continue
            // }
            const index = Math.floor(Math.random()*sprites.length);
            const sprite = new PIXI.Sprite(sprites[index]);
            sprite.anchor.set(0.5);
            sprite.y = (i * 300);
            container.addChild(sprite);
            arr.push(sprite)
            this.winarr.push(index)
        }
       // console.log(this.winarr)
               
    }

    

    #buildBlurReel(container,sprites,arr){
        if(!this.spinning)return
            const index = Math.floor(Math.random()*sprites.length);
            const sprite = new PIXI.Sprite(sprites[index]);
            sprite.anchor.set(0.5);
            container.addChild(sprite); 
            sprite.position.set(0,-100)
            arr.push(sprite) 


        setTimeout(()=>{this.#buildBlurReel(container,sprites,arr)
            },70)
    }

    #animateBlurReel(arr,speed){
            for (let i=arr.length-1;i>=0;i--){
                const ele=arr[i];

                if (ele.y>=this.mapContainer.y*2-100){
                    ele.destroy();
                    arr.splice(i, 1);
                    continue;
                }
                ele.y+=speed;
            }
    }


    #removeBR(container,sprites,arr){
        arr.forEach((ele)=>{
            container.removeChild(ele);
            ele.destroy();
        });
        arr.length = 0;
    }


    checkWin(){
        const winarr=this.winarr
        //console.log(winarr)
        // for(let i=0;i<3;i++){
        //     console.log(winarr)
        //     if(winarr[i]==winarr[i+3]&&winarr[i]==winarr[i+6]&&winarr[i]==winarr[i+9]&&winarr[i]==winarr[i+12]){
        //         console.log('win1',winarr[i],i)
        //     }

        //      if(i==0 && winarr[i]==winarr[i+3+1]&&winarr[i]==winarr[i+6+2]&&winarr[i]==winarr[i+10]&&winarr[i]==winarr[i+12]){
        //         console.log('win2',i)
        //     }

        //     if(i==2 && winarr[i]==winarr[i+2]&&winarr[i]==winarr[i+4]&&winarr[i]==winarr[i+8]&&winarr[i]==winarr[i+12]){
        //         console.log('win3',i)
        //     }

        //     if(i==1 && winarr[i]==winarr[i+3]&&winarr[i]==winarr[i+6]&&winarr[i]==winarr[i+9]&&(winarr[i]==winarr[i+12-1]||winarr[i]==winarr[i+12+1])){
        //         console.log('win4',i)
        //     }

        // }
        const arr=[]

        for(let j=0;j<this.winLines.length;j++){
            let win=true
            let cnt=0
            
            for(let i=0;i<this.winLines[j].length;i++){
                if(this.winarr[this.winLines[j][0]]!=this.winarr[this.winLines[j][i]]){
                    win=false
                    break
                    
                }
            
            }
            if(win){
                console.log('win',this.winLines[j])
                arr.push(this.winLines[j])
            }
        }
        if(arr.length>0){
        this.animateWin(0.6,arr,100)}
        //this.animateWin(1)
        //console.log(this.winarr)

    }

    buildR(){
        this.winarr.length=0
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
        
        this.#animateBlurReel(this.arr1,this.speed)
        this.#animateBlurReel(this.arr2,this.speed)
        this.#animateBlurReel(this.arr3,this.speed)
        this.#animateBlurReel(this.arr4,this.speed)
        this.#animateBlurReel(this.arr5,this.speed)
    }


    setAlpha(val){
        this.reelContainer1.alpha=val
        this.reelContainer2.alpha=val
        this.reelContainer3.alpha=val
        this.reelContainer4.alpha=val
        this.reelContainer5.alpha=val

    }

    setWinLine(winLines,childAlpha){
        for(let i=0;i<winLines.length;i++){
            let index=winLines[i]%3
            if(winLines[i]<=2){
                console.log(i)
                this.reelContainer1.children[index].alpha=childAlpha
            }
            if(winLines[i]>2&&winLines[i]<=5){
                console.log(i)
                this.reelContainer2.children[index].alpha=childAlpha
            }
            if(winLines[i]>5&&winLines[i]<=8){
                console.log(i)
                this.reelContainer3.children[index].alpha=childAlpha
            }
            if(winLines[i]>8&&winLines[i]<=11){
                console.log(i)
                this.reelContainer4.children[index].alpha=childAlpha
            }
            if(winLines[i]>11&&winLines[i]<=14){
                console.log(i)
                this.reelContainer5.children[index].alpha=childAlpha
            }
        }
    }

    animateWin(conAlpha,winLines,childAlpha){
        this.setAlpha(conAlpha)
        console.log(winLines)
        let time=0
        winLines.forEach((winLine)=>{
            setTimeout(()=>{this.setWinLine(winLine,childAlpha)},time)
            time+=1000
            setTimeout(()=>{this.setWinLine(winLine,1)},time)
        })
        
        setTimeout(()=>{this.setAlpha(1)},time)

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

        //this.reelContainer1.alpha=0.1
        console.log('dcerbtbdfytfu,rrgweftjt',this.reelContainer1.children[0])

        //this.reelContainer1.children[0].alpha=1*100

    }






}

export default BuildSlot 