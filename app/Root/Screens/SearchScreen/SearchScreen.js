import React, {Component} from 'react';
import {FlatList, Image, TextInput, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Header} from 'native-base';
import styles from './SearchScreenStyle';
import {TextView} from 'app/Component';
import {filter, find} from 'app/assets';
import ReqRowItem from './SearchRowItem';

const data = [
    {id: 4,title:"You fanning as Elle Fanning fun"},
    {id: 8,title:"You fanning as Elle Fanning fun"},
    {id: 8,title:"You fanning as Elle Fanning fun"},
    {id: 8,title:"You fanning as Elle Fanning fun"},
]

class SearchScreen extends Component {
    render() {
        return (
            <Container>
                {/*<MainHeader*/}
                {/*    //title={'Hellos'}*/}
                {/*    onBackPress={() => {*/}
                {/*        this.props.navigation.goBack();*/}
                {/*    }}/>*/}
                <Header style={styles.header}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <View style={styles.inputTxtCont}>
                            <TextInput
                                style={styles.inputTxt}
                                placeholder="Search Here"
                                placeholderTextColor="#FFFFFF"
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
                <Content style={styles.mainLayout}>
                    <View style={styles.subHeader}>
                        <TextView style={styles.selSubHeaderTxt}>Reels</TextView>
                        <TextView style={styles.subHeaderTxt}>Profiles</TextView>
                    </View>
                    <TextView style={styles.titleTxt}>Popular searches</TextView>
                    <TextView style={styles.titleTxt}>Category</TextView>
                    <View style={styles.serchBtnCont} >
                        <TouchableOpacity style={styles.publicBtn}>
                            <TextView style={styles.publicBtnTxt}>Most Funny</TextView>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.publicBtn}>
                            <TextView style={styles.publicBtnTxt}>Covid 19</TextView>
                        </TouchableOpacity>

                    </View>
                    <TextView style={styles.titleTxt}>Recent Searches</TextView>
                    <View style={styles.serchBtnCont} >
                        <TouchableOpacity style={styles.publicBtn}>
                            <TextView style={styles.publicBtnTxt}>Donald Trump</TextView>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.publicBtn}>
                            <TextView style={styles.publicBtnTxt}>Shahrukh Khan</TextView>
                        </TouchableOpacity>

                    </View>
                    <FlatList
                        data={data}
                        style={{marginTop: 8,}}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => (
                            <ReqRowItem />
                        )}
                        keyExtractor={item => item.id}
                    />
                </Content>
            </Container>
        );
    }
}

const mapActionCreators = {};

const mapStateToProps = (state) => {
    return {
        loading: state.login.loading,
    };
};
export default connect(mapStateToProps, mapActionCreators)(SearchScreen);
