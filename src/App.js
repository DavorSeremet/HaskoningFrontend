import React from 'react';
import './css/App.css';
import './css/Global.css';
import SearchCars from "./SearchCars";
import AddCar from "./AddCar";
import RecommendCars from "./RecommendCars";
import royalHaskoningLogo from "./images/royal_haskoning_logo.png"

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            component: <SearchCars />
        }
    }

    render(){
        return (
            <div id="app">
                <div id="toolbar">
                    <div id="toolbar-image">
                        <img src={royalHaskoningLogo} alt="Royal HaskoningDHV logo"/>
                    </div>
                    <div id="toolbar-buttons">
                        <button id="search-car" className="toolbar-option button"
                                onClick={() => this.setState({component: <SearchCars/>})}>SEARCH FOR CARS
                        </button>
                        <button id="add-car" className="toolbar-option button"
                                onClick={() => this.setState({component: <AddCar/>})}>ADD A CAR
                        </button>
                        <button id="advise" className="toolbar-option button"
                                onClick={() => this.setState({component: <RecommendCars/>})}>RECOMMEND A CAR
                        </button>
                    </div>
                </div>
                {this.state.component}
            </div>
        )
    }
}

export default App;