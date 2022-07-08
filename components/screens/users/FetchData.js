import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

const FetchData = () => {
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
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
      
        <FlatList
          data={data}
          renderItem={({ item,index }) => {console.log(item.PostOffice)
          
          for (let index = 0; index < item.PostOffice.length; index++) {
            const element = item.PostOffice[index];
   
          }
        }
          
            
        

        //    <Text>{item.PostOffice}</Text>
 
        
          }
       
        />
      )}
    </View>
  );
};
export default FetchData;