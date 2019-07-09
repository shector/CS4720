import * as React from 'react';
import { Dimensions, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Button, Icon} from 'react-native-elements'
import { Constants } from 'expo';

import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import Hr from "react-native-hr-component";


const GOOGLE_MAPS_APIKEY = 'AIzaSyAQOZ-616lXtr459eycpV_B0wTQzQB2s0U';
Geocoder.init(GOOGLE_MAPS_APIKEY); // use a valid API key

// Invitation Detail Screen
export default class InviteDetails extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      originLatitude: null,
      originLongitude: null,
      destLatitude: null,
      destLongitutde: null,
      error: null,
    }
  }

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


  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'NO ITEM FOUND')

    let profUrl = ''

    if (item.index == 0) {
      profUrl = require('../assets/stockphoto.jpeg')
    } else {
      profUrl = require('../assets/stockphoto2.jpg')
    }

    const addy = item.Address.split(',')[0]

    Geocoder.from(addy)
        .then(json => {
            var location = json.results[0].geometry.location;
            this.setState({
              destLatitude: location.lat,
              destLongitutde: location.lng,
              error: null,
             });
        })
        .catch(error => console.warn(error));

    const origin = {latitude: this.state.originLatitude, longitude: this.state.originLongitude};
    const destination = {latitude: this.state.destLatitude, longitude: this.state.destLongitutde};

    const initialRegion = {
      latitude: 38.0356, // Rotunda
      longitude: -78.5034,
      latitudeDelta: 0.0421,
      longitudeDelta: 0.0421,
    }

    return (
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image style={styles.menuIcon} source={require('../assets/back.png')}/>
          </TouchableOpacity>
          <Text style={styles.title}> DinDin </Text>
        </View>
        <Card style={styles.card}>
          <Image style={styles.profileImage} source={(profUrl)} /> 
          <Text style={styles.address}> {addy} </Text>
          <Text style={styles.time}> {item.Time} </Text>
          <Text style={styles.host}> Host by {item.Host} </Text>
          <Hr lineColor="#eee" textPadding={0} width={1} />
          <View style={styles.bottomMenu}>
            <TouchableOpacity onPress={this.acceptInvite}> 
              <Text style={styles.acceptText}> <Image style={styles.cardIcon} source={require('../assets/acceptIcon.png')} /> Accept </Text> 
            </TouchableOpacity>
            <View style={{width: 90}} />
            <TouchableOpacity onPress={this.rejectInvite}>
              <Text style={styles.declineText}> <Image style={styles.cardIcon} source={require('../assets/declineIcon.png')} /> Decline </Text> 
            </TouchableOpacity>
          </View>
        </Card>
        <MapView initialRegion={initialRegion} style={styles.map}>
          {!!this.state.originLatitude && !!this.state.originLongitude && <MapView.Marker
          coordinate={{"latitude":origin.latitude,"longitude":origin.longitude}}
          title={"Your Location"}
          />}
          {!!this.state.destLatitude && !!this.state.destLongitutde && <MapView.Marker
          coordinate={{"latitude":destination.latitude,"longitude":destination.longitude}}
          title={"Host Location"}
          />}
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor='hotpink'
          />
        </MapView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  acceptText: {
    color: '#38D459',
    fontSize : Dimensions.get('window').width * .04,
  },
  card: {
    height: Dimensions.get('window').height * .50,
    width: '90%'
  },
  declineText: {
    color: '#FF3B3B',
    fontSize : Dimensions.get('window').width * .04,
  },
  headerContainer: { // screen height is 667
    height: Dimensions.get('window').height * .085, // 16%
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: Dimensions.get('window').height * .01,
  },
  map: {
    alignSelf: 'stretch', 
    height: Dimensions.get('window').height * .7,
  },
  menuIcon: {
    margin: 10
  }, 
  profileImage: {
    height: Dimensions.get('window').height * .102,
    width: Dimensions.get('window').width * .102,
    left:  Dimensions.get('window').width * .370, 
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
  address: {
    fontWeight: 'bold',
    fontFamily: 'Acme',
    fontStyle: 'normal',
    fontSize: Dimensions.get('window').width * .05,
    lineHeight: 'normal',
    textAlign: 'center',
    marginLeft: 15,
    marginTop: 20,
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
  time: {
    opacity: 0.5,
    fontFamily: 'Acme',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Dimensions.get('window').width * .038,
    lineHeight: 'normal',
    textAlign: 'center',
  },
  bottomMenu: {
    height: Dimensions.get('window').height * .0763,
    borderTopColor: 'rgba(0, 0, 0, 0.5)',
    borderTopWidth: 'inherit',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
})