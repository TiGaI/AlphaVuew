import React, { Component, PropTypes } from 'react';
import { AppRegistry, ScrollView, StyleSheet, Text, View,
  TextInput, TouchableOpacity, NavigatorIOS, ListView, Dimensions, Alert, AsyncStorage, Image } from 'react-native';
import { Item, Input, Tab, Tabs,Spinner, List, ListItem, Left, Body } from 'native-base';
import Swiper from 'react-native-swiper';
import randomcolor from 'randomcolor';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/initialAction';
import * as loginAction from '../actions/loginAction';
import MapView from 'react-native-maps';

//Import navigation components
import CreatePin from './createPin'


class DetailedPin extends Component {
  constructor(props){
    super(props);
    console.log('DETAILED PINS PROPS', this.props)
  }
  render(){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{this.props.marker.activityTitle}</Text>
      <Text>{this.props.marker.activityDescription}</Text>
      <Text>{this.props.marker.activityCategory}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailedPin);
