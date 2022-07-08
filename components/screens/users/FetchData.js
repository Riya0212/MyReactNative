import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, ScrollView, Text, View, SafeAreaView } from 'react-native';
import { Card, Colors, Title, Appbar } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";
import { Searchbar } from 'react-native-paper';
import filter from 'lodash.filter';

const FetchData = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://api.postalpincode.in/postoffice/char');
      const json = await response.json();
      setData(json);
      setFullData(json);
      console.log(json);


    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

handleSearch= async(text) =>{
  const formattedQuery = text.toLowerCase();

  
  // const filteredData = filter(fullData, user => {
  //   return searchcase(user, formattedQuery);
  // });
  // setData(filteredData);
  // setQuery(text);
};

const searchcase = ({ Name,Pincode, Region }, query) => {


  if (Name.contains(query) || Pincode.contains(query) || Region.contains(query)) {
    return true;
  }

  return false;


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
     


      <ScrollView style={{ marginTop: '20%' }}>


        {isLoading ? <ActivityIndicator /> : (
          (data !== null || isLoading) ? data.map((item, index) => {
            const podata = item.PostOffice;
            return (
              podata.map((icity, icindex) => {
                return (
                  <Card style={styles.card} onPress={() => navigation.navigate('PostDet', {
                    findata: podata[icindex]
                  })}>

                    <Card.Content><Title style={{
                      color: "grey"
                    }}>Name: {icity.Name}</Title></Card.Content>
                    <Card.Content><Text style={styles.subtxt}>BranchType: {icity.BranchType}</Text></Card.Content>
                    <Card.Content><Text style={styles.subtxt}>Division: {icity.Division}</Text></Card.Content>
                    <Card.Content><Text style={styles.subtxt}>Pincode: {icity.Pincode}</Text></Card.Content>
                   

                  </Card>
                )
              })


            )
          }) : null




        )

        }
      </ScrollView>




    </SafeAreaView>

    // <ScrollView>
    //   {
    //     data !== null? data.map((item,index)=>{
    //       const podata= item.PostOffice;
    //       return(
    //         podata.map((icity,icindex)=>{
    //           return(
    //             <Card style={styles.card}>
    //               <Card.Content><Title>Name: {icity.Name}</Title></Card.Content>
    //               <Card.Content><Text>Pincode: {icity.Pincode}</Text></Card.Content>

    //             </Card>
    //           )
    //         })


    //       )
    //     }): null
    //   }
    // </ScrollView>

  );


};
const styles = StyleSheet.create({
  card: {
    margin: 8,
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
    fontSize: 14,
    color: "black"
  }
})
export default FetchData;