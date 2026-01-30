import Initializer from "./src/intializer.js";
import BuildGameEnvo from "./src/BuildGameEnvo.js";
import BuildIntroEnvo from "./src/BuildIntroEnvo.js";
import BuildSlot from "./src/BuildSlot.js";



const app=await Initializer.intiailzeApp()

const buildIntroEnvo=new BuildIntroEnvo(app)

const buildGameEnvo=new BuildGameEnvo(app)

await buildIntroEnvo.buildEnvo()

// await buildGameEnvo.buildEnvo()



buildIntroEnvo.playrBtn.on('mousedown',async ()=>{
        buildIntroEnvo.destroyIntro()
        await buildGameEnvo.buildEnvo()

        const buildSlot=new BuildSlot(app,buildGameEnvo.frameContainer)

})


