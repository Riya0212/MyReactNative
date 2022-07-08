import React from 'react';
import {View,Text, Button} from 'react-native';


const DetailsPage= ({navigation}) =>{
    return(

        <View style={{flex: 1, justifyContent: "center" , alignItems: "center"}}>
        <Text>Details Screen</Text>
        <View style={{margin:10}}/>

        <Button
        title='Go to Detail Screen again..'
        onPress={()=> navigation.push('Details')}/>
        <View style={{margin:20}}/>

        <Button 
        title='Go Back'
        onPress={()=> navigation.goBack()}/>
        </View>
        
            );
}

export default DetailsPage; 