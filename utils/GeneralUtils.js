import {Dimensions, Platform} from "react-native";
import logger from "./Logger";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AppData} from "./ApplicationData";
import {AppSettings} from "./ApplicationSettings";

export const LocationServiceApiUrl = "https://nominatim.openstreetmap.org/reverse";
export const CountyDataServiceUrl = "https://api.corona-zahlen.org/districts";
export const NationDataServiceUrl = 'https://api.corona-zahlen.org/germany'
export const feedbackUrl = 'https://hrwmobilecomputingproject2022.free.beeceptor.com/feedback';

export const feedbackUrl_TestInternalFailure = 'https://hrwmobilecomputingproject2022.free.beeceptor.com/internal';
export const feedbackUrl_TestAccessDenied = 'https://hrwmobilecomputingproject2022.free.beeceptor.com/';

export const storeData = async () => {
    try {
        logger.enter("storeData", "DataHandler");

        logger.info("Storing AppData");
        await AsyncStorage.setItem('ApplicationData', AppData.asJson());

        logger.info("Storing AppSettings");
        await AsyncStorage.setItem('ApplicationSettings', AppSettings.asJson());
    } catch (error) {
        logger.exception(error);
        logger.unexpectedLeft("storeData", "DataHandler");
    }

    logger.leave("storeData", "DataHandler");
}

export const loadData = async () => {
    try {
        logger.enter("loadData", "DataHandler");

        const appData = await AsyncStorage.getItem('ApplicationData');
        if (appData !== null) { AppData.fromJson(appData); }

        const appSettings = await AsyncStorage.getItem('ApplicationSettings');
        if (appSettings !== null) { AppSettings.fromJson(appSettings); }

    } catch (error) {
        logger.exception(error);
        logger.unexpectedLeft("loadData", "DataHandler");
    }

    logger.leave("loadData", "DataHandler");
}



export function isWeb(){
    return Platform.OS === 'web';
}

export function isMobile(){
    return !isWeb();
}

export const OneDayAsMilli = 21600000;

export const DEVICE_WIDTH = Dimensions.get("window").width;

export const CARD_ITEM_WIDTH = DEVICE_WIDTH * 0.9


function toaster(message, format){
    logger.enter("toaster", "GeneralUtils");
    logger.info("Toast data with format");
    logger.info(format);
    toast.show(message, format);
    logger.leave("toaster", "GeneralUtils");
}

export function toasting(message){
    toaster(message, {
        textStyle: toastTextStyle,
        swipeEnabled: toastSwipe,
        placement: toastPlacement,
    });
}

export function toastingGood(message) {
    toaster(message,
        {
            type: "success",
            textStyle: toastTextStyle,
            swipeEnabled: toastSwipe,
            placement: toastPlacement,
        }
    );
}

export function toastingWarning(message) {
    toaster(message,
        {
            type: "warning",
            textStyle: toastTextStyle,
            swipeEnabled: toastSwipe,
            placement: toastPlacement,
        }
    );
}

export function toastingBad(message) {
    toaster(message,
        {
            type: "danger",
            textStyle: toastTextStyle,
            swipeEnabled: toastSwipe,
            placement: toastPlacement,
        }
    );
}

const toastSwipe = true;
const toastPlacement = "bottom";
const toastTextStyle = { fontSize: 23 };