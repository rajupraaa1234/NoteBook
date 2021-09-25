//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput, Dimensions } from 'react-native';
import colors from '../misc/colors';


// create a component
const SearchBar = () => {
    return (
        <View style={styles.container}>
              <TextInput style={styles.searchInputStyle} placeholder ="  Search..." />  
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
