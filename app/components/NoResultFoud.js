//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// create a component
const NoResultFoud = () => {
    return (
        <View style={styles.container}>
             <Icon name="md-sad-outline" 
                    size={90} 
                    color="black" 
                   />
             <Text style={{fontSize:30}}>Not Found...</Text>      
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:-1,
        opacity:0.5,
    },
});

//make this component available to the app
export default NoResultFoud;
