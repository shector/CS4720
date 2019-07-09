import * as React from 'react';
import { Dimensions, ScrollView, StyleSheet, Image, Text, TouchableOpacity, View, Picker, TouchableHighlight } from 'react-native';
import { AppLoading, Constants } from 'expo';
import { Card, Button, Icon} from 'react-native-elements'
import Hr from "react-native-hr-component";

// Screen 
export default class InviteOthers extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedNum: 0
    }    
  }

  render() {
    const { navigation } = this.props;
    const oldState = navigation.getParam('state', 'NO PROFILE FOUND')
    console.log(oldState)
    
    return ( // <Text> You logged in {JSON.stringify(name)} </Text> 
      <View>
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image style={styles.menuIcon} source={require('../assets/back.png')}/>
            </TouchableOpacity>
            <Text style={styles.title}> DinDin </Text>
        </View>
        <Card > 
          <Image source={require('../assets/dindinbowl.png')} style={styles.dindinicon} />
          <Text style={styles.location}> {oldState.location} </Text>
          <Text style={styles.time}> Friday April 19 - {oldState.time} </Text>
        </Card>
        <View>
          <Text> Who do you want to invite <Text style={{color: '0F8CFF', marginLeft: 20,}}> {this.state.selectedNum} selected </Text></Text>
        </View>
        <Hr lineColor="#eee" width={1} textPadding={0}/>
         <View style={{flexDirection:'row', flexWrap:'wrap',}}>
              <Image source={require('../assets/homepic1.png')} style={styles.imagelayer} />
              <View> 
                <Text style={styles.host}> George Soros </Text>
                <Text style={styles.time}> 456-984-0797 </Text>
              </View>
              <Image source={require('../assets/none.png')} style={styles.emailIcon}/>
          </View>
        <Hr lineColor="#eee" width={1} textPadding={0}/>
         <View style={{flexDirection:'row', flexWrap:'wrap',}}>
              <Image source={require('../assets/invitepic2.png')} style={styles.imagelayer} />
              <View> 
                <Text style={styles.host}> Shane Padilla </Text>
                <Text style={styles.time}> 207-798-6500 </Text>
              </View>
              <Image source={require('../assets/none.png')} style={styles.emailIcon}/>
          </View>
        <Hr lineColor="#eee" width={1} textPadding={0}/>
         <View style={{flexDirection:'row', flexWrap:'wrap',}}>
              <Image source={require('../assets/invitepic3.png')} style={styles.imagelayer} />
              <View> 
                <Text style={styles.host}> Christina Frazier </Text>
                <Text style={styles.time}> 935-789-3957 </Text>
              </View>
              <Image source={require('../assets/none.png')} style={styles.emailIcon}/>
          </View>
        <Hr lineColor="#eee" width={1} textPadding={0}/>
         <View style={{flexDirection:'row', flexWrap:'wrap',}}>
              <Image source={require('../assets/invitepic4.png')} style={styles.imagelayer} />
              <View> 
                <Text style={styles.host}> Todd Baldwin </Text>
                <Text style={styles.time}> 744-839-3101 </Text>
              </View>
              <Image source={require('../assets/none.png')} style={styles.emailIcon}/>
          </View>
                  <Hr lineColor="#eee" width={1} textPadding={0}/>
         <View style={{flexDirection:'row', flexWrap:'wrap',}}>
              <Image source={require('../assets/invitepic5.png')} style={styles.imagelayer} />
              <View> 
                <Text style={styles.host}> Jose Vasquez </Text>
                <Text style={styles.time}> 084-466-5761 </Text>
              </View>
              <Image source={require('../assets/none.png')} style={styles.emailIcon}/>
          </View>
        <TouchableHighlight onPress={() => console.log('sent!')}> 
          <Image style={styles.button} source={require('../assets/sendinvite.png')}/>
        </TouchableHighlight>    
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get('window').width,
    top: Dimensions.get('window').width * .27,
    bottom: 0,
  },
  dindinicon: {
    resizeMode: 'contain',
    height: Dimensions.get('window').height * .04,
    width: Dimensions.get('window').height * .04,
    left: 150
  },
  emailIcon: {
    resizeMode: 'contain',
    height: Dimensions.get('window').height * .06,
    width: Dimensions.get('window').height * .06,
    marginLeft: 140,
    marginTop: 5
  },
  headerContainer: { 
    height: Dimensions.get('window').height * .085, // 16%
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: Dimensions.get('window').height * .01,
  },
  host: {
    fontWeight: 'bold',
    fontFamily: 'Acme',
    fontStyle: 'normal',
    fontSize: Dimensions.get('window').width * .04,
    lineHeight: 'normal',
    marginTop: 5,
  },
  imagelayer: {
    marginleft : 8
  },
  location: {
    fontSize: Dimensions.get('window').width * .07,
    fontFamily: 'Acme',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 'normal',
    textAlign: 'center',
    mixBlendMode: 'normal',
  },
  menuIcon: {
    margin: 10
  }, 
  time: {
    opacity: 0.5,
    fontFamily: 'Acme',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Dimensions.get('window').width * .038,
    lineHeight: 'normal',
    textAlign: 'center',
  },
   title: {
    fontSize: Dimensions.get('window').width * .04,
    fontFamily: 'Acme',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 'normal',
    textAlign: 'center',
    mixBlendMode: 'normal',
    right: Dimensions.get('window').width * .43,
  },
})