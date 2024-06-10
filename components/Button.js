import {Pressable, Text, View, StyleSheet} from 'react-native';
import React,{ useState } from 'react';

const Button=({label,onpress, color="#000088", font="#000"})=>{
  const styles= StyleSheet.create({
    Container:{
        alignContent:'center',
        width:150,
        height:70,
        justifyContent:'center',
        margin:15,
        alignSelf:'center'
    },
    button:{
        backgroundColor:{color},
        borderWidth:2,
        borderColor:'#ff3dd3',
        borderRadius:30,
        alignContent:'center',
        justifyContent:'center',
        
    },
    label:{
        FontSize:10,
        fontColor:"#000",
        padding:10,
        justifyContent:'center',
        alignContent:'center',
        textAlign:'center',
    },
});
return(  
  <View style={styles.Container}>
        <Pressable  onPress={onpress} style={styles.button}><Text style={styles.label}>{label}</Text></Pressable>
    </View>
);};
export default Button;