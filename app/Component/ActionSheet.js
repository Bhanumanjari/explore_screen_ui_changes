import React from "react"
import { StyleSheet, View, FlatList, Pressable } from "react-native"
import Modal from "react-native-modal"
import { TextView } from "."
import { color } from "../Theme"

const ActionSheet = ({ visible, actionList, onSelect, toggle }) => {
    return (
        <Modal
            isVisible={visible}
            style={styles.modal}
            onBackButtonPress={toggle}
            onBackdropPress={toggle}
        >
            <View style={styles.modalView}>
                <FlatList
                    data={actionList}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.actionContainer}
                    renderItem={({ item, index }) => {
                        return (
                            <Pressable style={styles.container} onPress={() => {
                                toggle()
                                onSelect(index)
                            }}>
                                <TextView style={styles.txt}>{item}</TextView>
                            </Pressable>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Pressable style={styles.cancelBtn} onPress={toggle}>
                    <TextView style={styles.txt}>Cancel</TextView>
                </Pressable>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end'
    },
    modalView: {
    },
    actionContainer: {
        borderRadius: 10,
    },
    container: {
        backgroundColor: "#fff"
    },
    txt: {
        textAlign: "center",
        paddingVertical: 15,
        fontSize: 16,
        fontWeight: "500",
    },
    divider: {
        backgroundColor: color._f2f2f2,
        height: 2
    },
    cancelBtn: {
        backgroundColor: "#fff",
        borderRadius: 10,
        marginTop: 10
    },
})
export default ActionSheet