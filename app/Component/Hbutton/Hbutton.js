import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'native-base';
import styles from './HbuttonStyle'

class Hbutton extends Component {
    render() {
        const  {...props} = this.props;
        
        return (
            <View>
            <Button {...props} style={[styles.defaultButtonStyle, this.props.style]} >
            <Text style={[styles.defaultButtonTextStyle, this.props.BtnTextstyle]}>{this.props.btnText}</Text>
            </Button>
            </View>
        )
    }
}

export default Hbutton