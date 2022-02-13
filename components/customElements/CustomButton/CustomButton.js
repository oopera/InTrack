import {Text, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {styles} from "./CustomButtonStyle";

export const CustomButton = (props) => {
    const [styles_, setStyles_] = useState(styles)
    useEffect(() => {
        if(props.style !== undefined){
            setStyles_(props.style);
        }
    }, []);

    return (
        <TouchableOpacity disabled={props.disabled}
                          style={styles_.button_container}
                          onPress={() => { props.onPress() }
                          }>
            <Text style={styles_.button_text}> {props.text} </Text>
        </TouchableOpacity>
    )
}