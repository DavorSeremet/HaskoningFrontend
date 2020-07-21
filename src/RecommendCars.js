import React from 'react';
import './css/RecommendCars.css';
import './css/Global.css';

class RecommendCars extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cars: [],
            kmsPerMonth: null,
            fuelPrice: null,
            searchHasBeenMade: false,
            descriptionOfRecommendedCars: null

        }
    }

    search(){
        if((!this.state.kmsPerMonth || !this.state.fuelPrice) ||
                isNaN(this.state.kmsPerMonth) || isNaN(this.state.fuelPrice)){
            alert("Both the fields need to be filled with a valid(numeric) value to recommend cars.");

            return;
        }

        this.changeDescription();

        fetch("http://localhost:8080/recommend_cars/" + this.state.kmsPerMonth + "/" + this.state.fuelPrice)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    cars: result,
                    searchHasBeenMade: true
                });
            });
    }

    changeKmsPerMonth(kmsPerMonth){
        this.resetCarsAndDescription();
        this.setState({kmsPerMonth: kmsPerMonth.target.value})
    }

    changeFuelPrice(fuelPrice){
        this.resetCarsAndDescription();
        this.setState({fuelPrice: fuelPrice.target.value})
    }

    changeDescription(){
        this.setState({descriptionOfRecommendedCars:
                <div>
                    <h2>The cars ranked by their annual cost, when traveling {this.state.kmsPerMonth} km/month with a fuel price of {this.state.fuelPrice}, are shown below.</h2>
                </div>
        })
    }

    resetCarsAndDescription(){
        this.setState({descriptionOfRecommendedCars: null});
        this.setState({cars: []});
    }

    render(){
        const {cars} = this.state;

        return(
            <div id="recommend-cars">
                <div id="recommend-cars-input">
                    <div class="recommend-cars-field">
                        <label>Expected amount of travel per month in kilometers:</label>
                        <input type="text" onChange={this.changeKmsPerMonth.bind(this)}/>
                    </div>
                    <div className="recommend-cars-field">
                        <label>Current cost of fuel in euro/L:</label>
                        <input type="text" onChange={this.changeFuelPrice.bind(this)}/>
                    </div>
                    <button id="recommend-cars-submit"  class="button" onClick={ this.search.bind(this)}>RECOMMEND A CAR</button>
                </div>
                {this.state.descriptionOfRecommendedCars}
                <div>
                    {cars.map(car => (
                        < div className="recommended-car">
                        Make: {car.make}
                        <hr></hr>
                        Model: {car.model}
                        <hr></hr>
                        Version: {car.version}
                        <hr></hr>
                        Year of release: {car.yearOfRelease}
                        <hr></hr>
                        Fuel consumption km/L: {car.fuelConsumption}
                        <hr></hr>
                        Annual maintenance cost: {car.annualMaintenanceCost.toFixed(2)}
                        <hr></hr>
                            <b>Total annual cost: {parseFloat(car.totalAnnualCost).toFixed(2)}</b>
                        <hr></hr>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default RecommendCars;