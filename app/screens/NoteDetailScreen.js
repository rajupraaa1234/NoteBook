//import liraries
import React, { Component,useEffect, useState  } from 'react';
import { View, Text, StyleSheet,ScrollView, Alert } from 'react-native';
import colors from '../misc/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../../Context/NodeProvider';
import AddNotesScreen from './AddNotesScreen';




// create a component
const NoteDetailScreen = (props) => {
    const[note,setNote] = useState(props.route.params.item);
    const { setNotes } = useNotes();
    const[ModalVisibal,setModalVisible] = useState(false);

    const ConfirmDelete = async ()=>{
        console.log("raju kumar");
              const result = await AsyncStorage.getItem('notes');
              let notes = [];
              if(result!=null){
                  notes = JSON.parse(result);
              }
             const newNotes = notes.filter(n=>n.id!==props.route.params.item.id);
             await AsyncStorage.setItem('notes',JSON.stringify(newNotes));
             setNotes(newNotes);
             props.navigation.goBack();
    };
    const onDeletePress = () =>{
        Alert.alert('Are you Sure!',"This action will delete your note permanetly",[
            {
                  text:"Delete",
                  onPress:ConfirmDelete
            },
           {
                text:"No Thanks",
                onPress:()=>{}
           }
        ]);    
    }
    
    const onEditPress = () =>{
        setModalVisible(true);
         console.log("Edit");
    };
    const HandleOnSubmit = async (title,Desc)=>{
        console.log("Edit Submited");
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if(result !== null){
            notes=JSON.parse(result);
        }
        const newData = notes.filter(n =>{
            if(n.id === props.route.params.item.id){
                n.title = title
                n.desc = Desc
                n.time = Date.now();
                setNote(n);
            }
            return n;
        })
        
        setNotes(newData);
        await AsyncStorage.setItem('notes',JSON.stringify(newData));
         setModalVisible(false);
         
    };

    const formatTime = (ms) =>{
        const date = new Date(ms);
        const day = date.getDate();
        const month = date.getMonth()+1;
        const year = date.getFullYear();
        const hrs = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds();
        return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
    };
    //console.log(props.route.params.item.time);
    return (
        <View style={styles.container}>
            
            <Text style={styles.datePicker} >{`Created At  ${formatTime(note.time)}`}</Text> 
            <Text style={styles.TitleStyle}>{note.title}</Text>
            
             <ScrollView style={{marginTop:10}}>
                 <Text style={styles.DescStyle}>{note.desc}</Text>
                
             </ScrollView>
             <AddNotesScreen visible={ModalVisibal} onClose={()=>{setModalVisible(false)}} onSubmit={HandleOnSubmit} isEdit={true} 
                                            Etitle= {note.title} Edesc = {note.desc}/>
             <View style={styles.PlusStyle}>
                  <Icon name="trash-outline"  size={30} color="#fff" onPress={onDeletePress}  />
             </View> 
             <View style={styles.PlusStyle1}>
                  <Icon name="ios-pencil"  size={25} color="#fff" onPress={onEditPress} />
             </View> 
        </View>
        
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.LIGHT,
        
    },
    TitleStyle:{
        fontSize:30,
        fontWeight:'bold',
        padding:10,
        marginHorizontal:15,
        color:colors.PRIMARY,
    },
    DescStyle:{
        padding:10,
        fontSize:20,
        marginHorizontal:15, 
    },
    PlusStyle:{
        width:50,
        height:50,
        position:'absolute',
        bottom:20,
        right:15,
        backgroundColor:'red',
        padding:10,
        borderRadius:50,
    },
    PlusStyle1:{
        width:50,
        height:50,
        position:'absolute',
        bottom:80,
        right:15,
        backgroundColor:colors.PRIMARY,
        padding:10,
        borderRadius:50,
    },
    datePicker:{
        textAlign:'right',
        marginTop:10,
        fontSize:16,
        opacity:0.5,
        marginRight:10
    }
});

//make this component available to the app
export default NoteDetailScreen;
