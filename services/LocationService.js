import * as Location from 'expo-location';
import GpsLocationException from "../exceptions/GpsLocationException";
import logger from "../utils/Logger";
import {LocationServiceApiUrl} from "../utils/GeneralUtils";
import {AppSettings} from "../utils/ApplicationSettings";

/**
 * This class contains method for a device location service
 */
export default class LocationService {

    #granted = false;

    /**
     * Request the name of given longitude and latitude.<br>
     * Throws a GpsLocationException if the located location has no name.
     * @param long Longitude to use
     * @param lat latitude to use
     * @returns {Promise<String>} Name of the location
     */
    async getCityName(long, lat) {
        logger.enter("getCityName(" + long + "," +  lat + ")", "LocationService");

        const response = await fetch(LocationServiceApiUrl + "?lat=" + lat + "&lon=" + long + "&format=json");
        let result = await response.json();

        // When the city mapping api call returns not a valid object throw a new GpsLocationException
        if (!result.hasOwnProperty("address") || !result['address'].hasOwnProperty("city")) {
            logger.unexpectedLeft("getCityName(" + long + "," +  lat + ")");
            throw new GpsLocationException("Cannot locationService position");
        }

        logger.leave("getCityName(" + long + "," +  lat + ")", "LocationService");
        return result['address']['city'];
    }

    /**
     * Returns the name of the current location.<br>
     * Throws a GpsLocationException if the located location has no name.
     * @returns {Promise<String>} Name of location
     */
    async getCurrentLocationName() {
        logger.enter("getCurrentCityName()", "LocationService");

        let coords = await Locator.locate();
        let name = this.getCityName(coords.long, coords.lat);

        logger.leave("getCurrentCityName()", "LocationService");
        return name;
    }

    /**
     * True if the permission was granted for the location service.
     * @returns {boolean}
     */
    isGranted() {
        return this.#granted;
    }

    /**
     * Maps the isGranted method for an intuitive definition
     * @returns {boolean} true if module is enabled
     */
    isEnabled(){
        return this.isGranted() && AppSettings.gpsEnabled();
    }

    /**
     * Maps the request method for an intuitive definition
     * @returns {Promise<boolean>} true if successful enabled
     */
    async enable(){
        if(await this.request()){
            AppSettings.setGpsState(true);
        }
        return this.isEnabled();
    }

    /**
     * Request the location permission and enables the module.
     * @returns {Promise<boolean>} true if successful enabled
     */
    async request() {
        logger.enter("request()", "LocationService");
        const {status} = await Location.requestForegroundPermissionsAsync();
        logger.info("Status is " + status);
        if (status === "granted") {
            this.#granted = true;
        }

        logger.leave("request()", "LocationService");

        return this.#granted;
    }

    /**
     * Disables the gps locations
     */
    disable() {
        logger.enter("disable()", "LocationService");
        AppSettings.setGpsState(false);

        logger.leave("disable()", "LocationService");
    }

    /**
     * Tries to locate the device.<br>
     * If the permission is not granted the operation throws a new GpsLocationException
     * @returns {Promise<{long: number, lat: number}>} Longitude and Latitude of the device.
     */
    async locate() {
        logger.enter("locate()", "LocationService");

        if (!this.isEnabled()) {
            logger.unexpectedLeft("locate()");
            throw new GpsLocationException("Gps Access denied");
        }
        let location = await Location.getCurrentPositionAsync({});

        logger.leave("locate()", "LocationService");
        return {
            long: location.coords.longitude,
            lat: location.coords.latitude
        };
    }
}

/**
 * This is the default Location service object
 * @type {LocationService}
 */
export const Locator = new LocationService();