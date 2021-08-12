import { cloneDeep, includes, indexOf } from "lodash"
import isEqual from "lodash.isequal"
import { Footer } from "native-base"
import React from "react"
import { useContext } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { View, Image, FlatList, Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"
import { checkRound } from "../../../assets"
import { MainHeader, TextView } from "../../../Component"
import AuthContext from "../../../context/AuthContext"
import { LanguageLoader } from "../../../ShimmerEffects/ProfileLoaders"
import { getLanguages, updateProfileAction } from "../../../store/profile"
import { showBottomToast } from "../../../Utils"
import styles from "./LanguageStyle"

const Language = (props) => {
    const initial = props.route?.params?.initial ?? false;
    const dispatch = useDispatch()
    const authContext = useContext(AuthContext)
    const insets = useSafeAreaInsets()

    const isLanguagesLoading = useSelector(state => state.profile.isLanguagesLoading)
    const languages = useSelector(state => state.profile.languages)
    const userLanguages = useSelector(state => state.login.data?.languages ?? [])
    const [selectedLanguage, setSelectedLanguage] = useState(userLanguages)

    useEffect(() => {
        if (languages.length === 0)
            dispatch(getLanguages())
    }, [])

    const skip = () => {
        props.navigation.goBack();
    };

    const onDone = () => {
        const oldLan = userLanguages;
        if (selectedLanguage.length < 1) {
            showBottomToast('Minimum one language should be selected');
            return;
        }
        // if (selectedLanguage.length > 4) {
        //     showBottomToast('Maximum 4 languages allowed');
        //     return;
        // }
        if (isEqual(selectedLanguage, oldLan)) {
            navigate();
            return;
        }

        updateLanguages();
    };

    const navigate = () => {
        const initial = props.route?.params?.initial ?? false;
        if (initial) {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } else {
            props.navigation.goBack();
        }
    };

    const updateLanguages = () => {
        let formData = new FormData();
        formData.append(`languages`, JSON.stringify(selectedLanguage));
        dispatch(updateProfileAction(formData, { onSuccess: onLanguageUpdateSuccess, onError: onLanguageUpdateError }))
    }

    const onLanguageUpdateSuccess = () => {
        navigate();
    }

    const onLanguageUpdateError = () => {

    }

    const onLanguageSelect = (language) => {
        let tmpLan = cloneDeep(selectedLanguage)
        let lIndex = indexOf(selectedLanguage, language._id);
        if (lIndex > -1) tmpLan.splice(lIndex, 1);
        else tmpLan.push(language._id);

        console.log(tmpLan)
        setSelectedLanguage(tmpLan)
    }

    console.log(":::Language:::")

    return (
        <View style={styles.mainLayout}>
            {/* <MainHeader title={'Languages'} /> */}
            <TextView style={[styles.titleTxt,{
                paddingTop: insets.top
            }]}>{"Select one or more language"}</TextView>
            {isLanguagesLoading ? <LanguageLoader /> : <FlatList
                data={languages}
                style={styles.flatlistCont}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                extraData={selectedLanguage}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item, index }) => {
                    return (
                        <Pressable
                            onPress={() => {
                                onLanguageSelect(item)
                            }}
                            style={styles.flatlistImgCont}>
                            <TextView style={styles.languageTxt}>{item.name}</TextView>
                            <TextView style={styles.regionalTxt}>{item.regionalText}</TextView>
                            {(includes(selectedLanguage, item._id)) && (
                                <Image style={styles.checkImageStyle} source={checkRound} />
                            )}
                        </Pressable>
                    );
                }}
            />}
            <Footer style={styles.footerCont}>
                <View style={styles.bottom}>
                    <View style={styles.bottomCont}>
                        <Pressable
                            disabled={initial}
                            style={styles.backBtn}
                            onPress={() => {
                                skip();
                            }}>
                            {!initial && (
                                <TextView style={styles.backBtnTxt}>GO BACK</TextView>
                            )}
                        </Pressable>
                        <Pressable
                            style={styles.doneBtn}
                            onPress={() => {
                                onDone();
                            }}>
                            <TextView style={styles.doneBtnTxt}>DONE</TextView>
                        </Pressable>
                    </View>
                </View>
            </Footer>
        </View>
    )
}

export default Language