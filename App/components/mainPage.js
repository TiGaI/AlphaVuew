import React, { Component, PropTypes } from 'react';
import { AppRegistry, ScrollView, StyleSheet, Text, View,
  TextInput, TouchableOpacity, NavigatorIOS, ListView, Alert, AsyncStorage, Image } from 'react-native';
import { Item, Input, Tab, Tabs,Spinner, List, ListItem } from 'native-base';
import Swiper from 'react-native-swiper'
import randomcolor from 'randomcolor'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/initialAction';
import * as loginAction from '../actions/loginAction';
import MapView from 'react-native-maps';

import DetailEvent from './detailEventProfile'

var image5 = {uri: 'https://www.thisiscolossal.com/wp-content/uploads/2016/03/finger-4.jpg'}
var image4 = {uri: 'https://cdn.playbuzz.com/cdn/b19cddd2-1b79-4679-b6d3-1bf8d7235b89/93794aec-3f17-47a4-8801-a2716a9c4598_560_420.jpg'}
var image3 = {uri: 'https://iso.500px.com/wp-content/uploads/2016/04/STROHL__ST_1204-Edit-1500x1000.jpg'}
var image2 = {uri: 'https://static.pexels.com/photos/2855/landscape-mountains-nature-lake.jpg'}
var image1 = {uri: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Two_dancers.jpg'}


var events = ['Sport' , 'Art' , 'Music' ]
Array.prototype.next = function(item) {
  var length = this.length
  if (item === null) {
    return this[0];
  }
  var i = this.indexOf(item);
  if (i === this.length - 1){
    return this[0];
  } else {
    return this[(i + 1)];
  }
};
Array.prototype.prev = function(item) {
  if (item === null) {
    return this[0];
  }
  var i = this.indexOf(item);
  var length = this.length
  if (i === 0){
    return this[(length-1)];
  } else {
    return this[(i - 1)];
  }
};

class MainPage extends Component {
  constructor(props){
    super(props);
    console.log('MAIN PAGE PROPS', this.props)
  }
  category(){
    this.props.navigator.push({
      component: Categories,
      backButtonTitle: 'Main'
    })
  }
  render() {

    return(
      <View style={{flex: 1, justifyContent: 'center'}}>

      <MapView
       resizeMode = "stretch"
        style={{flex: 1, height: null, width: null, alignItems: 'center'}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
       <MapView.Marker
         coordinate={{latitude: 37.78825,
         longitude: -122.4324}}
         title='Title'
      />
      <View style={{flex: 1, alignItems: 'center'}}>
      <TouchableOpacity onPress={this.category.bind(this)}>
      <Text
      style={{borderColor: 'white', borderWidth: 1, marginTop: 150, backgroundColor: 'white', width: 275, padding: 15, color: 'grey', textAlign: 'center', fontSize: 18}}
      placeholder= 'Select a category'
      >Find things to do...</Text>
      </TouchableOpacity>
      </View>

      </MapView>
      </View>
    )
  }
}
var sports = [{name: 'Baseball'}, {name: 'Basketball'},{name: 'Beach Volleyball'},{name: 'Hiking'},{name: 'Running'},{name: 'Soccer'},{name: 'Tennis'}];
class Categories extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(sports),

    }
  }
  render(){
    return (
      <View style={{flex: 1}}>
      <List>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
                <TouchableOpacity>
                <ListItem>
                    <Text>{rowData.name}</Text>
                </ListItem>
                </TouchableOpacity>
        }
      />
      </List>

      </View>
    )


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 10,
    backgroundColor: 'transparent',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


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

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
