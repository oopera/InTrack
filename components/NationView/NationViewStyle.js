import {StyleSheet} from "react-native";
import {CARD_ITEM_WIDTH, isMobile} from "../../utils/GeneralUtils";

export const styles = StyleSheet.create({
    container:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

    },
    text:{
        color: "#ffffff",
        fontSize: 25
    },
    subtitle:{
        color: "#ffffff",
        textAlign: "center",
        fontSize: 25
    },

    card:{
        alignSelf: 'center',
        width: (isMobile() ? CARD_ITEM_WIDTH : '90%'),
        backgroundColor: '#4A4A4A',
        borderRadius: 25,
        marginBottom: 15,

    },
    card_content: {
        position: "relative",
        alignItems: "center",
    },
    card_text:{
        color: 'white'
    }

});
