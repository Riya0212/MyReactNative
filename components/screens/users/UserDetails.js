import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Appbar, Button, Divider, Card, Title, Subheading } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import Icon from 'react-native-vector-icons/Ionicons';


const UserDetails = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [uname, setUname] = useState("");
    const [uemail, setUemail] = useState("");
    const [ucontact, setUcontact] = useState("");
    const [ustream, setUstream] = useState("");


    useEffect(() => {
        retrieveData();
    });


    const removeData= async id=>{
        if (data !== null) {
            const newData = data.filter((_, index) => index !== id);
            setData(newData);
            await AsyncStorage.setItem('user', JSON.stringify(newData));
            Alert.alert('User Removed');
          }
       
      
    }

   

    const retrieveData = async () => {

        try {
            const valueString = await AsyncStorage.getItem('user');
            const value = JSON.parse(valueString);
            setData(value);
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <SafeAreaView style={styles.container}>

            <View>
                <Appbar
                    style={styles.appbar}>
                    <Appbar.Content title="User Record" />


                    <TouchableOpacity style={styles.btn} 
                    onPress={()=>navigation.navigate('FetchData')}><Text style={{
                        fontWeight:"bold",
                        color:"black"
                    }}>PRESS ME</Text></TouchableOpacity>
                    <Icon style={{ margin: 10 }}

                        name='person-add' size={30} color="white" onPress={() => navigation.navigate('UserAdd')} />
                </Appbar>
            </View>

            <ScrollView style={{ marginTop: "20%" }}>
                {
                    data !== null ? data.map((item, index) => {
                        return (
                            <Card style={styles.card}>
                                <View key={index}></View>

                                <Card.Content><Title style={{ margin: 0 }}>Name: {item.uname}</Title></Card.Content>

                                <Card.Content><Text>Email: {item.uemail}</Text></Card.Content>
                                <Card.Content><Text>Contact: {item.ucontact}</Text></Card.Content>
                                <Card.Content><Text>Stream: {item.ustream}</Text></Card.Content>
                                <View style={{ flexDirection: "row",justifyContent:"space-between" }}>
                                    <Card.Actions>
                                        <TouchableOpacity style={styles.upbtn}
                                       // onPress={changeData}
                                          onPress={()=> navigation.navigate('UserEdit', {
                                            uname:item.uname,
                                            ucontact:item.ucontact,
                                            uemail:item.uemail,
                                            ustream:item.ustream,
                                            key1:index
                                          })}
                                       >
                                            <Text 
                                            center
                                            style={{fontWeight:"bold",fontSize:14,color:"black",alignSelf:"center"
                                        }}>UPDATE</Text></TouchableOpacity>
                                    </Card.Actions>
                                    <Card.Actions>
                                        <TouchableOpacity style={styles.rembtn}
                                        onPress={()=> removeData(index)}>
                                            <Text 
                                            center
                                            style={{fontWeight:"bold",fontSize:14,color:"white", alignSelf:"center"
                                        }}>REMOVE</Text></TouchableOpacity>
                                    </Card.Actions>

                                </View>

                            </Card>

                        )
                    }) : <View style={{alignContent:"center",alignItems:"center"}}>
                        <Text style={{fontWeight:"bold"}}>THERE IS CURRENTLY NO RECORD!</Text></View>
                }
            </ScrollView>

            {/* <ScrollView style={{marginTop:'30%' }}>
            {
                    data!==null ? data.map((item,index)=>{
                        return(
                            
                            <View key={index}>
                            <View >
                                <Text>{index+1}.</Text>
                                <View>
                                    <Text>{item.uname}</Text>
                                    <Text>{item.uemail}</Text>
                                    <Text>{item.ucontact}</Text>
                                    <Text>{item.ustream}</Text>
                                </View>
                            </View>
                            </View>
                            
                        );
                    })
                    :null
                }
            </ScrollView> */}






        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    appbar: {
        position: "absolute",
        top: 0,
        left: 0,
        elevation: 0,
        right: 0,
        backgroundColor: "#091361",

    },
    btn: {
        borderColor: "black",
        borderWidth: 1,
        width: 80,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        marginRight: "15%",
        backgroundColor: "white"

    },
    card: {
        margin: 10,
        borderColor: "grey",
        borderWidth: 1,
      
    },
    upbtn: {
        width: 80,
        height: 30,
        backgroundColor: "#66ccff",
        alignContent: "center",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 1,
        padding:2
    },
    rembtn: {
        width: 80,
        height: 30,
        backgroundColor: "red",
        alignContent: "center",
        alignItems: "center",
        padding:2,
        borderColor: "black",
        borderWidth: 1
    }
})

export default UserDetails;