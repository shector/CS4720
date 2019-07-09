import React from 'react'
import {Alert, View, TouchableOpacity, StyleSheet, Image, Text, Dimensions} from 'react-native'
import { Card, Button, Icon} from 'react-native-elements'
import {Constants, LinearGradient} from 'expo'
import Carousel from 'react-native-snap-carousel'
import Hr from "react-native-hr-component";

import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyArliWlUd4TOjZOP1Vd6kBGJEAW1u7ApZs",
  authDomain: "mobile-din-din.firebaseapp.com",
  databaseURL: "https://mobile-din-din.firebaseio.com",
  projectId: "mobile-din-din",
  storageBucket: "mobile-din-din.appspot.com",
  messagingSenderId: "572317814679"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default class InvitationCard extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      invitations: [
        {
          'Host': 'Albert Evans',
          'Time': 'Tuesday April 23 - 7:00 PM',
          'accepted': null,
          'Address' : '1819 Jefferson Park Avenue, Charlottesville, VA',
          'index': 0
        },
        {
          'Host': 'Sean White',
          'Time': 'Satruday April 20 - 4:00 PM',
          'accepted': null,
          'Address' : '301 15th St NW, Charlottesville, VA ',
          'index' : 1
        }
      ],
      invitationNumber: 2 
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    firebase.database().ref('invitations/').on('value', function (snapshot) {
        console.log(snapshot.val())
    });
  }

  _renderItem = ({item, index}) => {
        let profUrl = ''

        if (item.index == 0) {
          profUrl = require('../assets/stockphoto.jpeg')
        } else {
          profUrl = require('../assets/stockphoto2.jpg')
        }

        return (
          <Card style={this.getCardStyle(item)}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('InviteDetail', { item })}> 
              <View style={styles.topMenu}>
                <Image style={styles.profileImage} source={(profUrl)} /> 
                <Text style={styles.host}> {item.Host} </Text>
              </View>
              <Text style={styles.time}> {item.Time} </Text>
            </TouchableOpacity>
            <Hr lineColor="#eee" textPadding={0} width={1} />
          <View style={styles.bottomMenu}>
            <TouchableOpacity onPress={this.acceptInvite}> 
              <Text style={styles.acceptText}> <Image style={styles.cardIcon} source={require('../assets/acceptIcon.png')} /> Accept </Text> 
            </TouchableOpacity>
            <View style={{width: 20}} />
            <TouchableOpacity onPress={this.rejectInvite}>
              <Text style={styles.declineText}> <Image style={styles.cardIcon} source={require('../assets/declineIcon.png')} /> Decline </Text> 
            </TouchableOpacity>
          </View>
        </Card>
        );
  }

  getCardStyle = (item) => {
    if (item.accepted == null) {
      return styles.card
    } else if (item.accepted == true) {
      return styles.greenCard
    } else {
      return styles.redCard
    }
  } 


  acceptInvite = () => {
    this._carousel.snapToNext()

    if (this.state.invitationNumber == 1) {
      this.setState(previousState => (
        {
          invitationNumber: previousState.invitationNumber -1,  
          invitations: null
        }
    ))} else {
      this.setState(previousState => (
          {
            invitationNumber: previousState.invitationNumber -1,  
          }
      ))
    }
  }

  rejectInvite = () => {
    this._carousel.snapToNext()

    if (this.state.invitationNumber == 1) {
      this.setState(previousState => (
        {
          invitationNumber: previousState.invitationNumber -1,  
          invitations: null
        }
    ))} else {
      this.setState(previousState => (
          {
            invitationNumber: previousState.invitationNumber -1,  
          }
      ))
    }
  }

  componentWillUpdate() {
    this._carousel.snapToNext()
  }

  render() {
    let inviteMessage = <Text style={styles.pending}>  Pending ({this.state.invitationNumber}) </Text>;

    if (this.state.invitationNumber == 0) {
      inviteMessage = null
    }


    return (
      <View>
      {inviteMessage}
       <Carousel
              layout={'tinder'}
              ref={(c) => { this._carousel = c; }}
              data={this.state.invitations}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width * .7}
              enableMomentum
            />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  acceptText: {
    color: '#38D459',
    fontSize : Dimensions.get('window').width * .04,
  },
  bottomMenu: {
    height: Dimensions.get('window').height * .0763,
    borderTopColor: 'rgba(0, 0, 0, 0.5)',
    borderTopWidth: 'inherit',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    card: { backgroundColor: 'red' },
    height: Dimensions.get('window').height * .199,
    width: Dimensions.get('window').width * .8,    
  },
  greenCard: {
    backgroundColor: 'green',
    height: Dimensions.get('window').height * .199,
    width: Dimensions.get('window').width * .8,   
  }, 
  redCard: {
    backgroundColor: 'red',
    height: Dimensions.get('window').height * .199,
    width: Dimensions.get('window').width * .8,   
  },
  cardIcon: {    
  },
  declineText: {
   color: '#FF3B3B',
    fontSize : Dimensions.get('window').width * .04,
  },
  host: {
    fontWeight: 'bold',
    fontFamily: 'Acme',
    fontStyle: 'normal',
    fontSize: Dimensions.get('window').width * .05,
    lineHeight: 'normal',
    textAlign: 'center',
    marginLeft: 15,
    marginTop: 20,
  },
  pending: {
    color: 'black',
    mixBlendMode: 'normal',
    opacity: 0.8,
    fontFamily: 'Acme',
    fontStyle: 'normal',
    fontSize: Dimensions.get('window').width * .03,
    lineHeight: 'normal',
    fontWeight: 'bold',
  },
  profileImage: {
    height: Dimensions.get('window').height * .075,
    width: Dimensions.get('window').width * .075,
    borderRadius: 20,    
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
  topMenu: {
    height: Dimensions.get('window').height * .1227,
    borderRadius: 20,
    flexDirection:'row', 
    flexWrap:'wrap'
  },

})