import AssetLoader from "./AssetLoader.js";
import Transitions from "./transition.js";
import Account from "./Account.js";
class BuildEnvo{
    constructor(app){
        this.loader=new AssetLoader()
        this.app=app
        this.transit=new Transitions()

        this.Account=new Account()
        this.val=20
        this.texture=[]
        
        this.frameContainer=new PIXI.Container()
        this.playButtonContainer=new PIXI.Container()
        this.settingContainer=new PIXI.Container()
        this.bgContainer=new PIXI.Container()
        this.stakePanelContainer=new PIXI.Container()
        this.introContainer=new PIXI.Container()
        this.blanceContainer=new PIXI.Container()
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
            ,'../Assets/introScreen/assets/prePlayBtn_hover.png',


            '../Assets/gamePanel/newPanel/assets/plusIcon_normal.png',
            '../Assets/gamePanel/newPanel/assets/plusIcon_hover.png',
            '../Assets/gamePanel/newPanel/assets/plusIcon_down.png',
            '../Assets/gamePanel/newPanel/assets/plusIcon_disabled.png',

            '../Assets/gamePanel/newPanel/assets/minusIcon_normal.png',
            '../Assets/gamePanel/newPanel/assets/minusIcon_hover.png',
            '../Assets/gamePanel/newPanel/assets/minusIcon_down.png',
            '../Assets/gamePanel/newPanel/assets/minusIcon_disabled.png',


            
            
            


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

    #buildFrame(){

        this.frameBgSprite=new PIXI.Sprite(this.texture['../Assets/reelFrame/assets/reelFrameBG.png'])
        this.frameSprite=new PIXI.Sprite(this.texture['../Assets/reelFrame/assets/reelframe.png'])


        this.frameBgSprite.anchor.set(0.5)
        this.frameSprite.anchor.set(0.5)


        this.frameContainer.addChild(this.frameBgSprite,this.frameSprite)
        this.frameContainer.position.set(100,100)

        this.gameContainer.addChild(this.frameContainer)
        this.frameContainer.scale.set(0.5)
        console.log(this.bgContainer)
        this.frameContainer.position.set(this.bgContainer.getLocalBounds().maxX/2,(this.bgContainer.getLocalBounds().maxY/2)-50)
    }

    #buildButton(val){
        const buttonSprite=new PIXI.Sprite(this.texture[val])
        buttonSprite.anchor.set(0.5)
        return buttonSprite

    }



    #buildPlayPanel(){
        this.spinButton=this.#buildButton('../Assets/gamePanel/newPanel/assets/spineBtn_main_normal.png')
        
        this.quickSpinButton=this.#buildButton('../Assets/gamePanel/newPanel/assets/menu_quickSpin_normal.png')

        this.autoSpinButton=this.#buildButton('../Assets/gamePanel/newPanel/assets/menu_autospin_normal.png')

        


        this.transit.hoverTransition(this.spinButton,this.texture['../Assets/gamePanel/newPanel/assets/spineBtn_main_hover.png'],this.texture['../Assets/gamePanel/newPanel/assets/spineBtn_main_normal.png'])


        this.transit.hoverTransition(
            this.quickSpinButton,this.texture['../Assets/gamePanel/newPanel/assets/menu_quickSpin_hover.png'],this.texture['../Assets/gamePanel/newPanel/assets/menu_quickSpin_normal.png']
        )

        this.transit.hoverTransition(this.autoSpinButton,this.texture['../Assets/gamePanel/newPanel/assets/menu_autospin_hover.png'],this.texture['../Assets/gamePanel/newPanel/assets/menu_autospin_normal.png'])


    
        this.spinButton.position.set(0)
        this.quickSpinButton.position.set(-this.spinButton.width,0)
        this.autoSpinButton.position.set(this.spinButton.width,0)


        const loaclBounds=this.playButtonContainer.getLocalBounds()

        this.playButtonContainer.scale.set(0.5)
        this.playButtonContainer.pivot.set(loaclBounds.maxX+loaclBounds.minX/2,loaclBounds.maxY+loaclBounds.minY/2)
        this.playButtonContainer.position.set(this.bgContainer.getLocalBounds().maxX/2,(this.bgContainer.getLocalBounds().maxY/2)+250)




        this.playButtonContainer.addChild(this.quickSpinButton)
        this.playButtonContainer.addChild(this.spinButton)
        this.playButtonContainer.addChild(this.autoSpinButton)
        
        this.gameContainer.addChild(this.playButtonContainer)
    }


    #buildSettingPanel(){
        this.soundButton=this.#buildButton('../Assets/gamePanel/newPanel/assets/soundOnIcon_normal.png')



        this.seetingButton=this.#buildButton('../Assets/gamePanel/newPanel/assets/menu_settings_normal.png')

        
            this.transit.hoverTransition(this.soundButton,this.texture['../Assets/gamePanel/newPanel/assets/soundOnIcon_down.png'],this.texture['../Assets/gamePanel/newPanel/assets/soundOnIcon_normal.png'],this.texture['../Assets/gamePanel/newPanel/assets/soundOffIcon_down.png'],this.texture['../Assets/gamePanel/newPanel/assets/soundOffIcon_normal.png'],BuildEnvo.sound)


        this.transit.hoverTransition(this.seetingButton,this.texture['../Assets/gamePanel/newPanel/assets/menu_settings_down.png'],this.texture['../Assets/gamePanel/newPanel/assets/menu_settings_normal.png'])


        BuildEnvo.sound=this.transit.clickTransition(this.soundButton,this.texture['../Assets/gamePanel/newPanel/assets/soundOnIcon_normal.png'],this.texture['../Assets/gamePanel/newPanel/assets/soundOffIcon_normal.png'],BuildEnvo.sound)


        
        this.seetingButton.position.set(this.soundButton.width+20,0)

        this.settingContainer.addChild(this.soundButton)
        this.settingContainer.addChild(this.seetingButton)


        
        
        //this.settingContainer.pivot.set(this.settingContainer.getLocalBounds().maxX,0)
        this.settingContainer.position.set(this.gameContainer.width,this.settingContainer.height/2)
        this.settingContainer.scale.set(0.5)
        this.gameContainer.addChild(this.settingContainer)
    }


    #buildStakePanel(){
        this.incStake=this.#buildButton('../Assets/gamePanel/newPanel/assets/plusIcon_normal.png',)
        this.deccStake=this.#buildButton('../Assets/gamePanel/newPanel/assets/minusIcon_normal.png',)
        this.stake=new PIXI.Text({
            text:`$${this.val}\n stake`,
            style:{
                fontSize:70,
                fontFamily:'Arial',
                fill:0xffffff,
                fontWeight:500,
                align:'center'
            },
            
        })

        this.incState={value:true}
        this.deccState={value:true}

        this.incStake.eventMode='static'
        this.deccStake.eventMode='static'


        this.transit.hoverTransition(this.incStake,this.texture['../Assets/gamePanel/newPanel/assets/plusIcon_down.png'],this.texture['../Assets/gamePanel/newPanel/assets/plusIcon_normal.png'],this.texture['../Assets/gamePanel/newPanel/assets/plusIcon_disabled.png'],this.texture['../Assets/gamePanel/newPanel/assets/plusIcon_disabled.png'],this.incState)

        this.transit.hoverTransition(this.deccStake,this.texture['../Assets/gamePanel/newPanel/assets/minusIcon_down.png'],this.texture['../Assets/gamePanel/newPanel/assets/minusIcon_normal.png'],this.texture['../Assets/gamePanel/newPanel/assets/minusIcon_disabled.png'],this.texture['../Assets/gamePanel/newPanel/assets/minusIcon_disabled.png'],this.deccState)


        this.incStake.on('pointerdown',()=>{
             if(this.val+20>=100||this.val>=100){this.incStake.texture=this.texture['../Assets/gamePanel/newPanel/assets/plusIcon_disabled.png']
                this.incState.value=false
             }
            if(this.val>=100)return
           
            this.val+=20
            this.stake.text=`$${this.val}\n stake`
            this.deccState.value=true
            
            if(this.val>=20)this.deccStake.texture=this.texture['../Assets/gamePanel/newPanel/assets/minusIcon_normal.png']
            
        })
        this.deccStake.on('pointerdown',()=>{
            if(this.val-20<=0||this.val<=0){
                this.deccStake.texture=this.texture['../Assets/gamePanel/newPanel/assets/minusIcon_disabled.png']
                this.deccState.value=false
            }
            if(this.val<=0)return
            
            this.val-=20
            this.stake.text=`$${this.val}\n stake`
            this.incState.value=true
            //this.Account.decreaseBalnce(this.val)
            if(this.val<=80)this.incStake.texture=this.texture['../Assets/gamePanel/newPanel/assets/plusIcon_normal.png']
            
        })


        this.stake.anchor.set(0.5)

        this.stake.position.set(this.incStake.width+100,0)
        this.deccStake.position.set(this.stake.x+this.deccStake.width+100,0)

        console.log("csdcfcsdcsdc",this.incStake,"csdcscs")

        this.stakePanelContainer.addChild(this.incStake,this.deccStake,this.stake)

        this.stakePanelContainer.position.set(this.gameContainer.width,this.gameContainer.height-30)

        this.stakePanelContainer.scale.set(0.3)
        this.gameContainer.addChild(this.stakePanelContainer)



    }


    #buildAccountPanel(){
        this.Balance=new PIXI.Text({
            text:`$${this.Account.getBalance()}\nBalance`,
            style:{
                fontSize:20,
                fontFamily:'Arial',
                fill:0xffffff,
                fontWeight:500,
                align:'center'
            },
        })

        this.blanceContainer.addChild(this.Balance)

        this.blanceContainer.position.set(100,this.gameContainer.height-60)

        this.gameContainer.addChild(this.blanceContainer)
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
            this.bgContainer.removeChild(this.introContainer)
            this.bgContainer.removeChild(this.textSprite)
            this.#buildGame()
            this.bgContainer.addChild(this.gameContainer)
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
    #buildGame(){
            //this.#buildBg()
            this.#buildText(150,200,this.gameContainer)
            this.#buildFrame()
            this.#buildPlayPanel()
            this.#buildSettingPanel()
            this.#buildStakePanel()
            this.#buildAccountPanel()
    }
    async buildEnvo(){
        await this.#loadAsset()
        
        
            
            this.#buildIntro()
            //this.screenContainer.addChild(this.bgContainer)
        
        
    }

}

export default BuildEnvo