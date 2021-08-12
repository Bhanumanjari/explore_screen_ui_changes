import React from "react"
import { useRef } from "react";
import { useEffect } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TextView } from ".";
import { close } from "../assets";

const toolTipMes = ["Please don't smile", "Look directly into the camera"]
function FaceClickTooltip({ visible, toggle }) {
    let toggleTimer = useRef()
    useEffect(() => {
        if(visible){
            toggleTimer.current = setTimeout(() => {
                toggle()
            }, 5000);
        }else {
            if(toggleTimer.current){
                clearTimeout(toggleTimer.current)
            }
        }
    },[visible])

    return (
        <Modal
            isVisible={visible}
            style={[styles.modalView,{
                paddingBottom: hp('16%'),
            }]}
            animationIn={"bounceIn"}
            animationOut={"bounceOut"}
            animationInTiming={1000}
            animationOutTiming={1000}
            onBackButtonPress={toggle}
            onBackdropPress={toggle}
        >
            <View style={styles.modalContainer}>
                <Pressable onPress={() => {
                    toggle()
                }}>
                    <Image
                        style={styles.closeImg}
                        source={close}
                    />
                </Pressable>
                {
                    toolTipMes.map((msg,index) => {
                        return (
                            <React.Fragment>
                                <TextView style={styles.tipText}>
                                    {
                                        `${index + 1}. ${msg}`
                                    }
                                </TextView>
                            </React.Fragment>
                        )
                    })
                }
                <>
                    <TextView style={styles.tipText}>
                        <TextView style={styles.tipTitleText}>{"TIP "}</TextView>
                        {
                            "HELLOS works better without glasses"
                        }
                    </TextView>
                </>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        justifyContent: 'flex-end'
    },
    modalContainer: {
        backgroundColor: '#fbc02e',
        borderRadius: 10,
        padding: 10
    },
    tipText: {
        fontSize: 16,
        marginTop: 7,
        fontWeight: "500"
    },
    tipTitleText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    closeImg: {
        alignSelf: 'flex-end'
    }
})

export default FaceClickTooltip;