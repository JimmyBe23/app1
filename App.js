import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,FlatList,SafeAreaView, ScrollView, Pressable,pythonBridge } from 'react-native';
import { useState } from 'react';
import TextIn from './components/Field';
import Button from './components/Button';
import StaticServer from 'react-native-static-server';
// 'use strict';
// let assert=require('assert');

export default function App() {

pythonBridge('import * from API.main') ;

  const [username, getUser]=useState("");
  const [lastName, getLast]=useState("");
  const [item,getItem]=useState("");
  const [price,getPrice]=useState(0);
  const [login, setLogin]=useState(false);
  const [access, getAccess]=useState(false);
  const [giveaccess,giveAccess]=useState(false);
  const [showData,show]=useState(false);
  const [user, getuser]=useState("");
  const [pass,getPass]=useState("");
  const [logUser,getLogUser]=useState("");
  const [logPass,getLogPass]=useState("");
  const [data,getData]=useState([{"Name":"ahhhh","Price":3,"LastName":"gg","Date":"today", "ItemSold":"NA"}]);

  return (
    <View style={styles.container}>
      {(login ) ? (
      showData===false?(
      <View>
      <TextIn placeHolder="Name" ValueChange={getUser} value={username}/>
      <TextIn placeHolder="lastName" ValueChange={getLast} value={lastName}/>
      <TextIn placeHolder="itemSold" ValueChange={getItem} value={item}/>
      <TextIn placeHolder="Price" ValueChange={getPrice} value={price}/>  
      <Button label="Add" onpress={()=>{
        params = {
          "Name": username,
          "LastName": lastName,
          "ItemSold":item,
          "Price":Number(price)
                  };
        
        fetch("http://127.0.0.1:8000/data", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        })
      }
      }/>  
      <Button label="Get" onpress={()=>{
        fetch("http://127.0.0.1:8000/data").then(response=>response.json()).then((json)=>{getData(json)});
       {show(true)}
     
      }}/> 
      </View>):(
        <SafeAreaView>
        <View>
          <ScrollView>
        <View style={{
          flex:1,
          backgroundColor:"#eee",
          }}>
            
              
            <FlatList data={data} renderItem={({item}) => <View style={styles.block}><Pressable style={{border:4,borderColor:"#ff0000"}}><Text style={styles.textBlock}>{item.Name} {item.LastName}</Text>
            <Text style={{fontSize:15}}>{item.ItemSold}  {item.Price}</Text>
            <Text style={{fontSize:10, textAlign:"right"}}>{item.Date}</Text></Pressable>
            </View>} /> 
         </View>
         </ScrollView>
          <View>
          <Button label="Back" onpress={()=>{
show(false);
          }}/></View></View>
        </SafeAreaView>
      )) :(
        <View>
        {(access===false && giveaccess ===false)? (
        <View>
          <Text style={{color:"#000"}}>Do you have access to this app?</Text>
        <View style={styles.ynButtons}>
          <Button label="yes" onpress={() =>{getAccess(true)}}/>
          <Button label="no" onpress ={() =>{getAccess(false); giveAccess(true)}}/>
        </View>
        </View>):(
          <View>{giveaccess ? (
            <View>
            <TextIn placeHolder="username" ValueChange={getuser} value={user}/>
            <TextIn placeHolder="Password" ValueChange={getPass} value={pass} secure={true}/> 
            <Button label="Submit" onpress={()=>{
               params = {
                "username": user,
                "password": pass
              };
              
              fetch("http://127.0.0.1:8000/giveaccess", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
              }).then(response=>{getAccess(response);giveAccess(!response)});
;            }}/>
                 </View>    ):(
                  <View >
                    <Text style={styles.text}>Log In using your credentials</Text>
                    <TextIn ValueChange={getLogUser} placeHolder="Username" value={logUser}/>
                    <TextIn ValueChange={getLogPass} placeHolder="Password" value={logPass} secure={true}/>
                    <Button label="Log In" onpress={()=>{
                       params = {
                        "username": logUser,
                        "password": logPass
                      };
                      
                      fetch("http://127.0.0.1:8000/login", {
                        method: "POST",
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(params),
                      }).then(response => setLogin(response))
                     
                      ;
                    }}/>
                                        </View>
                 )}
         </View>)}</View>)
      
    }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    margin:10,
    textAlign:"center",
    fontSize:15
  },
  ynButtons:{
  
    alignItems:"center",

  },
  block:{
    flex:1,
    width:300,
    height:70,
    backgroundColor:"#aaa",
    margin:5,
  },  
  textBlock:{
    fontSize:20,
    color:"#000",
  },
});
