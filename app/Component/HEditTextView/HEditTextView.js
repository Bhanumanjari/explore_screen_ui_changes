import React from 'react';
import {TextInput, View, Image, TouchableOpacity,Platform} from 'react-native';
import styles from './HEditTextViewStyle'
import {TextView} from "app/Component";
import PropTypes from "prop-types";
import {color} from "app/Theme";
import cs from 'app/CommonStyle'
import KeyboardManager, { PreviousNextView } from 'react-native-keyboard-manager'

class EditTextView extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (Platform.OS === 'ios') {
            KeyboardManager.setToolbarPreviousNextButtonEnable(true);
        }
    }
    render() {
        const {onPress, label, labelStyle, inputStyle, rightIcon, rightIconClick, disable, value, ...props} = this.props;

        return (
            <View>
                <TextView style={[{fontSize: 10}, labelStyle]}>{label.toUpperCase()}</TextView>
                {disable ? <TouchableOpacity onPress={() => {
                    onPress && onPress()
                }}>
                    <TextView
                        {...props}
                        placeholderTextColor={color._555555}
                        style={[{paddingTop: 5, paddingBottom: 5}, inputStyle]}
                    >{value}</TextView><View style={[cs.lines, {marginBottom: 10}]}/></TouchableOpacity> : <TextInput
                    {...props}
                    placeholderTextColor={color._555555}
                    style={[styles.inputbox, inputStyle]}
                >{value}</TextInput>}
                {rightIcon && <TouchableOpacity
                    onPress={() => {
                        rightIconClick && rightIconClick()
                    }}
                    style={{
                        position: 'absolute',
                        right: 10,
                        bottom: 15
                    }}>
                    <Image source={rightIcon} style={{
                        height: 24,
                        width: 24,
                        resizeMode: 'contain',
                        tintColor:color._919191
                    }}/></TouchableOpacity>}
            </View>
        );
    }
}

export default EditTextView

EditTextView.propTypes = {
    label: PropTypes.string,
    disable: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    labelStyle: PropTypes.any,
    rightIcon: PropTypes.any,
    rightIconClick: PropTypes.func,
    onPress: PropTypes.func
};

EditTextView.defaultProps = {
    placeholder: "",
    value: "",
    rightIcon: undefined,
    rightIconClick: undefined,
    onPress: undefined,
    label: "label",
    disable: false
};
