//import liraries
import React, { Component, createContext,useContext,useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

 
const NoteContext = createContext();

const NodeProvider = ({children}) => {
    const[notes,setNotes] = useState([]);

    const findNotes = async ()  => {
        const result =await AsyncStorage.getItem('notes');
        if(result!=null){
            setNotes(JSON.parse(result));
            console.log(result);
        }
   };   
     
      useEffect(() =>{
        findNotes();
      },[]);
    
    return (

       <NoteContext.Provider value={{notes,setNotes,findNotes}}>
           {children}
       </NoteContext.Provider>
    );
};


export const useNotes = () => useContext(NoteContext);
//make this component available to the app
export default NodeProvider;
