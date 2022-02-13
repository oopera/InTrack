import React, {useState} from 'react';
import {Modal, Text, TextInput, View} from 'react-native';
import {
    feedbackUrl, feedbackUrl_TestAccessDenied,
    feedbackUrl_TestInternalFailure,
    toastingBad,
    toastingGood,
    toastingWarning
} from "../../../utils/GeneralUtils";
import {styles} from "./FeedbackModalViewStyle";
import {CustomButton} from "../../customElements/CustomButton/CustomButton";

const sendFeedback = async (text) => {
    if (null === text || text === "" || !text.replace(/\s/g, '').length) {
        toastingWarning("Das Feedback muss mindestens ein Zeichen enthalten");
        return true;
    }

    let url = feedbackUrl;
    if (text.toLowerCase().startsWith("fail")) {
        url = feedbackUrl_TestInternalFailure;
    } else if (text.toLowerCase().startsWith("root")) {
        url = feedbackUrl_TestAccessDenied;
    }
    fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            feedback: text
        })
    }).then((result) => {
        if (result.status === 200) {
            toastingGood("Feedback erhalten");
        } else if (result.status >= 500 && result.status < 600) {
            throw new Error(result.message());
        } else if (result.status === 401) {
            throw new Error("Access denied to endpoint");
        }
    }).catch(() => toastingBad("Feedback konnte nicht gesendet werden")).finally(() => true);

}

export const FeedbackModalView = () => {    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState("");
    return(
        <View >
            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modal}>
                    <Text style={styles.modalTextBold}>Feedback</Text>
                    <TextInput
                        style={[styles.input, styles.text]}
                        value={text}
                        onChangeText={(input) => setText(input)}
                        multiline={true}
                        placeholder="Feedback eingeben"
                    />
                    <View style={styles.container}>
                        <CustomButton text={"Abschicken"} onPress={() => {
                            sendFeedback(text).then(setText(""));
                            setModalVisible(!modalVisible);
                        }} />

                        <CustomButton text={"Schließen"} onPress={() => {setModalVisible(!modalVisible)}}/>
                    </View>
                </View>
            </Modal>
            <CustomButton text="Feedback" onPress={() => {setModalVisible(true)}} />
        </View>
    );
}
