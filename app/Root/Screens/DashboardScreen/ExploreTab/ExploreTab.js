import React, {Component} from 'react';
import {Image, TextInput, TouchableOpacity, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Container, Header, Content, Button} from 'native-base';
import styles from './ExploreTabStyle';
import {filter, find} from 'app/assets';
import {color} from '../../../../Theme';


class ExploreTab extends Component {
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
                            <TouchableOpacity style={styles.find}
                            onPress={()=>{
                                this.props.navigation.navigate('RequestScreen');
                            }}
                            >
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
                <Content style={{backgroundColor: color.primary_color,}}>

                    <Button rounded bordered
                            onPress={() => {
                                this.props.navigation.navigate('SearchedScreen');
                            }}>
                        <Text style={{color: 'white', paddingHorizontal: 25}}>Searched Screen</Text>
                    </Button>
                    <Button rounded bordered
                            onPress={() => {
                                this.props.navigation.navigate('SearchedUserScreen');
                            }}>
                        <Text style={{color: 'white', paddingHorizontal: 25}}> Searched User</Text>
                    </Button>
                </Content>

            </Container>
        );
    }
}

const mapActionCreators = {};

const mapStateToProps = (state) => {
    return {};
};
export default connect(mapStateToProps, mapActionCreators)(ExploreTab);
