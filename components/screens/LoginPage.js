import { values } from 'lodash';
import React, { useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, View, StyleSheet, TextInput, Modal} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Checkbox, RadioButton } from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginPage = () => {
  const navigation=useNavigation();

  const [gender, setGender] = useState("");
 
  const data=[
    {
      label: "Anand", value: "Anand"
    },
    {
      label: "Ahemdabad", value: "Ahemdabad"
    },
    {
      label: "Surat", value: "Surat"
    },
    {
      label: "Vadodra", value: "Vadodra"
    }, {
      label: "Maninagar", value: "Maninagar"
    },
    {
      label: "Mehdavad", value: "Mehdavad"
    },
    {
      label: "Gandhinagar", value: "Gandhinagar"
    },

  ];
  const [city, setCity] = useState("");
  const [focus,setFocus]=useState(false);


  const setData=async()=>{
    if(firstname.length==0){
      Alert.alert("Warning","Please Enter Your Name ");
    }else{
      try{
        await AsyncStorage.setItem('Username',firstname);
  
        navigation.navigate("Home");
        
      }catch(error){
        console.log(error);
      }
    }
  };

  //const[radiobtn,setRadioBtn]= useState(radiobtnData);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirm, setConfirmpass] = useState("");
  const [confirmError, setConfirmpassError] = useState("");


  const handleSubmit = () => {
    var firstnameValid = false;
    var lastnameValid = false;
    var emailValid = false;
    var passwordValid = false;
    var confirmValid = false;
    var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //email validation
    if (email.length == 0) {
      setEmailError("Email Cannot be Empty");
    }
    // else if(email.indexOf(' ')=0){
    //   setEmailError("Email cannot contain white space");
    // }
    else if (reg.test(email) === false) {
      setEmailError("Invalid Email");
    } else {
      setEmailError("")
      emailValid = true
    }

    //password validation
    if (password.length == 0) {
      setPasswordError("Password cannot be empty");
    }
    else if (password.length < 6) {
      setPasswordError("Password cannot be less than 6 characters");
    }
    else {
      setPasswordError("")
      confirmValid = true;
    }

    //confirmpassword validation
    if (confirm.length == 0) {
      setConfirmpassError("Password cannot be empty");
    }
    else if (confirm.length < 6) {
      setConfirmpassError("Password cannot be less than 6 characters");
    } else if (confirm != password) {
      setConfirmpassError("Your Confirm Password does not match")
    }
    else {
      setConfirmpassError("")
      passwordValid = true;
    }

    //firstname validation
    if (firstname.length == 0) {
      setFirstnameError("Firstname cannot be empty");
    }
    else if (firstname.indexOf(' ') >= 0) {
      setFirstnameError("Firstname cannot contain white spaces");
    }
    else {
      setFirstnameError("")
      firstnameValid = true
    }

    //lastname validation
    if (lastname.length == 0) {
      setLastnameError("Lastname cannot be empty");
    }
    else if (lastname.indexOf(' ') >= 0) {
      setLastnameError("Lastname cannot contain white spaces");
    } else {
      setLastnameError("");
      lastnameValid = true;
    }


    if (emailValid && firstnameValid && lastnameValid && passwordValid && confirmValid) {
      navigation.navigate('Welcome',
      {
      'fname': firstname,
      'lname':lastname,
      'email':email,
      'password':password,
      'gen':gender,
      'place':city});

    //   alert('Username: ' + firstname + ' ' + lastname + '\nEmail: ' + email + '\nPassword: '
    //     + password + '\nGender:' + gender + '\nCity Residence: ' + city);
    //   setEmail("");
    //   setFirstname("");
    //   setLastName("");
    //   setPassword("");
    //   setConfirmpass("");
    //   setGender("");
    //   setCity("");
    // }



  }
}



  return (

    
      <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Login Page UI</Text>
      </View>

      <View style={styles.viewInput}>
        <TextInput style={styles.textInput}
          placeholder="Enter your Firstname"
          placeholderStyle={styles.placeStyle}
          keyboardType="default"
          returnKeyType="next"
          onChangeText={(text) => setFirstname(text)}
          value={firstname}
          onSubmitEditing={() => { this.lastname.focus(); }}
          blurOnSubmit={false}
        />
        <View style={{ paddingLeft: 10 }}>
          {firstnameError.length > 0 && <Text style={{
            color: "red",
            fontWeight: "bold",
            fontSize: 12
          }}>{firstnameError}</Text>}
        </View>



      </View>
      <View style={{ marginTop: 20 }}></View>
      <View style={styles.viewInput}>
        <TextInput style={styles.textInput}
          placeholder="Enter your Lastname"
          returnKeyType="next"
          ref={(input) => { this.lastname = input; }}
          onSubmitEditing={() => { this.email.focus(); }}
          blurOnSubmit={false}
          placeholderStyle={styles.placeStyle}

          //placeholderTextColor="white"
          keyboardType="default"
          onChangeText={(lastname) => setLastName(lastname)}
          value={lastname}
        />
        <View style={{ paddingLeft: 10 }}>
          {lastnameError.length > 0 && <Text style={{
            color: "red",
            fontWeight: "bold",
            fontSize: 12
          }}>{lastnameError}</Text>}
        </View>

      </View>


      <View style={{ marginTop: 20 }}></View>
      <View style={styles.viewInput}>
        <TextInput style={styles.textInput}
          placeholder="Enter your Email"
          returnKeyType="next"
          onSubmitEditing={() => { this.password.focus(); }}
          blurOnSubmit={false}
          autoCapitalize= "none"
          
          ref={(input) => { this.email = input; }}
          //placeholderTextColor="white"
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email.trim())}
          value={email}

        />

        <View style={{ paddingLeft: 10 }}>
          {emailError.length > 0 && <Text style={{
            color: "red",
            fontWeight: "bold",
            fontSize: 12
          }}>{emailError}</Text>}
        </View>

      </View>
      <View style={{ marginTop: 20 }}></View>

      <View style={styles.viewInput}>
        <TextInput style={styles.textInput}
          placeholder="Enter your Password"
          // placeholderTextColor="white"
          ref={(input) => { this.password = input; }}
          onSubmitEditing={() => { this.confirm.focus(); }}
          blurOnSubmit={false}
          returnKeyType="next"
          secureTextEntry={true}

          onChangeText={(text) => setPassword(text)}
          value={password}
        >
        </TextInput>
        <View style={{ paddingLeft: 10 }}>
          {passwordError.length > 0 && <Text style={{
            color: "red",
            fontWeight: "bold",
            fontSize: 12
          }}>{passwordError}</Text>}
        </View>
      </View>

      <View style={{ marginTop: 20 }}></View>

      <View style={styles.viewInput}>
        <TextInput style={styles.textInput}
          placeholder="Confirm Password"
          returnKeyType="done"
          ref={(input) => { this.confirm = input; }}
          //  placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmpass(text)}
          value={confirm}
        >
        </TextInput>
        <View style={{ paddingLeft: 10 }}>
          {confirmError.length > 0 && <Text style={{
            color: "red",
            fontWeight: "bold",
            fontSize: 12
          }}>{confirmError}</Text>}
        </View>
      </View>


      {/* <Checkbox
      tittle="Male"
      center
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      //onPress={genderMale}
      />
      <Checkbox
      tittle="Female"
      center
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      onPress={genderFemale}
      />

      <Checkbox
      container style={{backgroundColor: "transaparent"}}
      tittle="Other"
      center
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      //onPress={genderOther}
      />

      </View> */}



      <View style={{
        margin: 20,
        marginLeft: 30,
    
      }}>
        <View style={{
        height:30,
        backgroundColor:"#F2F4F5",
        borderRadius:20,
        borderWidth:1,
        borderColor:"grey",
        padding:5,
        width: "35%"}}>
        <Text style={{
          color: "grey",


        }}>Select Gender: </Text>
        </View>
        <RadioButton.Group
          center        
          style={{flexDirection:"row", alignContent: "space-evenly"}}
          onValueChange={newValue => setGender(newValue)}
          value={gender}
        >
          <View style={{
            flexDirection: "row",
            alignContent: "center",
            selectedTextStyle: {color:"black"}
          }}>
            <RadioButton value="Male"
              color="blue"
              style={{
                margin: 5,
              }} />
            <Text style={{
              marginTop: 7,
              justifyContent: "center",
              alignItems: "center",
              color: "grey",
              fontWeight: "bold",
              selectedTextStyle: {color: "black"}
            }}>Male</Text>

            {/* </View>

          <View style={{
            flexDirection: "row",
            alignContent: "center"
          }}> */}
            <RadioButton value="Female"
              color="blue"
              style={{
                margin: 5,

              }} />
            <Text style={{
              marginTop: 7,
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold"
            }}>Female</Text>

          </View>
        </RadioButton.Group>
        </View>
      
        <Dropdown
        style={[styles.dropdown,focus && {color: "blue"}]}
        search
        placeholder={"Select Your City"}
        placeholderStyle={{fontSize:16}}
        selectedTextStyle={{fontSize:16,color:"black"}}
        maxHeight= {300}
        inputSearchStyle={{fontSize:16, height:40}}
        data={data}
        value={city}
        valueField="value"
        labelField="label"
        searchPlaceholder="Search.."
        onFocus= {()=> setFocus(true)}
        onBlur={()=>setFocus(false)}
        onChange={item => {
          setCity(item.value);
          setFocus(false);
        }}


        ></Dropdown>

        
     


      <View>
        <TouchableOpacity style={styles.submitBtn}
          onPress={handleSubmit}>
          <Text style={styles.submitTxt}>SUBMIT</Text>

        </TouchableOpacity>
      </View>
  
      </KeyboardAwareScrollView>

  );


}
const styles = StyleSheet.create({
  container: {
    height: 50,
    padding: 10,
    backgroundColor: "#091361",
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    margin: 25,
    marginTop: '20%'

  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 20
  },
  viewInput: {
    marginStart: 30,
    backgroundColor: "#8EABF3",
    borderRadius: 20,
    width: '85%',
    height: 40,
    borderColor: "black",
    borderWidth: 0.05

  },
  textInput: {
    color: "black",
    padding: 10,

  },
  submitBtn: {
    borderColor: "white",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
    width: '85%',
    marginLeft: "8%",
    borderRadius: 20,
    backgroundColor: "#091361",
    marginBottom:50


  },
  submitTxt: {
    color: "white",
    fontWeight: "bold",
    alignContent: "center",
    justifyContent: "center"
  },
  btn: {
    borderRadius: 20,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
   marginLeft:2
   
  },
  dropdown:{
    height: 40,
    borderColor:"grey",
    borderWidth: 1,
    borderRadius: 20,
   marginStart: 30,
    width:"85%",
    padding:10
   // paddingHorizontal:20
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
   left: 22,
   top: 8,
   zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeStyle:{
    fontWeight:"bold"
  }

});

export default LoginPage;