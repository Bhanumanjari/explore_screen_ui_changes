import {Text, View, Image, TouchableOpacity, TextInput} from "react-native";
import React, {PureComponent} from "react";
import styles from "./HSearchViewStyle";
import PropTypes from "prop-types";
import {color} from "app/Theme";
import cs from 'app/CommonStyle'
import {BarLoader} from "../index";
import {Container} from "native-base";

class SearchView extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchText: props.value ? props.value : ''
        };
    }

    render() {
        const {value, onSearch, onPressSearch, iconTintColor, placeholder, searchTextViewStyle, rightIcon, leftIcon, onSearchStarted} = this.props;
        return (
            <View style={[cs.shadow, styles.cardView, {flexDirection: "row"}]}>

                    <Image
                        source={leftIcon}
                        style={[styles.searchButton, {tintColor: iconTintColor ? iconTintColor : color._919191}]}
                    />

                <TextInput
                    style={searchTextViewStyle ? [styles.searchTextView, searchTextViewStyle] : styles.searchTextView}
                    placeholder={placeholder ? placeholder : "Search"}
                    onChangeText={text => {
                        this.setState({searchText: text})
                        onSearch ? onSearch(text) : null
                    }}
                    value={value ? value : null}
                />
                {
                    onSearchStarted ?
                        <View style={{position: 'absolute', right: 10, alignSelf: 'center'}}>
                            <BarLoader size={8} color={color._919191} />
                        </View>
                    :
                        <TouchableOpacity
                        style={{position: 'absolute', right: 10, alignSelf: 'center'}}
                        onPress={() => {
                            onPressSearch ? onPressSearch(this.state.searchText) : null;
                        }
                        }>
                        <Image
                            source={rightIcon}
                            style={[styles.searchButton, {tintColor: iconTintColor ? iconTintColor : color._919191}]}
                        />
                    </TouchableOpacity>
                }

            </View>
        );
    }
}

export default SearchView;

SearchView.propTypes = {
    /*onSearch Event which will be passed to component as function*/
    onSearch: PropTypes.func,
    /*onSearch Event which will be passed to component as function*/
    onPressSearch: PropTypes.func
};

/*set default props for this component*/
SearchView.defaultProps = {
    onSearch: null,
    onPressSearch: null,
    value: ""
};
