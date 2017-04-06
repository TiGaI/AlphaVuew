import React, { Component, PropTypes } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity
} from 'react-native';

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPress}>
                <Text style={{backgroundColor: '#00A8BE',
                color: 'white', fontSize: 20, borderWidth: 3, borderColor: 'white', padding: 20, borderRadius: 5}}> Login With Facebook </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#00A8BE'
  }
})

Login.propTypes = {
    onPress: PropTypes.func.isRequired
};

export default Login;
