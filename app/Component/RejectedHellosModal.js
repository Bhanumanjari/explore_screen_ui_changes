import React from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View } from 'react-native'
import { color } from '../Theme'
import { TextView } from '.'
import { FontSize, PixcelWidth } from '../Utils'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FastImage from 'react-native-fast-image'
import { sendIcon } from '../assets'
import { Button } from 'native-base'
function RejectedHellosModal({ isVisible, toggle, selectedData }) {
    return (
        <>
            <Modal
                isVisible={isVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.firstContainer}>
                        <TextView style={styles.usrTxt}>Reason for Rejection</TextView>
                    </View>
                    <View style={styles.secondContainer}>
                        <View style={styles.sendIconContainer}>
                            {/* <FastImage source={sendIcon} style={styles.sendIcon} resizeMode={FastImage.resizeMode.contain} /> */}
                        </View>
                        <TextView style={styles.msgTxt}>{selectedData.rejectReason}</TextView>
                        <View style={styles.btnContainer}>
                            <Button rounded style={styles.okBtn} onPress={toggle}>
                                <TextView style={styles.btnText}>OK</TextView>
                            </Button>
                            <Button rounded style={styles.editBtn}>
                                <TextView style={styles.btnText}>EDIT</TextView>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: color.primary_color,
        overflow: 'hidden',
        borderRadius: 20,
    },
    firstContainer: {
        backgroundColor: color.primary_color_dark,
        height: hp('10%')
    },
    secondContainer: {
        backgroundColor: color.primary_color,
        paddingHorizontal: 20
    },
    usrTxt: {
        fontSize: FontSize.Small,
        color: color.txt_white,
        textAlign: 'center',
        marginTop: 10
    },
    msgTxt: {
        fontSize: FontSize.Small,
        color: color.txt_white,
        textAlign: 'center',
        marginTop: PixcelWidth(60)
    },
    sendIconContainer: {
        backgroundColor: 'rgb(255,255,255)',
        height: PixcelWidth(86),
        width: PixcelWidth(86),
        borderRadius: PixcelWidth(43),
        position: 'absolute',
        top: PixcelWidth(-43),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendIcon: {
        height: PixcelWidth(30),
        width: PixcelWidth(30),
    },
    btnContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: hp('3%')
    },
    okBtn: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 7,
        margin: 3,
        backgroundColor: color.primary_color_dark
    },
    editBtn: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 7,
        backgroundColor: color.btnPrimary_color,

        elevation: 5,

        shadowOffset: { height: 3, width: 0 },
        margin: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.2)'

    },
    btnText: {
        color: color.txt_white,
        fontWeight: '600',
        fontSize: wp("3.4%")
    }
})
export default RejectedHellosModal