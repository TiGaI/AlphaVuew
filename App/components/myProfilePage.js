import React, { Component, PropTypes } from 'react';
import {
  AppRegistry, ScrollView, StyleSheet, View, TextInput, TouchableOpacity, NavigatorIOS,
  ListView, Alert, Image, Animated } from 'react-native';
import { Container, Content, Left, Body, Right, Text, ListItem, Thumbnail, Card, CardItem, Tabs, Tab } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import styles from './styles';

import MapView from 'react-native-maps';
import { Button, SocialIcon } from 'react-native-elements'
import randomcolor from 'randomcolor';

import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/initialAction';
import * as loginAction from '../actions/loginAction';
import Chart from 'react-native-chart';

import { connect } from 'react-redux';



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
    this.props.actions.getAllUserActivities(this.props.profile.userObject._id)
  }
  viewStyle() {
    return {
      flex: 2,
      backgroundColor: 'white',
      justifyContent: 'center'
    }
  }
  addFriend(){
    const {userObject} = this.props.profile;
    const {activitiesPageState, actions} =this.props;
    actions.sendFriendRequest(userObject._id , activitiesPageState.selectedActivityOwner)
  }
  render(){
    const {userObject} = this.props.profile;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(favs);
    const dataSource1 = ds.cloneWithRows(favs);
    var dataSourceMain = '';

    var x = false;
    console.log('PROFILE PAGE PROPS IN RENDER', this.props)

    if(this.props.activitiesPageState.allUserActivities.length > 0){
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      const dataSource = ds.cloneWithRows(favs);

      console.log('ALLL ACTIVITIES IN OBJECTSSSSS',this.props.activitiesPageState.allUserActivities[0])
      var totalHoursArray = [];
      var totalHoursObjectPerDay = {};
      var perDayObject = {};
      var totalStudyingHours = 0;
      var Exercise = null;
      var Entertainment = null;
      var Food = null;
      var Hobbies = null;
      var Relaxing = null;
      var Studying = null;

      // var totalHoursPerDay = 0;
      this.props.activitiesPageState.allUserActivities[0].map(function(perDay){
        if(perDay.hasOwnProperty('Entertainment')){


          totalHoursPerDay = perDay.Entertainment.reduce(function(totalHours, nextObject){
            totalHours.activityDuration += nextObject.activityDuration;
            return totalHours
          })
          if(typeof totalHoursPerDay === "object"){
              perDayObject['Entertainment'] = totalHoursPerDay.activityDuration;
              Entertainment = {'Entertainment': totalHoursPerDay.activityDuration};
          }else{
              perDayObject['Entertainment'] = totalHoursPerDay;
              Entertainment = {'Entertainment': totalHoursPerDay};
          }
        }
        if(perDay.hasOwnProperty('Exercise')){


          totalHoursPerDay = perDay.Exercise.reduce(function(totalHours, nextObject){
            totalHours.activityDuration += nextObject.activityDuration;
            return totalHours
          })
          if(typeof totalHoursPerDay === "object"){
              perDayObject['Exercise'] = totalHoursPerDay.activityDuration;
              Exercise = {'Exercise': totalHoursPerDay.activityDuration};
          }else{
              perDayObject['Exercise'] = totalHoursPerDay;
              Exercise = {'Exercise': totalHoursPerDay};
          }
        }

        if(perDay.hasOwnProperty('Food')){
          console.log('perDay food', perDay)


          totalHoursPerDay = perDay.Food.reduce(function(totalHours, nextObject){
            totalHours.activityDuration += nextObject.activityDuration;
            return totalHours
          })
          if(typeof totalHoursPerDay === "object"){
              perDayObject['Food'] = totalHoursPerDay.activityDuration;
              console.log('FOOOOOD', perDayObject )
              Food = {'Food': totalHoursPerDay.activityDuration};
          }else{
              perDayObject['Food'] = totalHoursPerDay;
              Food = {'Food': totalHoursPerDay};
          }
        }

        if(perDay.hasOwnProperty('Hobbies')){
          console.log('perDay Hobbies', perDay)
          console.log('perDay Hobbies per hobbbies', perDay.Hobbies)


          totalHoursPerDay = perDay.Hobbies.reduce(function(totalHours, nextObject){

            totalHours.activityDuration += nextObject.activityDuration;
            return totalHours
          })

          if(typeof totalHoursPerDay === "object"){
              perDayObject['Hobbies'] = totalHoursPerDay.activityDuration;
              Hobbies = {'Hobbies': totalHoursPerDay.activityDuration};
          }else{
              perDayObject['Hobbies'] = totalHoursPerDay;
              Hobbies = {'Hobbies': totalHoursPerDay};
          }
        }


        if(perDay.hasOwnProperty('Relaxing')){


          totalHoursPerDay = perDay.Relaxing.reduce(function(totalHours, nextObject){
            totalHours.activityDuration += nextObject.activityDuration;
            return totalHours
          })
          if(typeof totalHoursPerDay === "object"){
              perDayObject['Relaxing'] = totalHoursPerDay.activityDuration;
              Relaxing = {'Relaxing': totalHoursPerDay.activityDuration};
          }else{
              perDayObject['Relaxing'] = totalHoursPerDay;
              Relaxing = {'Relaxing': totalHoursPerDay};
          }
        }


        if(perDay.hasOwnProperty('Studying')){


          totalHoursPerDay = perDay.Studying.reduce(function(totalHours, nextObject){
            totalHours.activityDuration += nextObject.activityDuration;
            return totalHours
          })
          if(typeof totalHoursPerDay === "object"){
              perDayObject['Studying'] = totalHoursPerDay.activityDuration;
              Studying = {'Studying': totalHoursPerDay.activityDuration};
          }else{
              perDayObject['Studying'] = totalHoursPerDay;
              Studying = {'Studying': totalHoursPerDay};
          }

        }
          totalHoursObjectPerDay[perDay.date] = {
              Entertainment,
              Exercise,
              Food,
              Hobbies,
              Relaxing,
              Studying,
              date: perDay.date


          };
          Entertainment = 0;
          Exercise = 0;
          Food = 0;
          Hobbies = 0;
          Relaxing = 0;
          Studying = 0;
      })
      totalHoursArray.push(totalHoursObjectPerDay);
      console.log('I HOPPPPPEEEE THIIISSSS WORKSSSS TOOOOO',totalHoursObjectPerDay)
      console.log('I HOPPPPPEEEE THIIISSSS WORKSSSS',totalHoursArray)
      const profileImg = userObject.profileImg;
      console.log('DATAAAAAAAAAAAAAAAAAAAAA', dataSourceMain)
      x = true;
      dataSourceMain = ds.cloneWithRows(totalHoursArray[0])

    }

    return (
        <View style={{flex: 1}}>
        { x === true  && this.props.activitiesPageState.allUserActivities.length === 1 ? (  <Swiper
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
                  <View style={{flex: 1, backgroundColor: 'grey'}}>
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#00A8BE', padding: 10}}>
                      <View style={{flex: 1, backgroundColor:'white', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                      <Thumbnail style={{ height: 140, width: 140, borderRadius: 70}} source={{uri: userObject.profileImg }} />
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 18, marginTop: 5}}>{userObject.firstName + " " + userObject.lastName}</Text>
                      </View>

                      <View style={{flex: 1, backgroundColor:'white', justifyContent: 'center', alignItems: 'center', padding: 10}}>

                      <View style={{flex: 1, flexDirection: 'row'}}>
                      <Icon style={{fontSize: 35, color: '#00A8FF', flex: 1, textAlign: 'center'}} name='md-people'></Icon>
                      <View style={{flex: 2}}>
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 12, marginTop: 5}}>Followers</Text>
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 15, marginTop: 0}}>1,023</Text>
                      </View>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                      <Icon style={{flex: 1,fontSize: 35, color: '#FF514E', textAlign: 'center'}} name='md-pin'></Icon>
                      <View style={{flex: 2}}>
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 12, marginTop: 5}}>Pins Created</Text>
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 15, marginTop: 0}}>24</Text>
                      </View>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                      <Icon style={{flex: 1,fontSize: 35, color: '#41A36A', textAlign: 'center'}} name='ios-navigate'></Icon>
                      <View style={{flex: 2}}>
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 12, marginTop: 5}}>Pinned Hours</Text>
                      <Text style={{textAlign: 'left', fontWeight: '400', fontSize: 15, marginTop: 0}}>5</Text>
                      </View>
                      </View>
                      </View>
                      </View>
                      <View style={{flex: 1, backgroundColor: '#00A8BE', padding: 10, marginTop: 0}}>
                      <ListView
                          dataSource={dataSourceMain}
                          renderRow={(rowData) => <View style={{backgroundColor: 'white', marginBottom: 5, padding: 0, backgroundColor: 'grey'}}>
                          {console.log('ROOOOOOWWWWWWWDDAAAAATTTTAAA',rowData)}

                            <Tabs locked={true}>
                                <Tab heading="Stats" tabBgColor='#00A8BE'>
                                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', padding: 5, marginTop: 10}}>
                                  <Text style={{fontWeight: '400', margin: 5, fontSize: 15}}>Date: {rowData.date}</Text>
                                  <View style={{flex: 1, marginTop: 5, marginBottom: 5}}>
                                        <Text style={styles1.label}>Entertainment.</Text>
                                        <View style={styles1.data}>

                                            <Animated.View style={[styles1.bar, styles1.Entertainment, {width: (rowData.Entertainment === 0) ? (0) : (rowData.Entertainment.Entertainment)*20}]} />

                                          <Text style={styles1.dataNumber}>{(rowData.Entertainment === 0) ? (0) : (rowData.Entertainment.Entertainment)}</Text>
                                        </View>
                                  </View>
                                  <View style={{flex: 1, marginTop: 5, marginBottom: 5}}>
                                        <Text style={styles1.label}>Exercise</Text>
                                        <View style={styles1.data}>

                                            <Animated.View style={[styles1.bar, styles1.Exercise, {width: (rowData.Exercise === 0) ? (0) : (rowData.Exercise.Exercise)*20}]} />

                                          <Text style={styles1.dataNumber}>{(rowData.Exercise === 0) ? (0) : (rowData.Exercise.Exercise)}</Text>
                                        </View>
                                  </View>
                                  <View style={{flex: 1, marginTop: 5, marginBottom: 5}}>
                                        <Text style={styles1.label}>Food</Text>
                                        <View style={styles1.data}>

                                            <Animated.View style={[styles1.bar, styles1.Food, {width: (rowData.Food === 0) ? (0) : (rowData.Food.Food)*20}]} />

                                          <Text style={styles1.dataNumber}>{(rowData.Food === 0) ? (0) : (rowData.Food.Food)}</Text>
                                        </View>
                                  </View>
                                  <View style={{flex: 1, marginTop: 5, marginBottom: 5}}>
                                        <Text style={styles1.label}>Hobbies</Text>
                                        <View style={styles1.data}>

                                            <Animated.View style={[styles1.bar, styles1.Hobbies, {width: (rowData.Hobbies === 0) ? (0) : (rowData.Hobbies.Hobbies)*20}]} />

                                          <Text style={styles1.dataNumber}>{(rowData.Hobbies === 0) ? (0) : (rowData.Hobbies.Hobbies)}</Text>
                                        </View>
                                  </View>
                                  <View style={{flex: 1, marginTop: 5, marginBottom: 5}}>
                                        <Text style={styles1.label}>Relaxing</Text>
                                        <View style={styles1.data}>

                                            <Animated.View style={[styles1.bar, styles1.Relaxing, {width: (rowData.Relaxing === 0) ? (0) : (rowData.Relaxing.Relaxing)*20}]} />

                                          <Text style={styles1.dataNumber}>{(rowData.Relaxing === 0) ? (0) : (rowData.Relaxing.Relaxing)}</Text>
                                        </View>
                                  </View>
                                  <View style={{flex: 1, marginTop: 5, marginBottom: 5}}>
                                        <Text style={styles1.label}>Studying</Text>
                                        <View style={styles1.data}>

                                            <Animated.View style={[styles1.bar, styles1.Studying, {width: (rowData.Studying === 0) ? (0) : (rowData.Studying.Studying*10)}]} />

                                          <Text style={styles1.dataNumber}>{(rowData.Studying === 0) ? (0) : (rowData.Studying.Studying)}</Text>
                                        </View>
                                  </View>

                                  </View>

                                  <View style={{flexDirection: 'row', marginTop: 10}}>
                                    <Icon style={{flex: 1,fontSize: 30, color: '#FF514E', textAlign: 'center'}} name='md-pie'>{"\n"}<Text style={{color: 'black', fontSize: 15}}>Hours</Text></Icon>
                                    <Icon style={{flex: 1,fontSize: 30, color: '#FF514E', textAlign: 'center'}} name='md-pin'>{"\n"}<Text style={{color: 'black', fontSize: 15}}>Pins</Text></Icon>
                                    <Icon style={{flex: 1,fontSize: 30, color: '#FF514E', textAlign: 'center'}} name='md-calendar'>{"\n"}<Text style={{color: 'black', fontSize: 15}}>Date</Text></Icon>
                                  </View>

                                </Tab>
                                <Tab heading="Images" >
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10}}>
                                <ListView
                                    dataSource={dataSource1}
                                    renderRow={(rowData) => <View><Text>{rowData.name}</Text>
                                    <Image source={rowData.image} resizeMode="stretch" style={{width:150, height:150, marginRight: 5, justifyContent:'flex-end', alignItems:'center'}}>
                                    </Image>
                                    </View>
                                  }
                                  horizontal = {true}
                                  showsHorizontalScrollIndicator = {true}
                                  />

                                  </View>
                                </Tab>
                            </Tabs>
                            </View>

                          }

                      />
                      </View>
                    </View>
                  </Content>
                </Container>
              </View>


            </Swiper>

          </Swiper>
) : (

  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00A8BE'}}>

<Text style={{fontSize: 20, color: 'white'}}>Login to view profile</Text>
    <View style={{  flex: 0,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
   flexDirection: 'row'}}>

      <SocialIcon
        light
        type='facebook'
        onPress={this.props.facebook}
      />

      <SocialIcon
        light
        type='google'
      />

    </View>
  </View>

)}
        </View>
    )
  }
}



// ProfilePage.propTypes = {
//     facebook: PropTypes.func.isRequired,
//     onSkip: PropTypes.func.isRequired
// };
const styles1 = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 6
  },
  // Item
  item: {
    flexDirection: 'column',
    marginBottom: 5,
    paddingHorizontal: 10
  },
  label: {
    color: 'black',
    flex: 1,
    fontSize: 12,
    position: 'relative',
    top: 2
  },
  data: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
    backgroundColor: 'white'
  },
  dataNumber: {
    color: 'black',
    fontSize: 7
  },
  // Bar
  bar: {
    alignSelf: 'flex-start',
    borderRadius: 0,
    height: 20,
    marginRight: 5
  },
  Entertainment: {
    backgroundColor: '#F55443'
  },
  Exercise: {
    backgroundColor: '#FCBD24'
  },
  Food: {
    backgroundColor: '#59838B'
  },
  Hobbies: {
    backgroundColor: '#4D98E4'
  },
  Relaxing: {
    backgroundColor: '#418E50'
  },
  Studying: {
    backgroundColor: '#7B7FEC'
  },
  minutes: {
    backgroundColor: '#3ABAA4'
  },
  // controller
  controller: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15
  },
  button: {
    flex: 1,
    position: 'relative',
    top: -1
  },
  chevronLeft: {
    alignSelf: 'flex-end',
    height: 28,
    marginRight: 10,
    width: 28
  },
  chevronRight: {
    alignSelf: 'flex-start',
    height: 28,
    marginLeft: 10,
    width: 28
  },
  date: {
    color: '#6B7C96',
    flex: 1,
    fontSize: 22,
    fontWeight: '300',
    height: 28,
    textAlign: 'center'
  }

})


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
