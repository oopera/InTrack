import React, {useState} from "react";
import {View, Text, Switch} from "react-native";
import {Locator} from "../../services/LocationService";
import {styles} from "./SettingsViewStyle";
import {ImpressumView} from "./ImpressumView/ImpressumView";
import {FeedbackModalView} from "./FeedbackModalView/FeedbackModalView";
import {toastingWarning} from "../../utils/GeneralUtils";


/**
 * This component contains all elements for the application setting
 * @returns {JSX.Element} New React Native Custom settings component
 */
export const SettingsView = (props) => {
    const [gpsSwitchValue, setGpsSwitchValue] = useState(props.gps);
    const setGps = props.setGps;
    return (
        <View style={styles.container}>
            <View style={styles.settingsContainer}>
                <Switch
                    thumbColor={'#B6FC95'}
                    value={gpsSwitchValue}
                    onValueChange={gpsState => {
                        if(!Locator.isGranted()){
                            setGpsSwitchValue(false);
                            setGps(false);
                            toastingWarning("Bitte aktiviere den Ortungsdienst in den Einstellungen");
                            Locator.request().then(()=>{});
                        } else if (!gpsState) {
                            // Disable the gps module
                            Locator.disable();
                            setGpsSwitchValue(false);
                            setGps(false);
                        } else {
                            // Try to enable the gps module
                            Locator.enable().then(() => {
                                setGpsSwitchValue(true);
                                setGps(true);
                            });
                        }
                    }}
                />
                <Text style={styles.text}>GPS Tracking</Text>
            </View>
            <View style={styles.buttonContainer}>
                <FeedbackModalView/>
                <ImpressumView/>
            </View>
        </View>
    )
}
