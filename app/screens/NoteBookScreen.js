//import liraries
import React, { Component, createRef, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, StatusBar,FlatList } from 'react-native';
import SearchBar from '../components/SearchBar';
import colors from '../misc/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import AddNotesScreen from './AddNotesScreen';

import Note from '../components/Note';
import { useNotes } from '../../Context/NodeProvider';
import NoResultFoud from '../components/NoResultFoud';

// create a component


const NoteBookScreen = ({navigation}) => {
    const[greet,setGreet] = useState('');
    const[user,setUser] = useState('');
    const[ModalVisibal,setModalVisible] = useState(false);
    const{notes,setNotes,findNotes} = useNotes();
    const[noResult,setNoResult] = useState(false);
    const[searchQuery,setSearchQuery] = useState('');
    //const[notes,setNotes] = useState([]);


    
    const findGreet = () =>{
        const hour = new Date().getHours();
        if(hour===0 || hour<12) return setGreet('Good morning');
        if(hour===1 || hour<17) return setGreet('Good Afternoon');
        setGreet("Good Evening"); 
        
    }

    const findUser = async () => {
        // AsyncStorage.clear();
          const res = await AsyncStorage.getItem('user');
          if(res!=null){
           
            setUser(JSON.parse(res));
           // console.log(user.name);
          }
      };

  
    useEffect(() =>{
         findGreet();
         findUser();
        // findNotes();
    },[]);

    const ClickAdd =()=>{
        // navigation.navigate('AddNotesScreen');
        setModalVisible(true);
        //<AddNotesScreen visible={true}/>
    }
    const HandleOnSubmit = async (title,Desc)=>{
        
        const note = {id:Date.now(),title:title,desc:Desc,time:Date.now()}
        const UpdatedList = [...notes,note]; 
        await AsyncStorage.setItem('notes',JSON.stringify(UpdatedList));
        setNotes(UpdatedList);
        setModalVisible(false);
         
    }

    const hadleOnClickEvent = (item) =>{
        navigation.navigate('NoteDetailScreen',{item});
    }
    
    const handleOnChangeText = async (text) =>{
        setSearchQuery(text);
        if(!text.trim()){
            setSearchQuery('');
            setNoResult(false);
            return await findNotes();
        }
        const filteredNotes = notes.filter(note=>{
               if(note.title.toLowerCase().includes(text.toLowerCase())){
                   return note;
               }
        });
        if(filteredNotes.length){
            setNotes([...filteredNotes]);
            setNoResult(false);
        }else{
            setNoResult(true);
        }
    };

    const handleOnClear = async ()=>{
         setSearchQuery('')
         setNoResult(false)
         await findNotes()
    }

    return (
        <>  
           <StatusBar backgroundColor={colors.LIGHT} barStyle="dark-content"/>
            <View style={styles.container}>
                <Text style={styles.StatusBarText}>{greet} {user.name} </Text>
                {notes.length!=0 ?  <SearchBar value={searchQuery} onChangeText={handleOnChangeText} onClear={handleOnClear}  /> : null }

                {noResult ? <NoResultFoud /> : 
                        <FlatList style={{ marginHorizontal:20}} data={notes} 
                            keyExtractor={(item)=>item.id.toString() }
                            numColumns={2}
                            columnWrapperStyle={{justifyContent:'space-between'}}
                            renderItem={({item})=> <Note item={item} onClickEvent={()=>hadleOnClickEvent(item)}/>}
                        />
                }
                    {notes.length==0 ? 
                        <Text style={styles.emptyHeader}>
                            Add Note
                        </Text> : null}    
                   
                <View style={[StyleSheet.absoluteFillObject,styles.emptyContaierStyle]}>
                     <View style={styles.PlusStyle}>
                          <Icon name="ios-add" onPress={ClickAdd} size={30} color="#fff"  />
                     </View> 
                     <AddNotesScreen visible={ModalVisibal} onClose={()=>{setModalVisible(false)}} onSubmit={HandleOnSubmit} isEdit={false} />
                </View>
            </View>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex:1,
       // backgroundColor:colors.LIGHT, 
    },
    StatusBarText:{
        marginHorizontal:20,
        fontSize:25,
        padding:10,
        fontWeight:'bold',
    },
    emptyContaierStyle:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        marginTop:5,
        marginHorizontal:20,
        
    },
    emptyHeader:{
        fontSize:25,
        textTransform:'uppercase',
        opacity:0.4,
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        textAlign:'center'
    },
    PlusStyle:{
        width:50,
        height:50,
        position:'absolute',
        bottom:20,
        right:0,
        backgroundColor:colors.PRIMARY,
        padding:10,
        borderRadius:50,
    }
});

//make this component available to the app
export default NoteBookScreen;
