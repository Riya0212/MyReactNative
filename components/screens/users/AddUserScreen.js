import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState,useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { Appbar, } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import Ionicons from 'react-native-vector-icons/Ionicons';



const AddUserScreen = ({navigation}) => {

    const [uname, setUname] = useState("");
    const [uemail, setUemail] = useState("");
    const [ucontact, setUcontact] = useState("");
    const [ustream, setUstream] = useState("");
    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [contactError, setContactError] = useState("");
    const [streamError, setStreamError] = useState("");
    const [data, setData] = useState([]);



    // useEffect(()=>{
    //     retrieveData();
    // },[]);

    // const retrieveData=async()=>{
    //     // try{
    //     //     AsyncStorage.getItem('UserData').then(value=>{
    //     //         if(value!=null){
    //     //             navigation.navigate('UserDet');
              
    //     //         }
    //     //     })
    //     // }catch(error)
    //     // {
    //     //     console.log(error);
    //     // }
    //     try{
    //         const valueString= await AsyncStorage.getItem('User');
    //         const value= JSON.parse(valueString);
    //         setData(value);
    //     }catch(error){
    //         console.log(error);
    //     }
    // }



    const handleUser = async() => {
        let user={
            uname,uemail,ucontact,ustream, key: Math.random()

        };
       
        var usernameValid = false;
        var emailValid = false;
        var contactValid = false;
        var streamValid = false;
        var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //email validation
        if (uemail.length == 0) {
            setEmailError("Email Cannot be Empty");
        }
        // else if(email.indexOf(' ')=0){
        //   setEmailError("Email cannot contain white space");
        // }
        else if (reg.test(uemail) === false) {
            setEmailError("Invalid Email");
        } else {
            setEmailError("")
            emailValid = true
        }

        //username valid
        if (uname.length == 0) {
            setNameError("Username cannot be empty");
        }
        else if (uname.indexOf(' ') >= 0) {
            // setNameError("Username cannot contain white spaces");
        }
        else {
            setNameError("")
            usernameValid = true
        }
        //contact valid
        if (ucontact.length == 0) {
            setContactError("Contact cannot be empty");
        }
        else if (ucontact.length!=10) {
            setContactError("Invalid contact");
        }
        else {
            setContactError("")
            contactValid = true
        }

        //stream valid
        if (ustream.length == 0) {
            setStreamError("Stream cannot be empty");
        }
        else if (ustream.indexOf(' ') >= 0) {
            setStreamError("Stream cannot contain white spaces");
        }
        else {
            setStreamError("")
            streamValid = true
        }

        if (usernameValid && emailValid && contactValid && streamValid) {
            
            

            // try{
            //     let user={
            //         Name: uname,
            //         Email: uemail,
            //         Stream: ustream,
            //         Contact: ucontact
            //     }
            //     await AsyncStorage.setItem('UserData', JSON.stringify(user));
            //     navigation.navigate('UserDet');
            // }catch(error){
            //     console.log(error);
            // }
            

            
            const arrData= [user];
            const storedData= await AsyncStorage.getItem('user');
            const storedDataParsed= JSON.parse(storedData);
            setData(storedDataParsed);
          //  await AsyncStorage.setItem('user', JSON.stringify(arrData));

            let newData=[];
            if(storedData===null){
                await AsyncStorage.setItem('user', JSON.stringify(arrData));
            }else{
                newData=[...storedDataParsed,user];
                await AsyncStorage.setItem('user',JSON.stringify(newData));

    
            }
            Keyboard.dismiss();
        
            //Alert.alert(storedDataParsed);
            Alert.alert("User Added Successfully");
            setUname("");
            setUemail("");
            setUcontact("");
            setUstream("");
            navigation.navigate('UserDet');
        }   
        }
    
    return (
        <View style={styles.container}>
            <View>
                <Appbar
                    style={styles.appbar}>
                        {/* <TouchableOpacity 
                        
                        
                        onPress={()=>navigation.goBack()}><Text>Go Back</Text></TouchableOpacity> */}
                        <Icon name={'arrow-back'} color="white" backgroundColor={"transparent"}
                         size={30} onPress={() => navigation.goBack()}/>
                        <Appbar.Content title="Add User Details"/>
        
                   
                </Appbar>
            </View>
            <View style={{ marginTop: "30%", marginLeft: "6%" }}>
                <TextInput
                    keyboardType="default"


                    onChangeText={(value) => setUname(value)}
                    style={styles.input}
                    value={uname}
                    placeholder='Enter Username'>

                </TextInput>

                {nameError.length > 0 && <Text style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: 12,
                    marginLeft: 10
                }}>{nameError}</Text>}

                <View style={{ margin: 10 }} />
                <TextInput


                    onChangeText={(value) => setUemail(value)}
                    style={styles.input}
                    keyboardType="email-address"
                    value={uemail}
                    placeholder='Enter Email'>

                </TextInput>

                {emailError.length > 0 && <Text style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: 12,
                    marginLeft: 10
                }}>{emailError}</Text>}

                <View style={{ margin: 10 }} />

                <TextInput
                    onChangeText={(value) => setUcontact(value)}
                    style={styles.input}
                    value={ucontact}
                    keyboardType="number-pad"
                    placeholder='Enter Your Contact'>

                </TextInput>

                {contactError.length > 0 && <Text style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: 12,
                    marginLeft: 10
                }}>{contactError}</Text>}

                <View style={{ margin: 10 }} />

                <TextInput
                    onChangeText={(value) => setUstream(value)}
                    style={styles.input}
                    value={ustream}
                    keyboardType="default"
                    placeholder='Enter Your Stream'>

                </TextInput>

                {streamError.length > 0 && <Text style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: 12,
                    marginLeft: 10

                }}>{streamError}</Text>}




                <View style={{ margin: 20 }} />


                <TouchableOpacity
                    style={styles.btn}
                    onPress={handleUser}>
                    <Text style={{
                        color: "white",
                        alignItems: "center", fontSize: 20,
                        fontWeight: "bold",

                    }}>SUBMIT</Text>
                </TouchableOpacity>



            </View>

        </View>

    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems:"center",
        // justifyContent:"center"
    },
    appbar: {
        position: "absolute",
        top: 0,
        left: 0,
        elevation: 0,
        right: 0,
        backgroundColor: "#091361",

    },
    input: {
        borderColor: "black",
        borderWidth: 1,
        width: 340,
        padding: 10,
        fontSize: 16,
        alignItems: "center",
        // height: 40,
        borderRadius: 20,
        backgroundColor: "#e6e7ed"
    },

    btn: {
        borderColor: "black",
        borderWidth: 1,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        marginLeft: "35%",
        backgroundColor: "#091361"

    }
})


export default AddUserScreen;