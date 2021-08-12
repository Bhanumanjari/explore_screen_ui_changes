import React, { useLayoutEffect } from "react"
import { useState } from "react"
import { Pressable, TextInput, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useDispatch } from "react-redux"
import { TextView } from "../../../Component"
import BackButton from "../../../Component/BackButton"
import { apiLoadingStop, apiLoadingStart } from "../../../store/global"
import { postFeedback } from "../../../store/profile"
import { showBottomToast } from "../../../Utils"
import styles from "./FeedbackStyle"

const Feedback = (props) => {

    const insets = useSafeAreaInsets()
    const dispatch = useDispatch()

    const [feedback, setFeedback] = useState("")

    const sendFeedback = () => {
        if(feedback.trim() === ""){
            showBottomToast("Feedback should not be empty")
            return
        }
        let data = {
            feedback
        }
        dispatch(apiLoadingStart())
        dispatch(postFeedback(data,onResponse))
    }

    const onResponse = (res) => {
        if(res){
            dispatch(apiLoadingStop())
            showBottomToast("Thank you for your feedback")
            props.navigation.goBack()
        }
    }

    useLayoutEffect(() => {
        props.navigation.setOptions({
            header: () => {
                const insets = useSafeAreaInsets()
                return (
                    <View style={[styles.header, {
                        paddingTop: insets.top
                    }]}>
                        <BackButton />
                        <TextView style={styles.titleTxt}>{'Feedback'}</TextView>
                    </View>
                )
            },
            headerShown: true
        })
    }, [props.navigation])

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Enter Feedback"
                style={styles.feedbackInput}
                placeholderTextColor="#ffffff50"
                onChangeText={(text) => {
                    setFeedback(text)
                }}
                maxLength={250}
            />

            <Pressable onPress={() => sendFeedback()} style={styles.sendBtn}>
                <TextView style={styles.sendBtnTxt}>SEND</TextView>
            </Pressable>
        </View>
    )
}

export default Feedback