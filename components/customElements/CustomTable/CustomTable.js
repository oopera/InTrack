import {Text, View} from "react-native";
import React, {useState} from "react";
import {styles} from "./CustomTableStyle";

/**
 * Generates a new 2 entity row.
 * @param key First entry
 * @param value Second entry
 * @param index Index  of the row
 * @returns {JSX.Element} New table row
 */
const createRow = (key, value, index)=> {
    return (
        <View style={styles.row} key={"entry#" + index}>
            <Text style={styles.cell}>{key}</Text>
            <Text style={styles.cell}>{value}</Text>
        </View>
    );
}

const generateRows = (data)=> {
    const result = [];
    let index = 0;
    // Iterate over each given data row and create a new table row
    data.map(row => {
        result.push(createRow(row.key, row.value, index));
        index++;
    })
    return result;
}

/**
 * Creates a new Table based on a 2xn array
 * @param props Properties must contain a 2xn array
 * @returns {JSX.Element} React Native Custom Table component
 */
export const CustomTable = (props) => {
    const [data] = useState(props.data);
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{props.header}</Text>
            {generateRows(data)}
        </View>
    )
}