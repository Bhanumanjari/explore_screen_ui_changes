import React from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { Header } from 'native-base';
import styles from './HMainHeaderStyle';
import { color } from 'app/Theme';
import { backArrow } from 'app/assets';
import { TextView } from 'app/Component';
import { PixcelHeight, PixcelWidth } from '../../Utils';

export class MainHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const { title, onBackPress, onNextPress } = this.props;
        return (

            <Header
                androidStatusBarColor={color.primary_color}
                iosBarStyle="light-content"
                style={{
                    marginTop:25,
                    marginLeft:-10,
                    justifyContent: 'flex-start',
                    backgroundColor: color.primary_color,
                    borderBottomColor: color.primary_color,
                }}
                {...this.props}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginTop: 3,//PixcelHeight(66),
                    marginLeft: PixcelWidth(20),
                }}>
                    {onBackPress &&
                        <TouchableOpacity onPress={() => {
                            onBackPress && onBackPress();
                        }}>
                            <Image
                                source={backArrow}
                                style={styles.backArrowImg}
                            /></TouchableOpacity>}
                    <TextView style={styles.titleTxt}>{title}</TextView>
                    {
                        onNextPress && <View
                            style = {{
                                marginLeft: 50
                            }}
                        >
                        <TouchableOpacity
                            style = {{
                                height: 40,
                                width: 80,
                                borderRadius: 25,
                                backgroundColor: color.btnPrimary_color,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress = {()=>{onNextPress && onNextPress()}}
                        >                         
                            <Text
                                style = {{
                                    fontSize: 20,
                                    color: 'white',
                                    fontWeight: 'bold'    
                                }}
                            >
                                Skip
                                </Text>
                        </TouchableOpacity>
                    </View>
                    }
                </View>

            </Header>
        );
    }
}

export default MainHeader;
