/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect ,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


import Home from './app/screens/Home';
import NoteBookScreen from './app/screens/NoteBookScreen';
import NoteBookScreen1 from './app/screens/NoteBookScreen';
import SearchBarScreen from './app/components/SearchBar';
import AddNotesScreen from './app/screens/AddNotesScreen';
import NoteDetailScreen from './app/screens/NoteDetailScreen';
import NodeProvider from './Context/NodeProvider';


const App = () => {

  const [user, setUser] = useState({});  // emptyObject
  const [newUser,SetNewUser] = useState(false);

  const findUser = async () => {
    // AsyncStorage.clear();
      const res = await AsyncStorage.getItem('user');
      if(res!=null){
        setUser(JSON.parse(res));
        SetNewUser(true);
      }else{
        SetNewUser(false);
      }
  };
  useEffect(()=>{
    findUser();
  });
  // if(!user.name) return <Home onFinish={findUser}/>
  return (
    <NavigationContainer>
      <NodeProvider>
          <Stack.Navigator>
            { newUser ? ( <Stack.Screen name="NoteBookScreen" component={NoteBookScreen}  options={{
                      headerShown: false,
                    }} />) : <Stack.Screen name="HomeScreen" component={Home} options={{
                      headerShown: false,
                    }}/>  
            }        
              <Stack.Screen name="NoteBookScreen1" component={NoteBookScreen1} options={{
                      headerShown: false,
                    }}/>
              <Stack.Screen name="AddNotesScreen" component={AddNotesScreen} />  
              <Stack.Screen name="NoteDetailScreen" component={NoteDetailScreen} options={{title:"Note Details"}} />      
          </Stack.Navigator>
      </NodeProvider>
    </NavigationContainer>
  );
};

export default App;
