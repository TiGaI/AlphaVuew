import React, { Component, PropTypes } from 'react';
import {
  AppRegistry, ScrollView, StyleSheet, View, TextInput, TouchableOpacity, NavigatorIOS,
  ListView, Alert, Image } from 'react-native';
import { Container, Content, Left, Body, Right, Text, ListItem, Thumbnail, Card, CardItem, Button, Tabs, Tab } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper'
import styles from './styles'

import MapView from 'react-native-maps';
import randomcolor from 'randomcolor';

import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/initialAction';
import * as loginAction from '../actions/loginAction';

import { connect } from 'react-redux';

import CreateEvent from './createEvent';


var image5 = {uri: 'https://www.thisiscolossal.com/wp-content/uploads/2016/03/finger-4.jpg'}
var image4 = {uri: 'https://cdn.playbuzz.com/cdn/b19cddd2-1b79-4679-b6d3-1bf8d7235b89/93794aec-3f17-47a4-8801-a2716a9c4598_560_420.jpg'}
var image3 = {uri: 'https://iso.500px.com/wp-content/uploads/2016/04/STROHL__ST_1204-Edit-1500x1000.jpg'}
var image2 = {uri: 'https://static.pexels.com/photos/2855/landscape-mountains-nature-lake.jpg'}
var image1 = {uri: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Two_dancers.jpg'}

var favs = [
{name:"DANCE", homes : 18, image: image1},
{name:"OUTDOORS", homes : 4, image: image2},
{name:"TRAVEL", homes : 5, image: image3},
{name:"ART", homes : 22, image: image4},
{name:"ART", homes : 18, image: image5}
]

class ProfilePage extends Component{
  constructor(props){
    super(props)
  }
  viewStyle() {
    return {
      flex: 2,
      backgroundColor: 'white',
      justifyContent: 'center'
    }
  }
  addEvent(){
    console.log('TRYING TO GO TO CREATE EVENT PAGE', this.props)
    // this.props.navigator.replace({
    //   component: CreateEvent
    // })
  }
  addFriend(){
    const {userObject} = this.props.profile;
    const {activitiesPageState, actions} =this.props;
    actions.sendFriendRequest(userObject._id , activitiesPageState.selectedActivityOwner)
  }
  render(){
    const {userObject} = this.props.profile;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(userObject.activities);

    if(userObject){
      const profileImg = userObject.profileImg;
      console.log('this is looking for the profile image',profileImg)
    }


    return (
        <View>
        { userObject !== null ? (  <Swiper
            loop={false}
            showsPagination={false}
            index={1}>

            <Swiper
              horizontal={false}
              loop={false}
              showsPagination={false}
              index={1}>

              <View style={this.viewStyle()}>
                <Container>
                  <Content>
                    <View style={styles.profileBox}>
                      <Thumbnail style={{marginTop: 10, height: 100, width: 100, borderRadius: 50}} source={{uri: userObject.profileImg }} />
                      <Text style={{textAlign: 'center', fontWeight: '400', fontSize: 25, marginTop: 5}}>{userObject.firstName + " " + userObject.lastName}</Text>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableOpacity style={{flex: 1}} onPress={this.addEvent.bind(this)}>
                        <View style={{flex: 1, backgroundColor: '#00A8BE', alignItems: 'center', padding: 12,
                         margin: 20, borderRadius: 35}}>
                         <Text style={{color: 'white', fontWeight: '500', letterSpacing: 1}}>CREATE EVENT</Text>
                         </View>
                          </TouchableOpacity>
                      </View>
                      <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', padding: 10,
                      borderColor: 'lightgrey', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0,marginLeft: 10}}>
                          <Text>{userObject.connections.length}</Text>
                          <Text style={{fontSize: 12, color: 'grey'}}>FOLLOWERS</Text>
                        </View>
                        <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', padding: 10,
                      borderColor: 'lightgrey', borderStyle: 'solid', borderWidth: 1}}>
                          <Text>{userObject.activities.length}</Text>
                          <Text style={{fontSize: 12, color: 'grey'}}>EVENTS</Text>
                        </View>
                        <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', padding: 10,
                      borderColor: 'lightgrey', borderStyle: 'solid', borderWidth: 1, borderRightWidth: 0, borderLeftWidth: 0, marginRight: 10}}>
                          <Text>{userObject.connections.length}</Text>
                          <Text style={{fontSize: 12, color: 'grey'}}>FOLLOWING</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <TouchableOpacity style={{flex: 1}} onPress={this.border}>
                        <View style={{flex: 1, margin: 10, marginTop: 20}}><Text style={{fontSize: 12, color: 'grey', textAlign: 'center'}}>MY EVENTS</Text></View>
                      </TouchableOpacity>
                      <TouchableOpacity style={{flex: 1}} onPress={this.border}>
                        <View style={{flex: 1, margin: 10, marginTop: 20}}><Text style={{fontSize: 12, color: 'grey', textAlign: 'center'}}>IMAGES</Text></View>
                      </TouchableOpacity>
                    </View>
                    <View style={{flex:1, padding: 20, marginTop:-10}}>
                      <ListView
                      dataSource = {dataSource}
                      renderRow={(rowData) =>
                        <TouchableOpacity >
                        <Image source={{uri: 'https://iso.500px.com/wp-content/uploads/2016/04/STROHL__ST_1204-Edit-1500x1000.jpg'}} resizeMode="stretch" style={{width:150, height:150, marginRight: 10, justifyContent:'flex-end', alignItems:'center', padding: 15}}>
                        </Image>
                        <Text style={{backgroundColor:'rgba(0,0,0,0)', textAlign:'left', color:'black', fontSize:17, fontWeight:'500'}}>{rowData.activityTitle}</Text>

                        </TouchableOpacity>
                      }
                      horizontal = {true}
                      showsHorizontalScrollIndicator = {false}
                      onEndReachedThreshold = {500}
                      />

                    </View>
                  </Content>
                </Container>
              </View>


            </Swiper>

          </Swiper>
) : null}
        </View>
    )
  }
}

function mapStateToProps(state) {
  console.log("this is state inside of ProfilePage: ", state)
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
