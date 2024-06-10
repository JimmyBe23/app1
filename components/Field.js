import {Text,View, TextInput,StyleSheet} from 'react-native';
import { useState } from 'react'; 

export default function TextIn({value, placeHolder, ValueChange,secure=false }){
    return(
        <TextInput
         style={styles.field} 
         placeholder={placeHolder} 
         value={value} 
         onChangeText={ValueChange}
         secureTextEntry={secure}
         editable={true}/>
    )
};const width=200;

const styles=StyleSheet.create({
    
    field:{
        width:width,
        height:40,
        borderWidth:0,
        borderColor:"#000",
        fontSize:width/6,
        textAlign:"center",
        margin:10,
        textShadowColor:"#aaa"
    }
})