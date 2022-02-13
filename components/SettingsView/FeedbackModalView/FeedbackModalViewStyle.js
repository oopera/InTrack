import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    buttonContainer:{
        marginTop: 25,
        height: 50,
        width: 200,
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: "center",
        alignSelf: "center",
        margin: 20
    },

    modalText:{
        color: 'white',
        fontSize:25,
        alignSelf: "center"
    },

    modalTextBold:{
        fontSize:25,
        alignSelf:'center',
        color:'white',
        fontWeight: 'bold'
    },

    modal: {
        backgroundColor: '#2d2d2d',
        width: '80%',
        marginTop: 150,
        height: '60%',
        alignSelf: 'center',
        borderRadius: 20,
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 1,
    },
    input:{
        height: '50%',
        width: '50%',
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: '#2a2a2a',
        borderColor: 'white',
        borderWidth: 1,
        margin: 20,
        justifyContent: 'center',
        padding: '5%',
        fontSize: 20

    },
    text:{
        color: 'white'
    },
    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});
