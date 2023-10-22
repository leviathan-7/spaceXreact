class SpaceX{

    constructor(baseUrl = "https://api.spacexdata.com/v4/") {
        this.baseUrl = baseUrl;
        this.Launches = fetch(`${this.baseUrl}launches`)
        .then(response=>response.json());
        this.Launchpads = fetch(`${this.baseUrl}launchpads`)
        .then(response=>response.json());
    }

    launches(){
        return this.Launches
    }

    launchpads(){
        return this.Launchpads
    }

    launchpad(id){
        return fetch(`${this.baseUrl}launchpads/${id}`)
            .then(response=>response.json());
    }

    starlinks(){
        return fetch(`${this.baseUrl}starlink`)
            .then(response=>response.json());
    }
}

export {SpaceX}


