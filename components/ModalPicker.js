import React from 'react';
import { Text,StyleSheet,Alert,Modal,ScrollView, Dimensions,TouchableOpacity ,View} from 'react-native';

const CITIES=["Anand","Ahemdabad","Surat","Vadodra","Delhi","Gandhinagar"];
const WIDTH=Dimensions.get('window').width;
const HEIGHT= Dimensions.get('window').height;
const ModalPicker =(props)=>{



const onPressItem=(option)=>{
    props.changeModalVisi(false);
    props.setData(option);

    
};
    const option= CITIES.map((item,index)=>{
        return(
            <TouchableOpacity style={styles.container} 
            key={index}
            onPress={()=>onPressItem(option)}>
                <Text>{item}</Text>
                

            </TouchableOpacity>
        );
    });
    return (
        <TouchableOpacity
        onPress={()=>props.changeModalVisi(false)}
        style={styles.container}>
            <View style={[styles.modal,{width:WIDTH-20, height:HEIGHT/2}]}>

                <ScrollView>
                    {option}
                </ScrollView>
            </View>

        </TouchableOpacity>
       
    );
}


const styles=StyleSheet.create({

    container:{
        flex:1,
        alignContent:"center",
        justifyContent:"center"
    },
    modal:{
        backgroundColor:"white",
        borderRadius: 10
    },
    option:{
        alignItems:"flex-start"
    },
    text:{
        margin:20

    }
});

export {ModalPicker};