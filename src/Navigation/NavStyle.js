import Color from '../Constants/Color'
import {heightScale, width} from "../Utilities/Utils"

export const getStyleProps=(theme='light')=>{
    return {

        tabNav:{
            backgroundColor:Color[theme]['Main_BackGround'],
        }
    
    }
}