
// You can import from local files
import Splash from './components/splash';


import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';

var GobalSpace = {
  url: "https://catfact.ninja/fact"
}

export default class App extends React.Component {
   constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount() {
    this.timerID = setInterval(() => {this.tick()}, 7000);
  }
  tick() {
    return fetch(GobalSpace.url).then(
      (response) => response.json()).then(
        response =>{
          this.setState({catFact: response, isLoading: false})
        }
    )
  }

  render(){
    if(this.state.isLoading){
      return(
        <Splash/>
      )
    }

    return(
      <View style={styles.centerAlign}>
        <Text style={styles.fact}> 
        {this.state.catFact.fact}
        </Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  centerAlign:{
          flex: 1,
          alignContent:"center",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#000D0C"

  },
  fact:{
    color: 'white',
    padding: 40,
    fontSize: 20,
  }
})