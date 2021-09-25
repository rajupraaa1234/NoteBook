//import liraries

import React, { Component,useState } from 'react';
import {View,Button,TextInput,StyleSheet, Dimensions, Keyboard,TouchableWithoutFeedback,Modal} from 'react-native';

import colors from '../misc/colors';
// create a component
const AddNotesScreen = ({visible,onClose,onSubmit}) => {

    const [title, setTitle] = useState('');
    const [Desc, setDesc] = useState('');

    const onnOutSidePress = () =>{
        Keyboard.dismiss();
    };

    const submitDetail = () =>{
         if(!title.trim() && !Desc.trim()){
             return onClose();
         }
         onSubmit(title,Desc);
         setTitle('');
         setDesc('');
    }

    return (
        <>
            <Modal visible={visible} animationType="fade" >
                <TextInput placeholder="Enter your title name" style={styles.InputText1} onChangeText={(text)=>{setTitle(text)}}/> 
                <TextInput placeholder="Enter your Description here..." multiline style={styles.InputText2} onChangeText={(text)=>{setDesc(text)}}/>
                <View style={{marginTop:20,borderRadius:20,marginLeft:20,marginRight:20}}>
                    <Button
                        onPress={submitDetail}
                        title="Submit"/>
                </View>
                <View style={{marginTop:20,borderRadius:20,marginLeft:20,marginRight:20}}>
                    <Button
                        onPress={onClose}
                        title="Cancel"/>
                </View>
                <TouchableWithoutFeedback onPress={onnOutSidePress} >
                    <View style={{flex:1}} />
                </TouchableWithoutFeedback>

                

            </Modal>
        </>
    );
};


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    InputText1:{
        height:40,
        width:Dimensions.get('window').width-40,
        marginLeft:20,
        marginTop:10,
        marginRight:20,
        borderWidth:2,
        borderRadius:10,    
        textAlign:"center",
        borderColor:colors.PRIMARY,
    },
    InputText2:{
        height:150,
        width:Dimensions.get('window').width-40,
        marginLeft:20,
        marginTop:10,
        marginRight:20,
        borderWidth:2,
        borderRadius:10,    
        textAlign:"center",
        borderColor:colors.PRIMARY, 
    }
});


//make this component available to the app
export default AddNotesScreen;
