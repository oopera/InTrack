class ApplicationData {
    #data = {
        "county": "Berlin Mitte",
        "state": "NRW",
        "Country": "Germany",
        "favourites": [],
    };

    fromJson(json){
        this.#data = JSON.parse(json);
    }

    asJson(){
        this.#data.firstRun = false;
        return JSON.stringify(this.#data);
    }

    getCounty() {
        return this.#data.county;
    }

    setCounty(county) {
        this.#data.county = county;
    }

    getState() {
        return this.#data.state;
    }

    setState(state) {
        this.#data.state = state;
    }

    getCountry() {
        return this.#data.country;
    }

    setCountry(country) {
        this.#data.state = country;
    }

    getFavourites(){
        return this.#data.favourites;
    }

    addFavourite(county){
        this.#data.favourites.push(county);
    }

    removeFavourite(county){
        // Same as above get the index of the county from the favourite stored list
        const applicationDataFavouriteItemIndex = this.#data.favourites.indexOf(county);
        // Remove one favourite exists
        if(applicationDataFavouriteItemIndex >= 0){
            this.#data.favourites.splice(applicationDataFavouriteItemIndex  , 1);
        }

    }
}

const AppData = new ApplicationData();

export {AppData};
