class ApplicationSettings {
    #data = {
        "gps": false
    }

    fromJson(json){
        this.#data = JSON.parse(json);
    }

    asJson(){
        return JSON.stringify(this.#data);
    }

    gpsEnabled() {
        return this.#data.gps;
    }

    setGpsState(value){
        this.#data.gps = value;
    }
}

const AppSettings = new ApplicationSettings();

export {AppSettings};
