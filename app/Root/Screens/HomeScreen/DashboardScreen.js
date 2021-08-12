import React, {Component} from 'react';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {Container, Header} from 'native-base';
import styles from './DashboardScreenStyle';
import {HBottomTabBar} from 'app/Component';
import {filter, find} from '../../../assets';
import SplashScreen from '../SplashScreen';
import InfoScreen from '../InfoScreen/InfoScreen';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
class DashboardScreen extends Component {
    constructor(props) {
        super();
        this.state = {
            selectedTab: 0,
        };
    }

    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <View style={styles.inputTxtCont}>
                            <TextInput
                                style={styles.inputTxt}
                                placeholder="Search here"
                                placeholderTextColor="#FFFFFF50"
                            />
                            <TouchableOpacity style={styles.find}>
                                <Image style={styles.findIcon}
                                       source={find}/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.filter}>
                            <Image style={styles.filterIcon}
                                   source={filter}/>
                        </TouchableOpacity>
                    </View>
                </Header>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >

                    <Stack.Screen name="Test" component={InfoScreen}/>
                    <Stack.Screen name="Test2" component={InfoScreen}/>

                </Stack.Navigator>
                <HBottomTabBar
                    onTabSelect={(tabID) => {
                        this.setState({selectedTab: tabID});
                        if(tabID===0)
                        this.props.navigation.navigate('Test');
                        else {
                            this.props.navigation.navigate('Test2');
                        }
                    }}
                />
            </Container>
        );
    }
}

const mapActionCreators = {};

const mapStateToProps = (state) => {
    return {};
};
export default connect(mapStateToProps, mapActionCreators)(DashboardScreen);
