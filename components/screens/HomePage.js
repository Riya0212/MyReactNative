import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
const HomePage = ({ navigation }) => {


    const [name, setName] = useState("");

    
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

    const removeData = async () => {
       
        try {
            
            await AsyncStorage.clear();

            navigation.navigate('Login');

        } catch (error) {
            console.log(error);
        }

    };

    const updateData = async () => {
        if (name.length == 0) {
            Alert.alert("Warning", "Please Enter Your Name ");
        } else {
            try {
                await AsyncStorage.mergeItem('Username', name);
                Alert.alert("Your Data has been updated successfully.");
               // navigation.navigate({'name':name})

            } catch (error) {
                console.log(error);
            }
        }
    };




    return (
        <View style={styles.container}>
            <Text style={styles.txt}>Welcome {name}!

            </Text>
            <View style={{ margin: 20 }} />


            <TextInput
                placeholder="Enter Your Name"
                onChangeText={(value) => setName(value)}
                value={name}
                center
                style={{
                    padding: 10,
                    borderColor: "black",
                    borderWidth: 1,
                    width: 350,
                    height: 50,

                }}></TextInput>
            <View style={{ margin: 10 }} />

            <Button title='UPDATE'
                onPress={updateData}></Button>
            <View style={{ margin: 10 }} />

            <Button title='REMOVE'
                onPress={removeData}></Button>
            <View style={{ margin: 10,backgroundColor:"red" }} />

            <Button
                title='Go Back'
                onPress={() => navigation.goBack()} />



        </View>


    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: "center",
        alignItems: "center"
    },
    txt: {
        fontSize: 20,
        color: "red",
        fontWeight: "bold"
    }
});


export default HomePage;