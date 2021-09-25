//import liraries
import React, { Component, createRef } from 'react';
import { View, Text, StyleSheet,TextInput, Dimensions } from 'react-native';
import colors from '../misc/colors';
import Icon from 'react-native-vector-icons/Ionicons';


// create a component
const SearchBar = ({value,onChangeText,onClear}) => {
    return (
        <View style={styles.container}>
              <TextInput value={value} onChangeText={onChangeText} style={styles.searchInputStyle} placeholder ="  Search..." />  
              <Icon name="ios-close-circle-outline" 
                    size={30} 
                    onPress={onClear}
                    color="black" 
                    style={{position:'absolute',padding:5,right:8,opacity:0.7, justifyContent:'center',alignContent:'center'}} />
              
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        marginHorizontal:20,
        marginVertical:5,
    },
    searchInputStyle:{
        borderWidth:0.5,
        borderColor:colors.PRIMARY,
        borderRadius:40,
        height:40,
        marginLeft:10,
        fontSize:20,           
        padding:5,
    },
});

//make this component available to the app
export default SearchBar;
