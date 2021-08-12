import React, {Component} from 'react';
import {Modal, Text, View, Alert, TouchableOpacity, Image} from 'react-native';
import {Card} from 'native-base';
import {TextView} from 'app/Component';
import styles from './HNoInternetStyle';
import {nointernetIcon} from 'app/assets';
import {noInternet, oppsTextImage} from '../../assets';

class NoInternet extends Component {
  state = {
    modalVisible: true,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleRetry = () => {
    this.props.onRetry && this.props.onRetry();
  };
  render() {
    return (
      <Modal
        // animationType="slide"
        transparent={true}
        visible={this.props.isInternetConnected}
        onRequestClose={() => {}}>
        <View style={styles.mainView}>
          <Image style={styles.imageStyle} source={noInternet} />
          <View style={styles.innerView}>
            {/* <TextView style={styles.headerMsg} >{'NO INTERNET CONNECTION'}</TextView> */}
            <Image style={styles.oppsImageTextStyle} source={oppsTextImage} />
            <TextView style={styles.bodyMsg}>{'something went wrong'}</TextView>
            {/* <View style={{margin:30}}> */}
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={this.handleRetry}>
              <TextView style={styles.buttonTextStyle}>{'Retry'}</TextView>
            </TouchableOpacity>
            {/* </View> */}
          </View>
        </View>
      </Modal>
    );
  }
}

export default NoInternet;
