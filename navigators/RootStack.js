import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from '../components/screens/LoginPage';
import WelcomePage from '../components/screens/WelcomePage';
import DetailsPage from '../components/screens/DetailsPage';
import HomePage from '../components/screens/HomePage';
import AddUserScreen from '../components/screens/users/AddUserScreen';
import UserDetails from '../components/screens/users/UserDetails';
import EditUser from '../components/screens/users/EditUser';
import FetchData from '../components/screens/users/FetchData';
import PostOfficeDet from '../components/screens/users/PostOfficeDet';


const Stack= createNativeStackNavigator();

const RootStack =()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{headerShown: false}
        
        }initialRouteName='UserDet'
        
            >
           
                <Stack.Screen name="Login" component={LoginPage}
                options= {{
                    title: "handlesubmit"
                }}></Stack.Screen>
                <Stack.Screen name="Welcome" component={WelcomePage}/>
                <Stack.Screen name="Details" component={DetailsPage}/>
                <Stack.Screen name="Home" component={HomePage}/>
                <Stack.Screen name='UserAdd' component={AddUserScreen}/>
                <Stack.Screen name='UserDet' component={UserDetails}/>
                <Stack.Screen name='UserEdit' component={EditUser}/>
                <Stack.Screen name='FetchData' component={FetchData}/>
                <Stack.Screen name='PostDet' component={PostOfficeDet}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;