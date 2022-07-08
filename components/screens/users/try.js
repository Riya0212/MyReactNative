import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet,ScrollView, Text, View,SafeAreaView } from 'react-native';
import { Appbar,Card,Title } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";

const FetchData = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
        const response = await fetch('https://api.postalpincode.in/postoffice/char');
        const json = await response.json();
        setData(json);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <View>
      <Appbar style={styles.appbar}>
        <Icon style={{ margin: 10 }}
          name='arrow-back' size={25} color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="PostOffice Record" />

      </Appbar>

      

    </View>


  
    <ScrollView style={{marginTop:'20%'}}>
      

{isLoading ? <ActivityIndicator/> : (
  (data !== null || isLoading)? data.map((item,index)=>{
     const podata= item.PostOffice;
     return(
       podata.map((icity,icindex)=>{
         return(
           <Card style={styles.card} onPress={()=> navigation.navigate('PostDet')}>
             
             <Card.Content><Title style={{
               color:"grey"
             }}>Name: {icity.Name}</Title></Card.Content>
             <Card.Content><Text style={styles.subtxt}>BranchType: {icity.BranchType}</Text></Card.Content>
             <Card.Content><Text style={styles.subtxt}>Pincode: {icity.Pincode}</Text></Card.Content>

           </Card>
         )
       })


     )
   }):null
  
  

   
)
        
      }
    </ScrollView>

    
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor:"#e9ebf0"
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
  subtxt:{
    fontSize:14,
    color:"black"
  }
})
export default FetchData;
