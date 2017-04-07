import React, { Component, PropTypes } from 'react';
import { AppRegistry, ScrollView, StyleSheet, Text, View,
  TextInput, TouchableOpacity, NavigatorIOS, ListView, Dimensions, Alert, AsyncStorage, Image } from 'react-native';
import { Item, Input, Tab, Tabs,Spinner, List, ListItem } from 'native-base';
import Swiper from 'react-native-swiper';
import randomcolor from 'randomcolor';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/initialAction';
import * as loginAction from '../actions/loginAction';
import MapView from 'react-native-maps';




var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE = 1;
const LONGITUDE = 1;

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class CreatePin extends Component {

  constructor(props){
    super(props);
    console.log('MAIN PAGE PROPS', this.props)
    this.state = {
      initialPosition: {
        latitude: LATITUDE,
        longitude: LATITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      currentPosition: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },

    }
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA

        }});

      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
      this.watchID = navigator.geolocation.watchPosition((position) => {
      var currentPosition = JSON.stringify(position);
      this.setState({currentPosition: {
        latitude: (position.coords.latitude) / 1.00022741,
        longitude: position.coords.longitude - 0.001,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }});

    });

  }
  componentWillUnmount (){
  navigator.geolocation.clearWatch(this.watchID);
}
createPin(){
    this.props.navigator.push({
      component: CreatePin,
      backButtonTitle: 'MainPage'
    })
  }
  render() {

    return(
      <View style={{flex: 1}}>
      {this.state.currentPosition.latitude !== 1 && this.state.currentPosition.longitude !== 1 ? (

      <MapView
       resizeMode = "stretch"
        style={{flex: 1, height: null, width: null, alignItems: 'center'}}
        initialRegion={{
          latitude: this.state.currentPosition.latitude,
          longitude: this.state.currentPosition.longitude,
          latitudeDelta: this.state.currentPosition.latitudeDelta,
          longitudeDelta: this.state.currentPosition.longitudeDelta,
        }}
      >
       <MapView.Marker
         coordinate={{latitude: this.state.currentPosition.latitude,
         longitude: this.state.currentPosition.longitude}}
         title='Title'
      />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={{flex: 0, marginBottom: 60, backgroundColor: 'black', width: null, height: null,
        alignItems: 'center', justifyContent: 'center', borderRadius: 15, opacity: 0.9, padding: 15}}>
          <TouchableOpacity onPress={this.createPin.bind(this)}>
            <Text style={{color: 'white', fontWeight: '500'}}>Confirm Pin Location</Text>
          </TouchableOpacity>
        </View>
      </View>

      </MapView>
    ) : null}
      </View>
    )
  }
}
function mapStateToProps(state) {
    return {
        login: state.get('login'),
        profile: state.get('profile'),
        activitiesPageState: state.get('activityPageState')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
        loginActions: bindActionCreators(loginAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePin);
