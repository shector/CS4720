import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

/**
 * Default for flexDirection: colum , JustifyContent: spcaceBetween, AlignItems: stretch
 */
export default class App extends React.Component {
  render() {
    // Primary Axis  Options: column, row 
    let flexDir = "row" 
    
     //Distribution Primary Axis Options: flex-start, center, flex-end, space-around, space-between and     space-evenly
    let justCont = "flex-end"

    //Vertical Distribution secondary Axis: flex-start, center, flex-end, and stretch.
    let alignIt= "stretch"  
   
    return (
     <View style={{
        flex: 1,
        flexDirection: flexDir,
        justifyContent: justCont,
        alignItems: alignIt,
      }}>
        <View style={{width: 100, height: 100, backgroundColor: 'red'}} />
        <View style={{width: 100, height: 100, backgroundColor: 'green'}} />
        <View style={{width: 100, height: 100, backgroundColor: 'blue'}} />
      </View>
    );
  }
}
