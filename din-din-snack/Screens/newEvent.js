import * as React from 'react';
import { Dimensions, Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, Image, TextInput } from 'react-native';
import { Constants } from 'expo';
import { Card, Button, Icon} from 'react-native-elements'


import DateTimePicker from 'react-native-modal-datetime-picker';
import Geocoder from 'react-native-geocoding';
import MapView from 'react-native-maps';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAQOZ-616lXtr459eycpV_B0wTQzQB2s0U';
Geocoder.init(GOOGLE_MAPS_APIKEY); // use a valid API key

// New Event Screen
export default class NewEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDateTimePickerVisible: true,
      location: null,
      originLatitude: null,
      originLongitude: null,
      error: null,
      time: null
    }
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (time) => {
    this._hideDateTimePicker();
    let tempdate = new Date(time).getTime()
    let d = new Date(tempdate); 
    this.setState({
      time: d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
    });
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          originLatitude: position.coords.latitude,
          originLongitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  markerClick(){
    Geocoder.from(this.state.originLatitude, this.state.originLongitude)
        .then(json => {
        	const addressComponent = json.results[0].formatted_address.split(',')[0];
            console.log(addressComponent);
            this.setState({
              location: addressComponent
            });
        })
        .catch(error => console.warn(error));
 }

  render() {
    const initialRegion = {
      latitude: 38.0356, // Rotunda
      longitude: -78.5034,
      latitudeDelta: 0.0421,
      longitudeDelta: 0.0421,
    }

    const origin = {latitude: this.state.originLatitude, longitude: this.state.originLongitude};
    return (
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image style={styles.menuIcon} source={require('../assets/back.png')}/>
          </TouchableOpacity>
          <Text style={styles.title}> DinDin </Text>
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          titleIOS='What time is dinner?'
          mode='time'
        />
        <Card> 
          <Text style={styles.choose}> Choose a location </Text>
          <View style={{flexDirection:'row', flexWrap:'wrap',}}>
            <Image source={require('../assets/locationicon.png')}/>             
            <Text  numberOfLines={1} style={styles.location}> {this.state.location} </Text>
          </View>
          <TextInput
          editable = {true}
          maxLength = {40}
          onChangeText={(text) => this.setState({location: text})}
          /> 
        </Card>
        <MapView initialRegion={initialRegion} style={styles.map}>
        {!!this.state.originLatitude && !!this.state.originLongitude && <MapView.Marker
          coordinate={{"latitude":origin.latitude,"longitude":origin.longitude}}
          title={"Your Location"}
          onPress= {()=>this.markerClick()} />
        }

        </MapView>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('InviteOthers', {'state': this.state})}> 
            <Image style={styles.button} source={require('../assets/invitebtn.png')}/>
        </TouchableHighlight>        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get('window').width,
    // top: Dimensions.get('window').height * .3,
    bottom: 0,
  },
  choose: {
    fontSize: Dimensions.get('window').width * .04,
    fontFamily: 'Acme',
    fontStyle: 'normal',
    fontWeight: 'normal',
    opacity: 0.4,
    lineHeight: 'normal',
    textAlign: 'center',
    mixBlendMode: 'normal',
  },
  headerContainer: { 
    height: Dimensions.get('window').height * .085, // 16%
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: Dimensions.get('window').height * .01,
  },
  location: {
    fontSize: Dimensions.get('window').width * .04,
    fontFamily: 'Acme',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 'normal',
    textAlign: 'center',
    mixBlendMode: 'normal',
  },
  map: {
    alignSelf: 'stretch', 
    height: Dimensions.get('window').height * .7,
  },
  menuIcon: {
    margin: 10
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