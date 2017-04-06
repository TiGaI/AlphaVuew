import React, { Component, PropTypes } from 'react';
import { AppRegistry, ScrollView, StyleSheet, Text, View,
  TextInput, TouchableOpacity, NavigatorIOS, ListView, Alert, AsyncStorage, Image } from 'react-native';
import { Item, Input, Tab, Tabs,Spinner } from 'native-base';

import Swiper from 'react-native-swiper'
import randomcolor from 'randomcolor'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/initialAction';
import * as loginAction from '../actions/loginAction';

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

class ActivitiesPage extends Component {
  constructor(props){
    var prevCategory = events.prev("Sport");
    var nextCategory = events.next("Sport");
    super(props);
    this.props.actions.populatedActivities("Sport", prevCategory, nextCategory, 10 )
  }
  viewStyle() {
    return ({
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    });
  }
  press(val) {
    this.props.loginActions.getMyActivitiesInfor(val.activityCreator[0]._id, val);
    this.props.navigator.push({
      component: DetailEvent,
      passProps: val,
      backButtonTitle: 'Main'
    });
  }
  endReached(){
    const {activitiesPageState, actions} = this.props
    var category = activitiesPageState.category;

    var prevCategory = events.prev(category);
    var nextCategory = events.next(category);
    var length = activitiesPageState.populatedActivities.length + 10
    actions.populatedActivities(category, prevCategory, nextCategory, length );
  }
  _onMomentumScrollEnd(evt, state, context){
    const {activitiesPageState, actions } = this.props
    if (context.state.index === 0) {
      var index = 2;
    } else {
      var index = context.state.index - 1
    }
    var category = events[index]
    var prevCategory = events.prev(category);
    var nextCategory = events.next(category);
    var length = activitiesPageState.populatedActivities.length + 10
    actions.populatedActivities(category, prevCategory, nextCategory, length)

  }
  render() {
    const {activitiesPageState} = this.props

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const dataSource = ds.cloneWithRows(activitiesPageState.populatedActivities.currCategory)
    const dataSourcePrev = ds.cloneWithRows(activitiesPageState.populatedActivities.prevCategory)
    const dataSourceNext = ds.cloneWithRows(activitiesPageState.populatedActivities.nextCategory)

    return(
      <View>
      {activitiesPageState.populatedActivities.currCategory.length > 0 ? (
        <View style={{flex:1}}>
          <View style={{flex:1}}>
          <ScrollView style={{flex:1}}>
          <View style={styles.container2}>

          </View>
          </ScrollView>
          </View>
          <Swiper
          loop={false}
          showsPagination={false}
          index={0}>
          <Swiper
            horizontal={false}
            loop={false}
            showsPagination={false}
            index={0}
            onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
            >
            <Swiper
              horizontal = {false}
              loop = {false}
              showsPagination = {false}
              index = {1}
              >
            <View style={{flex: 1, marginTop: 45}}>
                <View style={{flex: 2, justifyContent: 'center', padding: 0}}>
                  <ListView
                  dataSource = {dataSourcePrev}
                  renderRow={(val) =>
                    <TouchableOpacity onPress={this.press.bind(this, val)}>
                    <Image source={{uri: 'https://iso.500px.com/wp-content/uploads/2016/04/STROHL__ST_1204-Edit-1500x1000.jpg'}} resizeMode="stretch" style={{width:350, height:400, marginRight: 10, justifyContent:'flex-end', alignItems:'flex-start', padding: 10}}>
                    <Text style={{backgroundColor:'rgba(0,0,0,0)', textAlign:'center', color:'#fff', fontSize:25, fontWeight:'700', marginLeft: 10}}>{val.activityTitle}</Text>
                    <Text style={{backgroundColor:'rgba(0,0,0,0)', color:'#fff',fontSize:14, fontWeight:'600', marginLeft: 10}}>Hosted by {val.activityCreator[0].firstName} </Text>
                    </Image>
                    </TouchableOpacity>
                  }
                  horizontal = {true}
                  showsHorizontalScrollIndicator = {false}
                  onEndReachedThreshold = {500}
                  onEndReached={this.endReached.bind(this)}
                  />
                </View>
                <View style={{flex: 1, justifyContent: 'flex-start', backgroundColor: '#00A8BE', padding: 10}}>
                <Text style={{fontWeight: '500', fontSize: 25, color: 'white', textAlign: 'left', marginLeft: 10}}>{events.prev(activitiesPageState.category)}</Text>
                <Text numberOfLines={5} style={{fontSize: 15, fontWeight: '400', color: 'white' , marginTop: 10, textAlign: 'left', marginLeft: 10}}>Enjoy the sights and sounds of local music.
                Hangout with friends and experience the best talent in your area. Go out and show the world your passion in music.
                </Text>
                </View>
              </View>
            <View style={{flex: 1, paddingTop: 45}}>
                <View style={{flex: 2, justifyContent: 'center', padding: 0}}>
                  <ListView
                  dataSource = {dataSource}
                  renderRow={(val) =>
                    <TouchableOpacity onPress={this.press.bind(this, val)}>
                    <Image source={{uri: 'https://iso.500px.com/wp-content/uploads/2016/04/STROHL__ST_1204-Edit-1500x1000.jpg'}} resizeMode="stretch" style={{width:350, height:400, marginRight: 10, justifyContent:'flex-end', alignItems:'flex-start', padding: 10}}>
                    <Text style={{backgroundColor:'rgba(0,0,0,0)', textAlign:'center', color:'#fff', fontSize:25, fontWeight:'700', marginLeft: 10}}>{val.activityTitle}</Text>
                    <Text style={{backgroundColor:'rgba(0,0,0,0)', color:'#fff',fontSize:14, fontWeight:'600', marginLeft: 10}}>Hosted by {val.activityCreator[0].firstName} </Text>
                    </Image>
                    </TouchableOpacity>
                  }
                  horizontal = {true}
                  showsHorizontalScrollIndicator = {false}
                  onEndReachedThreshold = {500}
                  onEndReached={this.endReached.bind(this)}
                  />
                </View>
                <View style={{flex: 1, justifyContent: 'flex-start', backgroundColor: '#00A8BE', padding: 10}}>
                <Text style={{fontWeight: '500', fontSize: 25, color: 'white',textAlign: 'left', marginLeft: 10}}>{activitiesPageState.category}</Text>
                <Text numberOfLines={5} style={{fontSize: 15, fontWeight: '400', color: 'white' , marginTop: 10, textAlign: 'justify',textAlign: 'left', marginLeft: 10}}>Hangout with other local athletes
                in the area. If you are looking for a pickup game or just want to practice some drills, there is always someone in the area to play with.
                </Text>
                </View>
              </View>
              <View style={{flex: 1, paddingTop: 45}}>
                  <View style={{flex: 2, justifyContent: 'center', padding: 0}}>
                    <ListView
                    dataSource = {dataSourceNext}
                    renderRow={(val) =>
                      <TouchableOpacity onPress={this.press.bind(this, val)}>
                      <Image source={{uri: 'https://iso.500px.com/wp-content/uploads/2016/04/STROHL__ST_1204-Edit-1500x1000.jpg'}} resizeMode="stretch" style={{width:350, height:400, marginRight: 10,
                      justifyContent:'flex-end', alignItems:'flex-start', padding: 10}}>
                      <Text style={{backgroundColor:'rgba(0,0,0,0)', textAlign:'center', color:'#fff', fontSize:25, fontWeight:'700', marginLeft: 10}}>{val.activityTitle}</Text>
                      <Text style={{backgroundColor:'rgba(0,0,0,0)', color:'#fff',fontSize:14, fontWeight:'600', marginLeft: 10}}>Hosted by {val.activityCreator[0].firstName} </Text>
                      </Image>
                      </TouchableOpacity>
                    }
                    horizontal = {true}
                    showsHorizontalScrollIndicator = {false}
                    onEndReachedThreshold = {500}
                    onEndReached={this.endReached.bind(this)}
                    />
                  </View>
                  <View style={{flex: 1, justifyContent: 'flex-start', backgroundColor: '#00A8BE', padding: 10}}>
                  <Text style={{fontWeight: '500', fontSize: 25, color: 'white', textAlign: 'left', marginLeft: 10}}>{events.next(activitiesPageState.category)}</Text>
                  <Text numberOfLines={5} style={{fontSize: 15, fontWeight: '400', color: 'white' , textAlign: 'left', marginTop: 10, marginLeft: 10}}>Inspire the world with your creative talents.
                  Show locals how artistic you are and share anything you have made.
                  </Text>
                  </View>
                </View>
              </Swiper>
          </Swiper>
        </Swiper>
        </View>
      ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesPage);
