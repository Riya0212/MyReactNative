import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from "react-native-paper";



const WelcomePage = ({ navigation }) => {
  const [name, setName] = useState("");
  const route= useRoute();
  //const {name}= route.params;

   
  useEffect(()=>{
    getData();
},[]);


const getData=()=>{
    try{
        AsyncStorage.getItem('Username').then(value=>{
            if(value!=null){
                setName(value);
            }
        })
    }catch(error){
        console.log(error);
    }
}


  const setData=async()=>{
    if(name.length==0){
      Alert.alert("Warning","Please write your name.");
    }else{
      try{
        await AsyncStorage.setItem('Username',name);
        navigation.navigate('Home');
      }catch(error){
        console.log(error);
      }
    }
  }
  return (
    <View
      style={{

        padding: 20
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "black", justifyContent: "center" }}>Hello {route.params.fname + " " + route.params.lname}!</Text>
      </View>
      <View style={{ margin: 10 }} />

      <Text style={styles.textStyle}> Your Firstname: {route.params.fname}</Text>
      <Text style={styles.textStyle} > Your Lastname: {route.params.lname}</Text>
      <Text style={styles.textStyle}> Your Email: {route.params.email}</Text>
      <Text style={styles.textStyle}> Your Password: {route.params.password}</Text>
      <Text style={styles.textStyle}> Your Gender: {route.params.gen}</Text>
      <Text style={styles.textStyle}> Your City Residence: {route.params.place}</Text>

      <View style={{ margin: 10 }} />
      <View>
      <TextInput

        placeholder="Enter Your Name"
        onChangeText={(value) => setName(value)}
        center
        value={name}
        underlineColorAndroid={"transparent"}
        style={{

          borderColor: "black",
          borderWidth: 1,
          width: 350,
          height: 50,

        }}></TextInput>
        </View>




      <View style={{ margin: 10 }} />

      <Button title='SUBMIT'
        onPress={setData}></Button>
      <View style={{ margin: 10 }} />

      <Button title='Go to Details Screen'
        onPress={() => navigation.navigate('Details')} />
    </View>
  );
};


const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18, color: "black", justifyContent: "center"

  }
})

export default WelcomePage;