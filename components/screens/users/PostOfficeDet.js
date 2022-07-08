import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Appbar, Divider } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";

const PostOfficeDet = ({ navigation, }) => {
    var route = useRoute();
    var postdata =  route.params.findata;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState("");
    console.log(postdata.Name);



    return (
        <SafeAreaView style={styles.container} >

        <View>
            <Appbar style={styles.appbar}>
                <Icon style={{ margin: 10 }}
                    name='arrow-back' size={25} color="white" onPress={() => navigation.goBack()} />
                <Appbar.Content title="PostOffice Details" />
            </Appbar>
        </View>
        <View style={{
            marginTop:'20%',
            alignSelf:"center"
        }}>
            <Text style={styles.subtxt}>Name: {postdata.Name}</Text>
           
            <Text style={styles.subtxt}>BranchType: {postdata.BranchType}</Text>
            
            <Text style={styles.subtxt}>DeliveryStatus: {postdata.DeliveryStatus}</Text>
           
            <Text style={styles.subtxt}>Circle: {postdata.Circle}</Text>
          
            <Text style={styles.subtxt}>Region: {postdata.Region}</Text>
            
            <Text style={styles.subtxt}>District: {postdata.District}</Text>
     
            <Text style={styles.subtxt}>Division: {postdata.Division}</Text>
            
            <Text style={styles.subtxt}>State: {postdata.State}</Text>
            
            <Text style={styles.subtxt}>Country: {postdata.Country}</Text>
           
            <Text style={styles.subtxt}>Pincode: {postdata.Pincode}</Text>

        </View>
        
        </SafeAreaView>
    );




};
const styles = StyleSheet.create({
    card: {
        margin: 5,
        borderColor: "grey",
        borderWidth: 1,
        backgroundColor: "#e9ebf0"
    },
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
    subtxt: {
        fontSize: 18,
        color: "black",
        margin:2,
        marginBottom:5
    }
})

export default PostOfficeDet;