import Color from '../../Constants/Color'
import {Platform } from 'react-native';
import {heightScale, width} from "../../Utilities/Utils"

export const getStyleProps=(theme)=>{
    return {
        Container:{
            backgroundColor:Color[theme]['Main_BackGround'],
            flex:1,
            // height:'100%',
            alignItems:"center"
        },
}
}