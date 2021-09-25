//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions,TouchableOpacity } from 'react-native';

import colors from '../misc/colors';

// create a component
const Note = ({item , onClickEvent}) => {
    const{title,desc} = item;
    return (
        <TouchableOpacity onPress={onClickEvent} style={styles.container}>
            <Text numberOfLines={2} style={styles.TitleStyle}>{title }</Text>
            <Text numberOfLines={3} style={styles.DescStyle}>{desc}</Text>
        </TouchableOpacity>
    );
};

const w= Dimensions.get('window').width-40;
// define your styles
const styles = StyleSheet.create({
    container: {
        width: w/2 - 10,
        marginTop:10,
        justifyContent:'center',alignContent:'center',
        backgroundColor: colors.PRIMARY,
        borderRadius:10,
        padding:10,
    },
    TitleStyle:{
        fontSize:20,
        color:colors.LIGHT,
        textAlign:'center'
    },
    DescStyle:{
        fontSize:16,
        color:'black',
        fontWeight:'bold',
        textAlign:'center'
    }
});

//make this component available to the app
export default Note;
