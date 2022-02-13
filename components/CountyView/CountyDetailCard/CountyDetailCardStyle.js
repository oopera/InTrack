import {StyleSheet} from "react-native";
import {CARD_ITEM_WIDTH, isMobile} from "../../../utils/GeneralUtils";


export const styles = StyleSheet.create({

    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },

    button_container:{
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#B6FC95',
        width: '15%',
        minWidth: 150,
        marginRight: 15,
        marginLeft: 15,
        height: 60,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },

    multiple_button_container:{
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button_text:{
        fontSize: 25,
        color: '#2d2d2d',

    },

    button:{
        alignItems: 'center',
        margin: 5,
        width: 50,
        color: 'white'
    },

    text:{
        color: "#ffffff",
        fontSize:22,
        textAlign: "center"
    },

    title:{
        color: "#ffffff",
        textAlign: "center",
        fontSize:28
    },

    subtitle:{
        color: "#ffffff",
        textAlign: "center",
        fontSize: 25
    },

    card:{
        width: (isMobile() ? CARD_ITEM_WIDTH : '90%'),
        alignSelf: 'center',
        backgroundColor: '#4A4A4A',
        borderRadius: 25
    },

    card_content: {
        position: "relative",
        alignItems: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },

    card_text:{
        color: 'white'
    },

    search_element: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)'

    },

});
