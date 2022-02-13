import {StyleSheet} from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    heading: {
        color: 'white',
        width: 500,
        fontSize: 30,
        fontWeight: 'bold',
        overflow: "visible"
    },
    headerContainer: {
        backgroundColor: '#4d4d4d'
    },

    card_content: {
        backgroundColor: "#B6FC95",
        height: '10%',
        width: '90%',
        position: "relative",
        textAlignVertical: 'center',
        alignItems: "center",
        marginBottom: '5%',
        paddingTop: 7,
        borderRadius: 50,
        top: 10

    },
    card:{
        backgroundColor: "#2D2D2D"
    },
    card_text:{
        color: 'white'
    }

});
