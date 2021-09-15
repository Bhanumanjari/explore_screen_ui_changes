import React from "react"
import { Pressable, StyleSheet } from "react-native"
import { TextView } from "."
import { color, font } from "../Theme"
import { FontSize, PixcelWidth } from "../Utils"

const CategoryItem = ({ item, index, selectedIndex = -1, onPressItem = () => { } }) => {
    const isSelected = selectedIndex === index
    return (
        <Pressable style={[styles.exploreFilterContainer, {
            borderWidth: isSelected ? 1 : undefined,
            borderColor: isSelected ? color.txt_white : undefined,
            backgroundColor: isSelected ? color.btnPrimary_color : undefined,
            elevation: isSelected ? 1 : 0
        }]} onPress={() => onPressItem(item, index)}>
            <TextView style={styles.exploreFilterText}>{item.name}</TextView>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    exploreFilterContainer: {
        backgroundColor: color.primary_color_dark,
        marginRight: PixcelWidth(12),
        borderRadius: PixcelWidth(20)
    },
    exploreFilterText: {
        fontFamily: font.MontserratRegular,
        fontSize: FontSize.Small,
        paddingVertical: PixcelWidth(10),
        paddingHorizontal: PixcelWidth(25),
        color: color.txt_white
    },
})
export default CategoryItem