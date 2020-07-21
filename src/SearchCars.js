import React from 'react';
import './css/SearchCars.css';
import './css/Global.css';

class SearchCars extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cars: [],
            year: null,
            make: null,
            baseUrl: "http://localhost:8080/search_cars"
        }
    }

    componentDidMount() {
        fetch(this.state.baseUrl)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    cars: result
                });
            });
    }

    search(){
        let url = "";
        if(this.state.make && this.state.year){
            url = "http://localhost:8080/search_cars/make/" + this.state.make + "/year/" + this.state.year;
        }
        else if(this.state.make && !this.state.year){
            url = "http://localhost:8080/search_cars/make/" + this.state.make;
        }
        else if(!this.state.make && this.state.year){
            url = "http://localhost:8080/search_cars/year/" + this.state.year;
        }
        else{
            url = this.state.baseUrl;
        }

        fetch(url)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    cars: result
                });
            });
    }

    changeMake(make){
        this.setState({make: make.target.value})
    }

    changeYear(year){
        this.setState({year: year.target.value})
    }

    render(){
        const {cars} = this.state;
        return(
            <div id="search-cars">
                <div id="search-cars-input">
                    <div id="search-cars-input-labels">
                        <label className="search-cars-input-label">Make:</label>
                        <input type="text" onChange={this.changeMake.bind(this)}/>
                        <label id="search-cars-input-year" className="search-cars-input-label">Year:</label>
                        <input type="text" onChange={this.changeYear.bind(this)}/>
                    </div>
                    <button id="search-cars-submit" class="button" onClick={ this.search.bind(this)}>SEARCH FOR CARS</button>
                </div>
                <div id="found-cars">
                    {cars.map(car => (
                        <div class="found-car">
                            Make: {car.make}
                            <hr></hr>
                            Model: {car.model}
                            <hr></hr>
                            Version: {car.version}
                            <hr></hr>
                            Year of release: {car.yearOfRelease}
                            <hr></hr>
                            Price: {car.price.toFixed(2)}
                            <hr></hr>
                            Fuel consumption km/L: {car.fuelConsumption}
                            <hr></hr>
                            Annual maintenance cost: {car.annualMaintenanceCost.toFixed(2)}
                            <hr></hr>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default SearchCars;