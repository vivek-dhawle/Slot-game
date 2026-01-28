
class Transitions{
    hoverTransition(element,truetransitSprite,truebaseSprite,falsetransitSprite=null,falsebaseSprite=null,mode=null){
        element.eventMode='static'
        element.on('pointerover', () => {
            console.log(mode,falsetransitSprite)
            if (mode&&falsetransitSprite){
                element.texture=mode.value?truetransitSprite:falsetransitSprite;
            } else {
                element.texture=truetransitSprite;
            }
        });

        element.on('pointerout', () => {
            if (mode&&falsebaseSprite){
                element.texture=mode.value?truebaseSprite:falsebaseSprite;
            } else {
                element.texture=truebaseSprite;
            }
        });
    }

    clickTransition(element,trueMode,falseMode,mode){
        element.eventMode='static'
        element.on('mousedown',(e)=>{
            if(mode.value){
                element.texture=falseMode
            }
            else{
                element.texture=trueMode
            }
            console.log(mode)
            mode.value=!mode.value
            
        })
    }



}

export default Transitions