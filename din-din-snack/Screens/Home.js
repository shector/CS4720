import * as React from 'react';
import { Dimensions, ScrollView, StyleSheet, Image, Text, TouchableOpacity, View, Picker } from 'react-native';
import { AppLoading, Constants } from 'expo';

import InvitationCard from '../components/invitationCard'
import Hr from "react-native-hr-component";

 // Din Din Header
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      month: null, 
      events: [],
    }
  }

  componentDidMount(){
    this.getMonth()
  }

  getMonth(){
    this.setState({
        month: new Date().getMonth()
    })
  }

  getTextStyle(currentMonth, item) {
    return (currentMonth + 1 === item.item.id ? styles.monthTextHighlight : styles.monthText)
  }

  render() {
    if (this.state.month === null ) {
      return(<AppLoading/>)
    }

    const months = [
      {'month': "January", 'id': 1}, 
      {'month': "February", 'id': 2}, 
      {'month': "March", 'id': 3}, 
      {'month': "April", 'id': 4}, 
      {'month': "May", 'id': 5}, 
      {'month': "June", 'id': 6}, 
      {'month': "July", 'id': 7}, 
      {'month': "August", 'id': 8}, 
      {'month': "September", 'id': 9}, 
      {'month': "October", 'id': 10}, 
      {'month': "November", 'id': 11}, 
      {'month': "December", 'id': 12}, 
      ]

    return (
      <View>
        <View style={styles.headerContainer}>
          <Image style={styles.menuIcon} source={require('../assets/menuIcon.png')}/>
          <Text style={styles.title}> DinDin </Text>
          <Image style={styles.searchIcon} source={require('../assets/searchIcon.png')} />
        </View>
          <ScrollView
            style={styles.monthScrollView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {
              months.map((item, index) => (
              <View key={item.id} style={this.getTextStyle(this.state.month, {item})}>
                <Text>{item.month}</Text>
              </View>
              ))
            }
          </ScrollView>
      </View>
      )
  }
}

// Screen 
export default class Home extends React.Component {
  constructor(props){
    super(props)    
  }

  render() {
    const { navigation } = this.props;
    const name = navigation.getParam('profile', 'NO PROFILE FOUND').name
    
    return ( // <Text> You logged in {JSON.stringify(name)} </Text> 
      <View>
        <Header />
        <InvitationCard navigation={this.props.navigation} />
        <View>
          <View>
            <Text style={styles.text}> Thursday 18 April </Text>
            <Hr lineColor="#eee" width={1} textPadding={0}/>
            <View style={{flexDirection:'row', flexWrap:'wrap',}}>
              <Image source={require('../assets/homepic1.png')} style={styles.imagelayer} />
              <View> 
                <Text style={styles.host}> George Soros </Text>
                <Text style={styles.time}> 5:00 pm </Text>
              </View>
              <Image source={require('../assets/call.png')} style={styles.callIcon} />
              <Image source={require('../assets/email.png')} style={styles.emailIcon}/>
            </View>
            <Hr lineColor="#eee" width={1} textPadding={0}/>
          </View>
          <View>
            <Text style={styles.text}> Friday 19 April </Text>
            <Hr lineColor="#eee" width={1} textPadding={0}/>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('NewEvent') } style={{
              justifyContent: 'center', alignItems: 'center', }}> 
              <Image source={require('../assets/newevent.png')} />
            </TouchableOpacity>
          </View>
          <View>
            <Hr lineColor="#eee" width={1} textPadding={0}/>
            <Text style={styles.text}> Saturday 20 April </Text>
            <Hr lineColor="#eee" width={1} textPadding={0}/>
            <View style={{flexDirection:'row', flexWrap:'wrap',}}>
              <Image source={require('../assets/homepic2.png')} style={styles.imagelayer} />
              <View> 
                <Text style={styles.host}> Carries Potter </Text>
                <Text style={styles.time}> 10:00 pm </Text>
              </View>
              <Image source={require('../assets/call.png')} style={styles.callIcon} />
              <Image source={require('../assets/email.png')} style={styles.emailIcon}/>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  callIcon: {
    resizeMode: 'contain',
    height: Dimensions.get('window').height * .06,
    width: Dimensions.get('window').height * .06,
    marginLeft: 110,
    marginTop: 5
  },
  emailIcon: {
    resizeMode: 'contain',
    height: Dimensions.get('window').height * .06,
    width: Dimensions.get('window').height * .06,
    marginLeft: 10,
    marginTop: 5
  },
  headerContainer: { // screen height is 667
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
  menuIcon: {
    margin: 10
  },
  monthScrollView: {
    fontSize: Dimensions.get('window').width * .033,
    height: Dimensions.get('window').height * .04, 
    fontFamily: 'Acme',
    fontStyle: 'normal',
    lineHeight: 'normal',
    textAlign: 'justify',
    mixBlendMode: 'normal',
    justifyContent: 'space-between',
  },
  monthText: {
    textAlign: 'justify',
    paddingLeft: Dimensions.get('window').width * .025,
    paddingRight: Dimensions.get('window').width * .025,
    opacity: 0.3
  },
  monthTextHighlight:{
    textAlign: 'justify',
    paddingLeft: Dimensions.get('window').width * .025,
    paddingRight: Dimensions.get('window').width * .025,
    fontWeight: 'bold',
    color: 'black'
  },
  searchIcon: {
    margin: 10
  }, 
  text: {
    color: 'black',
    mixBlendMode: 'normal',
    fontFamily: 'Acme',
    fontStyle: 'normal',
    fontSize: Dimensions.get('window').width * .04,
    fontWeight: 'bold',
  },
  time: {
    opacity: 0.5,
    fontFamily: 'Acme',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Dimensions.get('window').width * .04,
    lineHeight: 'normal',
  },
  title: {
    fontSize: Dimensions.get('window').width * .033,
    fontFamily: 'Acme',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 'normal',
    textAlign: 'center',
    mixBlendMode: 'normal',
  }
})