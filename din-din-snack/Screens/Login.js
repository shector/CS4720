import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Button, Alert, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants, Facebook } from 'expo';

import Home from './Home'

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  async handleFacebookLogin(navigation) {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '819590638393909', // Din Din App ID from developers.facebook.com
        { permissions: ['public_profile'] }
      );
      console.log(type + " "+ token)

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}`
          );
          const profile = await response.json(); // profile contains name and ID
          console.log("Was Successful")
          console.log(profile)
          this.props.navigation.navigate('Home', { profile });
          break;
        }
        case 'cancel': {
          Alert.alert('Whoops!', 'You need a facebook to access DinDin:)');
          break;
        }
        default: {
          Alert.alert('Oops!', 'Login failed!');
        }
      }
    } catch (e) {
      console.log('Something unexpected happened');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity  onPress={() => this.handleFacebookLogin(this.props.navigation)}>
            <Image style={styles.icon} source={require('../assets/facebook-button.png')} resizeMode="contain"/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  icon: {
    alignContent: 'center',
    display: 'block',
    maxWidth: '100%',
  }
})