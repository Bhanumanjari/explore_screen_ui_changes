import React from "react"
import { View, FlatList, StyleSheet } from "react-native"
import Modal from "react-native-modal"
import { TextView } from "."
import { font } from "../Theme"
const countryCode = [{
    code: "+91"
},{
    code: "+1"
}]
const CountryCodeModal = ({visible, toggle, onSelectCountryCode}) => {
    return (
        <Modal isVisible={visible}
         onBackButtonPress={toggle}
         onBackdropPress={toggle}
        >
            <View style={styles.modalContainer}>
                <TextView style={styles.titleTxt}>Select your country code</TextView>
                <FlatList 
                  data={countryCode}
                  renderItem={({item,index}) => {
                    return (
                        <TextView key={index} onPress={() => {
                            toggle()
                            onSelectCountryCode(item.code)
                        }} style={styles.codeTxt}>{item.code}</TextView>
                    )
                  }}
                  ItemSeparatorComponent={() => {
                      return <View style={styles.listSeparator}/>
                  }}
                  keyExtractor={(item) => item.code}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor:"#fff",
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 15
    },
    titleTxt: {
        textAlign: "center",
        fontSize: 16,
        fontFamily: font.MontserratSemibold
    },
    codeTxt :{
        textAlign: "center",
        marginTop: 5,
        padding:5,
        fontSize: 16,
        fontFamily: font.MontserraMedium
    },
    listSeparator: {
        height: 1,
        backgroundColor: "#f2f2f2",
        marginVertical: 3
    }
})

export default CountryCodeModal