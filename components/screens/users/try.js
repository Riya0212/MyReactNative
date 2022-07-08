import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {AddButton} from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

import styles from '../style/style';

const Tasks = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState('true');
  const [itemId, setItemId] = useState(null);

  const saveData = async () => {
    if (
      (name !== null && name !== '',
      email !== null && email !== '',
      phone !== null && phone !== '')
    ) {
      let user = {
        name,
        email,
        phone,
        key: Math.random(),
      };

      if (!validateEmail(email) || phone.length !== 10) {
        this.dropDownAlertRef.alertWithType(
          'error',
          'Error',
          'Invalid email address or phone number.',
        );
      } else {
        const arrData = [user]; // [{ name, email, phone}]

        const storedData = await AsyncStorage.getItem('user');
        const storedDataParsed = JSON.parse(storedData);
        setData(storedDataParsed);

        let newData = [];

        if (storedData === null) {
          // save
          await AsyncStorage.setItem('user', JSON.stringify(arrData));
        } else {
          newData = [...storedDataParsed, user];
          await AsyncStorage.setItem('user', JSON.stringify(newData));
        }

        Keyboard.dismiss();
        setName('');
        setEmail('');
        setPhone('');
        this.dropDownAlertRef.alertWithType(
          'success',
          'Success',
          'Task saved successfully.',
        );
      }
    } else {
      setTimeout(() => {
        this.dropDownAlertRef.alertWithType(
          'error',
          'Error',
          'Please fill all the fields',
        );
      }, 1000);

    }
  };

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
  };

  const clearData = async id => {
    if (data !== null) {
      const newData = data.filter((_, index) => index !== id);
      setData(newData);
      await AsyncStorage.setItem('user', JSON.stringify(newData));
    }
    this.dropDownAlertRef.alertWithType(
      'success',
      'Success',
      'Task removed successfully.',
    );
  };

  const highlightData = async id => {
    if (data !== null) {
      const highlightedData = data.map((item, index) => {
        if (index === id) {
          item.show = !item.show;
        }
        return item;
      });
      setData(highlightedData);
      await AsyncStorage.setItem('user', JSON.stringify(highlightedData));
    }
  };

  const changeData = async id => {
    setToggle(false);
    const changedData = data.map((item, index) => {
      if (index === id) {
        setName(item.name);
        setEmail(item.email);
        setPhone(item.phone);
      }
      return item;
    });

    setData(changedData);
    setItemId(id);
    await AsyncStorage.setItem('user', JSON.stringify(changedData));
  };

  const updateData = async () => {
    setToggle(true);
    data[itemId].name = name;
    data[itemId].phone = phone;
    data[itemId].email = email;
    await AsyncStorage.setItem('user', JSON.stringify(data));
    Keyboard.dismiss();
    setName('');
    setEmail('');
    setPhone('');
    this.dropDownAlertRef.alertWithType(
      'success',
      'Success',
      'Task updated successfully.',
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={[styles.pv, styles.ph]}>
          <Text style={[styles.text, styles.pv]}>Personal details</Text>
          <TextInput
            style={[styles.pv, styles.input]}
            placeholder="Full Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={[styles.pv, styles.input]}
            placeholder="Email Address"
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={[styles.pv, styles.input]}
            placeholder="Phone"
            value={phone}
            keyboardType="phone-pad"
            onChangeText={text => setPhone(text)}
          />
          <AddButton
            title={toggle ? 'save data' : 'update changes'}
            name="add"
            onPress={toggle ? saveData : updateData}
          />
          <Text style={[styles.text, styles.pv]}>List of Individuals</Text>
          <ScrollView style={{height: '60%', paddingVertical: 10}}>
            {data !== null
              ? data.map((item, index) => {
                  const highlightColor = item.show ? 'gold' : '#e3e3e3';

                  return (
                    <View style={[styles.pv, styles.ph]} key={index}>
                      <View style={[styles.row]}>
                        <Text>{index + 1}. </Text>
                        <View>
                          <Text style={styles.btnText}>{item.name}</Text>
                          <Text style={styles.email}>{item.email}</Text>
                          <Text style={styles.email}>{item.phone}</Text>
                        </View>
                      </View>
                      <View style={[styles.row, styles.end]}>
                        <TouchableOpacity
                          onPress={() => clearData(index)}
                          style={styles.ph}>
                          <Icon name="close" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => highlightData(index)}
                          style={styles.ph}>
                          <Icon name="star" size={20} color={highlightColor} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => changeData(index)}
                          style={styles.ph}>
                          <Icon name="create" size={20} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })
              : null}
          </ScrollView>
        </View>
      </View>
      <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
    </SafeAreaView>
  );
};

Tasks.navigationOptions = navigation => ({
  title: 'Tasks',
});

const styles=StyleSheet.create({
  container:{
    flex: 1,
    
  }

});

export default Tasks;