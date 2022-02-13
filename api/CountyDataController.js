import CountyDoesNotExistsException from "../exceptions/CountyDoesNotExistsException";
import {CountyDataServiceUrl, OneDayAsMilli} from "../utils/GeneralUtils";
import logger from "../utils/Logger";


const dataSource = {update: 0};
let germanCountiesDocument = {};

/**
 * Updates the datasource for german counties(Landkreise).<br>
 * Note: To achieve a resource friendly usage the datasource can only be updated once a day
 * @returns {Promise<boolean>} Always true
 */
export const updateCountyDataSource = async () => {
    logger.enter("updateCountyDataSource()", "CountyDataController");

    let currentTime = Date.now();

    // Update the datasource if it's older than one day
    if(dataSource['update'] - currentTime < 0){
        logger.info("Update county data");
        const response = await fetch(CountyDataServiceUrl);
        dataSource.data = await response.json();
        dataSource.update = currentTime + OneDayAsMilli;

        // Each update of the datasource also updates the county list
        logger.info("Update county list");
        let dataAsObject = dataSource.data.data;
        germanCountiesDocument = Object
            .keys(dataAsObject)
            .map(key => dataAsObject[key].name);
    }

    logger.leave("updateCountyDataSource()", "CountyDataController");
    return true;
}

/**
 * Request details about a given german county(Landkreis).
 * @param name Name of the county
 * @returns {Promise<JSON>} Json object containing all information about the county.
 */
export async function getCountyInformationByName(name) {
    logger.enter("getCountyInformationByName(" + name +")", "CountyDataController");

    await updateCountyDataSource();

    logger.info("Simplify datasource for local operation");
    // Get and map the data of the datasource.
    let dataAsObject = dataSource.data.data;
    let dataAsArray = Object
        .keys(dataAsObject)
        .map(key => dataAsObject[key]);

    logger.info("Extract county information")
    // Extract the county out of the datasource
    let county = dataAsArray.filter(data => data.name.toLowerCase() === name.toLowerCase() )[0];

    // Given county does not exist => throw a new exception
    if(undefined === county || null == county){
        logger.unexpectedLeft("getCountyInformationByName(" + name +")");
        throw new CountyDoesNotExistsException("County " + name + " does not exists");
    }

    logger.leave("getCountyInformationByName(" + name +")", "CountyDataController");
    // Map the county object to a custom json format
    return {
        "raw":county,
        "name": county['name'],
        "state": county['state'],
        "data": {
            "population":   (Math.round(county['population'] * 100) / 100).toLocaleString(),
            "cases":        (Math.round(county['cases'] * 100) / 100).toLocaleString(),
            "casesPerWeek": (Math.round(county['casesPerWeek'] * 100) / 100).toLocaleString(),
            "death":        (Math.round(county['deaths'] * 100) / 100).toLocaleString(),
            "deathPerWeek": (Math.round(county['deathsPerWeek'] * 100) / 100).toLocaleString(),
            "recovered":    (Math.round(county['recovered'] * 100) / 100).toLocaleString(),
            "incidence":    (Math.round(county['weekIncidence'] * 100) / 100).toLocaleString(),
            "casesPer100k": (Math.round(county['casesPer100k'] * 100) / 100).toLocaleString(),
            "delta": county['delta']
        }
    };
}

/**
 * Access the key value mapped german county (Landkreis) list
 * @returns {Promise<{}>} Json document containing all german counties (Landkreise)
 */
export async function getAllGermanCounties(){
    logger.enter("getAllCounties", "CountyDataController");

    await updateCountyDataSource();

    logger.leave("getAllCounties", "CountyDataController");
    return germanCountiesDocument;
}

export function doesCountyExists(county){
    logger.enter("doesCountyExists(" + county + ")", "CountyDataController");


    logger.leave("doesCountyExists(" + county + ")", "CountyDataController");
    return germanCountiesDocument.indexOf(county) >= 0;
}

/**
 * Maps all german counties(Landkreise) into a processable json entity with the form [{"key":"value"}, ...].
 * @returns {Promise<*[]>}
 */
export async function getCountyListAsProcessableJsonObject(){
    logger.enter("getMappedCounties", "CountyDataController");

    let resultingCountyList = [];
    let array = await getAllGermanCounties();

    logger.info("Filter counties");
    // This filter removes all entries which occur more than ones
    array = array.filter((value, index) => array.indexOf(value)===index);

    logger.info("Map filtered counties to a json object");
    // Map and add every entry of the array to the resulting county list
    for (let value of array) {
        resultingCountyList.push({ "key": value });
    }

    logger.leave("getMappedCounties", "CountyDataController");
    return resultingCountyList;
}