import React from "react"
import Modal from "react-native-modal"
import { Pressable, StyleSheet, View } from "react-native"
import { TextView } from "."
import { color } from "../Theme"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { pickFromCamera, pickFromGallery } from "../Utils"

function ImagePickerModal({visible, toggle, onImage}){
    
    const onCamera = () => {
        pickFromCamera((image) => {
            toggle()
            onImage(image)
        })
    }
    
    const onGallery = () => {
        pickFromGallery((image) => {
            toggle()
            onImage(image)
        })
    }

    return (
        <Modal
        isVisible={visible}
        onBackButtonPress={toggle}
        onBackdropPress={toggle}
        style={styles.modalView}
        >
            <View style={styles.modalContainer}>
                <Pressable style={[styles.container,styles.cameraBtn]} onPress={() => {
                    onCamera()
                }}>
                    <TextView style={styles.txt}>Camera</TextView>
                </Pressable>
                <View style={styles.divider} />
                <Pressable style={[styles.container,styles.galleryBtn]} onPress={() => {
                    onGallery()
                }}>
                    <TextView style={styles.txt}>Gallery</TextView>
                </Pressable >
                <Pressable style={styles.cancelBtn} onPress={toggle}>
                    <TextView style={styles.txt}>Cancel</TextView>
                </Pressable>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        justifyContent:'flex-end'
    },
    modalContainer: {
        
    },
    container: {
        backgroundColor: "#fff"
    },
    galleryBtn: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    cameraBtn: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    cancelBtn: {
        backgroundColor: "#fff",
        borderRadius: 10,
        marginTop: 10
    },
    txt: {
        textAlign: "center",
        paddingVertical: 15,
        fontSize: 16,
        fontWeight:"500",
    },
    divider: {
        backgroundColor: color._f2f2f2,
        height: 2
    }
})

export default ImagePickerModal