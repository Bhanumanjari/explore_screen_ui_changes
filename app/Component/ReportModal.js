import React from "react"
import { useState } from "react"
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, TextInput, View } from "react-native"
import Modal from "react-native-modal"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useDispatch } from "react-redux"
import { TextView } from "."
import { postFeedback } from "../store/profile"
import { color, font } from "../Theme"
import { PixcelWidth, showBottomToast } from "../Utils"
import commonStyle from './../CommonStyle'

const reportTag = ["Nudity", "Violence", "Harassment", "Suicide or Self-Injury", "False Information", "Spam", "Unauthorized Sales", "Hate Speech", "Terrorism", "Voter Interference", "Intellectual property violation"]
function ReportModal({ visible, toggle, videoId, onSend }) {
    const insets = useSafeAreaInsets()
    const dispatch = useDispatch()
    const [report, setReport] = useState("")
    const [isReporting, setIsReporting] = useState("")

    const sendFeedback = () => {
        if(report.trim() === ""){
            showBottomToast("Report text should not be empty")
            return
        }
        let data = {
            feedback: report,
            videoId
        }
        setIsReporting(true)
        dispatch(postFeedback(data, onResponse))
    }

    const onResponse = (res) => {
        if(res){
            setIsReporting(false)
            toggle()
            showBottomToast("Reported successfully")
        }
    }

    return (
        <Modal
            isVisible={visible}
            style={[styles.modal, {
                paddingBottom: insets.bottom
            }]}
            onBackButtonPress={toggle}
            onBackdropPress={toggle}
        >
            <View style={styles.modalContainer}>
                <View style={styles.reportContainer}>
                    {
                        reportTag.map((report, index) => {
                            return (
                                <Pressable key={index} style={styles.reportView} onPress={() => setReport(report)}>
                                    <TextView style={styles.reportTxt}>{report}</TextView>
                                </Pressable>
                            )
                        })
                    }
                </View>
                <TextInput
                    placeholder="Enter text here"
                    placeholderTextColor="#ffffff50"
                    value={report}
                    onChangeText={(text) => {
                        setReport(text)
                    }}
                    maxLength={250}
                    style={styles.inputTxt}
                />
                <Pressable onPress={() => sendFeedback()} style={styles.sendBtn}>
                {
                    isReporting ? <ActivityIndicator style={{paddingVertical: 10}} color={color.txt_white} /> : <TextView style={styles.sendBtnTxt}>SEND</TextView>
                }
            </Pressable>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: "flex-end"
    },
    modalContainer: {
        backgroundColor: color.modal_background_color,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15
    },
    reportContainer: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    reportView: {
        backgroundColor: color.modal_background_color_dark,
        paddingVertical: 7,
        paddingHorizontal: 10,
        margin: 7,
        borderRadius: 10
    },
    reportTxt: {
        color: color.txt_white
    },
    inputTxt: {
        height: 70,
        width: "90%",
        fontFamily: font.MontserratRegular,
        color: color.txt_white,
        borderColor: "#ffffff50",
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        textAlignVertical: "top",
        padding: 10,
        marginTop: 10
    },
    sendBtn: {
        alignSelf: 'center',
        justifyContent:'center',
        alignItems:"center",
        width:"50%",
        maxWidth:200,
        backgroundColor: color.btnPrimary_color,
        marginHorizontal: PixcelWidth(15),
        borderRadius: 20,
        borderWidth: 2,
        borderColor: color.btnPrimary_color,

        ...commonStyle.shadow,
        marginVertical: 20,
        shadowColor: 'rgba(0,0,0,0.2)',
    },
    sendBtnTxt: {
        fontSize: PixcelWidth(15),
        fontWeight: '600',
        color: color.txt_white,
        paddingVertical: 10,
        textAlign: 'center',
    }
})

export default ReportModal