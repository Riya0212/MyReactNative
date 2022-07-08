import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import { Appbar } from "react-native-paper";

const EditUser = ({ navigation, index, route }) => {

    var place=route.params.key1;
    const [uname, setUname] = useState(route.params.uname ?route.params.uname :"");
    const [uemail, setUemail] = useState(route.params.uemail ?route.params.uemail :"");
    const [ucontact, setUcontact] = useState(route.params.ucontact ?route.params.ucontact :"");
    const [ustream, setUstream] = useState(route.params.ustream ?route.params.ustream :"");
    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [contactError, setContactError] = useState("");
    const [streamError, setStreamError] = useState("");
    const [data, setData] = useState([]);
    const [itemId, setItemId] = useState(null);

    useEffect(() => {
        //AsyncStorage.clear();
        retrieveData();
    });


    const retrieveData = async () => {

        try {
            const valueString = await AsyncStorage.getItem('user');
            const value = JSON.parse(valueString);
            setData(value);
        } catch (error) {
            console.log(error);
        }
    }


    


    // const route = useRoute();

    const updateData = async () => {

        data[itemId].uname = uname;
        data[itemId].ucontact = ucontact;
        data[itemId].uemail = uemail;
        await AsyncStorage.setItem('user', JSON.stringify(data));
        Keyboard.dismiss();

        setUname('');
        setUemail('');
        setUcontact('');
        navigation.navigate('UserDet');

    };


    const changeData = async id => {
        const changedData = data.map((item, index) => {
            if (index === id) {
                setUname(item.uname);
                setUemail(item.uemail);
                setUcontact(item.ucontact);
                setUstream(item.ustream);
            }
            return item;
        });

        setData(changedData);
        setItemId(id);
        await AsyncStorage.setItem('user', JSON.stringify(changedData));
    };

    
   
    const handleUser = async id => {
    //  console.log(ucontact,uemail,uname,ustream);
    console.log(id);
    
      let people={
        uname,uemail,ucontact,ustream

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
            setNameError("Username cannot contain white spaces");
        }
        else {
            setNameError("")
            usernameValid = true
        }
        //contact valid
        if (ucontact.length == 0) {
            setContactError("Contact cannot be empty");
        }
        else if (ucontact.length > 10) {
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

            data[place].uname= uname;
            data[place].uemail=uemail;
            data[place].ucontact=ucontact;
            data[place].ustream=ustream;
            await AsyncStorage.setItem('user', JSON.stringify(data));
           
    
          //   const arrData= [people];
           //  console.log(arrData);
        //   //  const storedData= await AsyncStorage.getItem('user');
        //    // const storedDataParsed= JSON.parse(storedData);
        //    // setData(storedDataParsed);
           //await AsyncStorage.setItem('user', JSON.stringify(arrData));
            
            //Alert.alert(storedDataParsed);
            Alert.alert("User Updated Successfully");
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
                    <Icon style={{ margin: 10 }}
                        name='arrow-back' size={25} color="white" onPress={() => navigation.goBack()} />
                    <Appbar.Content title="Edit User Details" />
                </Appbar>
            </View>


            <View style={{ marginTop: "30%", marginLeft: "6%" }}>
                <TextInput
                    keyboardType="default"
                    onChangeText={setUname}
                    style={styles.input}
                    defaultValue={route.params.uname}
                    // value={route.params.uname}
                    placeholder={'Enter User name'}>

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
                    defaultValue={route.params.uemail}
                    placeholder={'Enter User Email'}>

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
                    //value={ucontact}
                    defaultValue={route.params.ucontact}
                    editable
                    keyboardType="number-pad"
                    placeholder={'Enter User Contact'}
                >

                </TextInput>

                {contactError.length > 0 && <Text style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: 12,
                    marginLeft: 10
                }}>{contactError}</Text>}

                <View style={{ margin: 10 }} />

                <TextInput
                    onChangeText={(text) => setUstream(text)}
                    style={styles.input}
                    defaultValue={route.params.ustream}
                    //  value={route.params.ustream}
                    keyboardType="default"
                    placeholder={'Enter User Stream'}>

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
                    onPress={()=>handleUser()}>
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
});

export default EditUser;