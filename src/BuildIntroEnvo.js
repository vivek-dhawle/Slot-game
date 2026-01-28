import AssetLoader from "./AssetLoader.js";
import Transitions from "./transition.js";
import BuildGameEnvo from "./BuildGameEnvo.js";
class BuildIntroEnvo{
    constructor(app){
        this.loader=new AssetLoader()
        this.app=app
        this.transit=new Transitions()

        this.texture=[]
        
        this.frameContainer=new PIXI.Container()
        this.playButtonContainer=new PIXI.Container()
        this.settingContainer=new PIXI.Container()
        this.bgContainer=new PIXI.Container()

        this.introContainer=new PIXI.Container()
        
        this.screenContainer=new PIXI.Container()

        this.screenContainer.addChild(this.bgContainer)
        this.gameContainer = new PIXI.Container();
        this.bgContainer.addChild(this.gameContainer);

        app.stage.addChild(this.screenContainer)


        this.intro={value:true}
        

    }
    
    static sound={value:true}

    async #loadAsset(){
        this.texture=await this.loader.load(['../Assets/backgrounds/assets/bg.png','../Assets/gameLogo/assets/gameLogo.png','../Assets/reelFrame/assets/reelFrameBG.png','../Assets/reelFrame/assets/reelOuterFrame.png','../Assets/gamePanel/newPanel/assets/spineBtn_main_normal.png','../Assets/gamePanel/newPanel/assets/menu_quickSpin_normal.png','../Assets/gamePanel/newPanel/assets/menu_autospin_normal.png','../Assets/gamePanel/newPanel/assets/spineBtn_main_hover.png','../Assets/gamePanel/newPanel/assets/menu_autospin_hover.png','../Assets/gamePanel/newPanel/assets/menu_quickSpin_hover.png',

            '../Assets/reelFrame/assets/reelframe.png',

            '../Assets/gamePanel/newPanel/assets/soundOnIcon_normal.png',
            '../Assets/gamePanel/newPanel/assets/soundOnIcon_hover.png',

            '../Assets/gamePanel/newPanel/assets/menu_settings_normal.png',
            '../Assets/gamePanel/newPanel/assets/menu_settings_hover.png',

            '../Assets/gamePanel/newPanel/assets/soundOnIcon_down.png',
            '../Assets/gamePanel/newPanel/assets/soundOffIcon_normal.png'
            ,'../Assets/gamePanel/newPanel/assets/soundOffIcon_down.png',
            '../Assets/gamePanel/newPanel/assets/menu_settings_down.png',

            '../Assets/introScreen/assets/btn_arrow1.png',
            '../Assets/introScreen/assets/btn_arrow2.png',
            '../Assets/introScreen/assets/frame1.png',
            '../Assets/introScreen/assets/frame1_p.png',
            '../Assets/introScreen/assets/frame2.png',
            '../Assets/introScreen/assets/frame2_p.png',
            '../Assets/introScreen/assets/loadingTxt.png',
            '../Assets/introScreen/assets/logo.png',
            '../Assets/introScreen/assets/pager_base.png',
            '../Assets/introScreen/assets/pager_marker.png',
            '../Assets/introScreen/assets/prePlayBtn_disabled.png',
            '../Assets/introScreen/assets/prePlayBtn_down.png'
            ,'../Assets/introScreen/assets/prePlayBtn_normal.png'
            ,'../Assets/introScreen/assets/prePlayBtn_hover.png'


            
            
            


        ])
        console.log(this.texture)
    }

    #buildBg(){
        
        this.bg=new PIXI.Sprite(this.texture['../Assets/backgrounds/assets/bg.png'])
        
        this.bg.scale.set(0.6)

        this.bgContainer.height=this.app.screen.height
        this.bgContainer.width=this.app.screen.width


        this.bgContainer.addChild(this.bg)
    }

    #buildText(x,y,container){
        
        this.textSprite=new PIXI.Sprite(this.texture['../Assets/gameLogo/assets/gameLogo.png'])
        this.textSprite.anchor.set(0.5)
        this.textSprite.scale.set(0.6)
        this.textSprite.position.set(x,y)
        container.addChild(this.textSprite)
    }

    

    #buildIntroPanel(){
        this.frame1Sprite=new PIXI.Sprite(this.texture['../Assets/introScreen/assets/frame1.png'])
        this.frame2Sprite=new PIXI.Sprite(this.texture['../Assets/introScreen/assets/frame2.png'])
        

        this.frame1Sprite.anchor.set(0.5)
        this.frame2Sprite.anchor.set(0.5)


        const loaclBounds=this.introContainer.getLocalBounds()

        this.introContainer.addChild(this.frame1Sprite)
        this.introContainer.scale.set(0.4)
        this.introContainer.pivot.set(loaclBounds.maxX+loaclBounds.minX/2,loaclBounds.maxY+loaclBounds.minY/2)

        this.introContainer.position.set(this.bgContainer.width/2,(this.bgContainer.height/2)-80)
        this.bgContainer.addChild(this.introContainer)


    }
    

    #buildIntroButton(){
        this.leftBtn=this.#buildButton('../Assets/introScreen/assets/btn_arrow1.png')
        this.rightBtn=this.#buildButton('../Assets/introScreen/assets/btn_arrow2.png')
        this.playrBtn=this.#buildButton('../Assets/introScreen/assets/prePlayBtn_normal.png')



        this.rightBtn.eventMode='static'
        this.rightBtn.on('mousedown',()=>{
            this.introContainer.removeChild(this.frame1Sprite)
            this.introContainer.addChild(this.frame2Sprite)
        })
        this.leftBtn.eventMode='static'
        this.leftBtn.on('mousedown',()=>{
            this.introContainer.removeChild(this.frame2Sprite)
            this.introContainer.addChild(this.frame1Sprite)
        })

        this.transit.hoverTransition(this.playrBtn,this.texture['../Assets/introScreen/assets/prePlayBtn_hover.png'],this.texture['../Assets/introScreen/assets/prePlayBtn_normal.png'])

        this.playrBtn.on('mousedown',()=>{
            this.intro.value=false
            const buildGameEnvo=new BuildGameEnvo(app)
            buildGameEnvo.buildEnvo()
        })




        this.introContainer.addChild(this.leftBtn,this.rightBtn,this.playrBtn)
        this.leftBtn.position.set(-this.frame1Sprite.width/2-50,0)
        this.rightBtn.position.set(this.frame1Sprite.width/2+50,0)
        this.playrBtn.position.set(0,this.frame1Sprite.height/2)
    }



    #buildIntro(){
            this.#buildBg()
            this.#buildText(this.app.screen.width/2,100,this.bgContainer)
            this.#buildIntroPanel()
            this.#buildIntroButton()
    }
    async buildEnvo(){
        await this.#loadAsset()
        
        
            
            this.#buildIntro()
            //this.screenContainer.addChild(this.bgContainer)
        
        
    }

}

export default BuildIntroEnvo