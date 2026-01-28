import Initializer from "./src/intializer.js";
import BuildEnvo from "./src/BuildEnvo.js";


const app=await Initializer.intiailzeApp()

const buildEnvo=new BuildEnvo(app)
buildEnvo.buildEnvo()

