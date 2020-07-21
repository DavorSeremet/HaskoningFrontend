import React from 'react';
import './css/App.css';
import './css/AddCar.css';
import './css/Global.css';

class AddCar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            year: null,
            make: null,
            model: null,
            version: null,
            price: null,
            fuelConsumption: null,
            annualMaintenance: null,
            digitsValid: null,
            carAddedMessage: null
        }
    }

    changeMake(make){
        this.setState({make: make.target.value})
    }

    changeYear(year){
        this.setState({year: year.target.value})
    }

    changeModel(model){
        this.setState({model: model.target.value})
    }

    changeVersion(version){
        this.setState({version: version.target.value})
    }

    changePrice(price){
        this.setState({price: price.target.value})
    }

    changeFuelConsumption(consumption){
        this.setState({fuelConsumption: consumption.target.value})
    }

    changeAnnualCost(cost){
        this.setState({annualMaintenance: cost.target.value})
    }

    changeCarAddedMessage(){
        this.setState({carAddedMessage:
                <p id="car-added-message">A {this.state.make} {this.state.model} {this.state.version} has been added to the store.</p>
        });
    }

    hideCarAddedMessage(){
        setTimeout(function(){document.getElementById("car-added-message").style.opacity="0"},
                1000);
    }

    addCarToStore(){
        if(!this.state.year || !this.state.make || !this.state.model || !this.state.version ||
            !this.state.price || !this.state.annualMaintenance || !this.state.fuelConsumption){
            alert("Not all the required fields have been filled.");

            return;
        }

        if(isNaN(this.state.price) || isNaN(this.state.annualMaintenance) || isNaN(this.state.fuelConsumption)||
            isNaN(this.state.year)){
            alert("One or more of the required fields do not have a valid input.")

            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ yearOfRelease: parseInt(this.state.year), make: this.state.make, version: this.state.version,
                model: this.state.model, price: parseFloat(this.state.price), annualMaintenanceCost: parseFloat(this.state.annualMaintenance),
                fuelConsumption: parseInt(this.state.fuelConsumption)})
        };
        fetch("http://localhost:8080/add_car", requestOptions);

        this.changeCarAddedMessage();
        this.hideCarAddedMessage();
    }

    render(){
        return(
            <div id="add-car-data">
                <div class="add-car-field">
                    <label>Make: </label>
                    <input type="text" onChange={this.changeMake.bind(this)}/>
                </div>
                <div class="add-car-field">
                    <label>Model: </label>
                    <input type="text" onChange={this.changeModel.bind(this)}/>
                </div>
                <div class="add-car-field">
                    <label>Version: </label>
                    <input type="text" onChange={this.changeVersion.bind(this)}/>
                </div>
                <div class="add-car-field">
                    <label>Year of release: </label>
                    <input type="text" onChange={this.changeYear.bind(this)}/>
                </div>
                <div class="add-car-field">
                    <label>Price: </label>
                    <input type="text" onChange={this.changePrice.bind(this)}/>
                </div>
                <div class="add-car-field">
                    <label>Fuel consumption(km/L): </label>
                    <input type="text" onChange={this.changeFuelConsumption.bind(this)}/>
                </div>
                <div class="add-car-field">
                    <label>Annual maintenance cost: </label>
                    <input type="text" onChange={this.changeAnnualCost.bind(this)}/>
                </div>
                <button id="add-car-submit" className="button" onClick={this.addCarToStore.bind(this)}>ADD A CAR TO THE STORE</button>
                {this.state.carAddedMessage}
            </div>
        )
    }
}

export default AddCar;