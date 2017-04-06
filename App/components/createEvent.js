import React, { Component, PropTypes } from 'react';
import { AppRegistry, ScrollView, StyleSheet,
  Text, View, TextInput, TouchableOpacity, NavigatorIOS,
  ListView, Alert, AsyncStorage, TouchableHighlight, ImagePickerIOS, Image } from 'react-native';
  import { Container, Content, Left, Body, Header, Right, ListItem, Thumbnail, Card, Title, CardItem, Icon, Item, Input, Label,  Button} from 'native-base';
  import { connect } from 'react-redux';
  import Swiper from 'react-native-swiper';
  import { bindActionCreators } from 'redux';
  import randomcolor from 'randomcolor';
  import * as actionCreators from '../actions/initialAction';
  import * as loginAction from '../actions/loginAction';

  var t = require('tcomb-form-native');
  var Form = t.form.Form;

  const nameofthecategory = t.enums.of([
    'Music',
    'Art',
    'Sport'
  ], 'nameofthecategory');

  const typeofroom = t.enums.of([
    'Public',
    'Private',
    'Public - Friend Join Only'
  ], 'typeofroom');

  var capacity = t.refinement(t.Number, function (n) { return n > 0; });

  capacity.getValidationErrorMessage = function (value, path, context) {
    return 'capacity cannot be less than zero: ' + context.locale;
  };

  var Activity = t.struct({
    activityTitle: t.String,
    activityDescription: t.String,
    activityLocation: t.String,
    activityCategory: nameofthecategory,
    timeStart: t.Date,
    timeEnd: t.Date,
    typeofRoom: typeofroom,
    activityCapacity: capacity
  });

  var options = {
    auto: 'placeholders',
    fields: {
      timeStart: {
        mode: 'time'
      }
    }
  };


  var CreateEvent = React.createClass({

    getInitialState() {
      return {
        value: {
          activityTitle: "",
          activityDescription: "",
          actvityLocation: "",
          activityCategory: "",
          typeofRoom: "",
          actvityCapacity: ""
        },
        photoData: null
      };
    },

    pickImage() {
      // openSelectDialog(config, successCallback, errorCallback);
      var date = Date.now();
      var imgTitle =  this.props.profile.userObject.email + date + '.jpg';
      ImagePickerIOS.openSelectDialog({},
        resp => {
          var formData = new FormData();
          formData.append('file', {
            uri: resp,
            type: 'image/jpeg',
            name:  imgTitle
          });
          this.setState({photoData: formData});
          //    fetch('http://localhost:8080/postToS3', {
          //      method: 'POST',
          //      headers: {
          //        'Content-Type': 'multipart/form-data'
          //      },
          //      body: formData
          //    })
          //    .then(resp => resp.json())
          //    .then(resp => {
          //      console.log('success upload', resp);
          //      photo = resp.file.location;
          //    })
          //    .catch(resp => console.log('err upload', resp));
        },
        resp => console.log('err', resp));
        // console.log("IMAGE PICKER IOS", ImagePickerIOS.openSelectDialog)

      },

      onChange(value) {
        this.setState({ value });
      },

      onPress: function (){
        var self = this
        console.log("PHotoData", self.state.photoData)
        var s3 = function(self){
          console.log("IN S3")
          return fetch('http://localhost:8080/postToS3', {
              method: 'POST',
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              body: photo
            })
            .then(resp => resp.json())
            .then(resp => {
              console.log('success upload', resp.file.location);
              copy["activityImages"] = [resp.file.location];
              return copy;
            })
        }
        var createActivity = function() {
          console.log("CreactActivity", copy)
          return fetch("http://localhost:8080/createActivity", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              activity: copy
            })
          })
        }
        var doMyShit = function(photoAdded){
          console.log("IS PHOTO ADDED", photoAdded)
          if (photoAdded){
            return s3(self).then(createActivity).catch((resp => console.log('err upload', resp)));
          } else {
            return createActivity().catch((resp => console.log('err upload', resp)));
          }
        }
        var value = this.refs.form.getValue();
        if (value) {
          var copy = Object.assign({}, value);
          copy["activityCreator"] = this.props.profile.userObject._id
          var photoAdded = (!!this.state.photoData);
          if (photoAdded) {
            var photo = this.state.photoData;
          }
          this.setState({value: null, photoData: null});
          console.log(photoAdded)
          doMyShit(photoAdded);

        }
        //   fetch('http://localhost:8080/postToS3', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     },
        //     body: photoData
        //   })
        //   .then(resp => resp.json())
        //   .then(resp => {
        //     console.log('success upload', resp);
        //     copy["activityImages"] = [resp.file.location];
        //   }).then(() => {
        //     fetch("http://localhost:8080/createActivity", {
        //       method: 'POST',
        //       headers: {
        //         "Content-Type": "application/json"
        //       },
        //       body:
        //       JSON.stringify({
        //         activity: copy
        //       })
        //     })
        //     photoData = null;
        //   }).catch(resp => console.log('err upload', resp));
        // }
        // this.setState({photo: ["defaultimage.jpg"]});
      },

      render() {
        const { profile } = this.props;
        return(
          <View style={styles.container}>
          <Text style={{fontSize: 25, fontWeight: '700', color: '#323232', marginTop: 20}}>Create An Activity </Text>
          <ScrollView keyboardShouldPersistTaps="always" style={{paddingLeft:10,paddingRight:10, height:500}}>
          <Form
          ref="form"
          type={Activity}
          options={options}
          value={this.state.value}
          onChange ={this.onChange.bind(this)}
          />
          <TouchableHighlight style={styles.button} onPress={this.pickImage} underlayColor = '#99d9f4'>
          <Text style={styles.buttonText}>Upload Photo</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
          </ScrollView>

          </View>

        )
      }

    })

    var styles = StyleSheet.create({
      container: {
        justifyContent: 'center',
        marginTop: 20,
        padding: 20,
        backgroundColor: '#ffffff',
      },
      title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
      },
      buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
      },
      button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
      }
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
        actions: bindActionCreators(actionCreators, dispatch)
      };
    }

    export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
