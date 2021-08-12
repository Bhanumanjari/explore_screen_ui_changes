import React from 'react';
import {Text,} from 'react-native';
import styles from './HTextViewStyle'

export default class CustomText extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const  {...props} = this.props;
        return (
            <Text  {...props} style={[styles.defaultStyle, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

