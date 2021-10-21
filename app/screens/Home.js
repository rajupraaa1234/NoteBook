import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {View,Text,TextInput,StyleSheet, Dimensions} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from "../misc/colors";



const Home = ({navigation}) =>{
    const[name,setName] = useState('');
    const onChageTextHanndler = (text) =>{
        setName(text)
        console.log(text);
    };
    
    const handleSubmit =async ()=>{
        const user = {name : name}
        await AsyncStorage.setItem('user',JSON.stringify(user));  
        console.log('submit');   
        navigation.navigate('NoteBookScreen1');
    };

    return (
        <View style={{flex:1,flexDirection:"column",justifyContent:'center',alignItems:"center"}}>
            <Text style={styles.TextComponentStyle}>
                Enter your name
            </Text>
            <TextInput placeholder="Enter your name" value={name} style={styles.InputBoxStyle} onChangeText={onChageTextHanndler} />
            {name.trim().length>=3 ? (<Icon name="arrow-forward-sharp" onPress={handleSubmit} size={30} color="#fff" style={{marginTop:8, padding:15,backgroundColor:colors.PRIMARY,borderRadius:50}} /> ): null } 
        </View>
    )
} 
export default Home;

const styles = StyleSheet.create({
    InputBoxStyle:{
        height:40,
        width:Dimensions.get('window').width-50,
        marginLeft:20,
        marginRight:20,
        borderWidth:2,
        borderRadius:10,    
        paddingLeft:15,
        textAlign:"center",
        borderColor:colors.PRIMARY,
    },
    TextComponentStyle : {
        alignSelf:'flex-start',
        paddingLeft:25,
        marginBottom:5,
        opacity:0.5,
    }
    
})