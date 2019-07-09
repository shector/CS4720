import { Constants, Localization } from 'expo';
import i18n from 'i18n-js';
import * as React from 'react';
import { Animated, Dimensions, Image, SafeAreaView, StyleSheet, Text,  TouchableHighlight, View, } from 'react-native';

const ar = { // arabic string translation
  slogan: 'ربط عشاق الطعام',
};

const en = { // english string stranslation
  slogan: 'Connecting food lovers',
};

const es = { // spanish
  slogan: 'Conectando amantes de la comida'
};

const fr = { // french 
  slogan: 'Relier les gourmands'
};

i18n.fallbacks = true;
i18n.translations = { ar, fr, en, es };
i18n.locale = Localization.locale;

// Fade In View. 
class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.loop(
    Animated.sequence([
      Animated.timing(this.state.fadeAnim, { // Animate state value over time
        toValue: 1, // opacity
        duration: 1000,
        delay: Math.random()
      }),
      Animated.timing(this.state.fadeAnim, { 
        toValue: 0,
        duration: 1000,
        delay: Math.random()
      })
        ]),
    {
      iterations: -1 // infinite
    }
    ).start()
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 
        style={{...this.props.style, opacity: fadeAnim}}> 
        {this.props.children}
      </Animated.View>
    );
  }
}

// Splash Screen
export default class Splash extends React.Component {
  // Use State for Second Time Bypass.  

  render() { // Fade each icon as opposed to entire image.
    return (
      <SafeAreaView style={{ flex: 1 }}>  
        <View>
          <FadeInView>  
            <Image style={styles.icon} source={require('../assets/Illustration.png')}>
            </Image>
          </FadeInView>
          <View style={styles.textBox}>
            <Text style={styles.title}> Din Din </Text>
            <Text style={styles.subtitle}> {i18n.t('slogan')} </Text>
          </View>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('LoginScreen')}> 
              <Image
                style={styles.button}
                source={require('../assets/getStarted.png')}
              />
            </TouchableHighlight>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get('window').width,
    top: Dimensions.get('window').width * .91,
    bottom: 0,
  },
  icon: {
    width: '73%',
    left: '12%',
    top: Dimensions.get('window').height * .16,
  },
  subtitle: {
    color: '#000000',
    fontSize : Dimensions.get('window').width * .03,
    fontFamily: 'Acme',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 'normal',
    textAlign: 'center',
    mixBlendMode: 'normal',
    opacity: 0.5,
  },
  textBox:{
    position: 'absolute',
    width: '80%',
    left: '10%',
    top: Dimensions.get('window').height * .65, // 439
  },
  title:{
    fontFamily: 'Acme',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: Dimensions.get('window').width * .07,
    lineHeight: 'normal',
    textAlign: 'center',
    color: '#353535',
  },
})