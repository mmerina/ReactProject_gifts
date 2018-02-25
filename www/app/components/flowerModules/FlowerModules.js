import React, { Component } from 'react';
import {connect} from "dva";


import FlowerShow from "./flowerShow/FlowerShow";
import FlowerList from "./flowerList/FlowerList";

class FlowerModules extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( 
        <div>
            {/*
            <FlowerList></FlowerList>
            <FlowerShow></FlowerShow>
            */}
        </div>
         )
    }
}
 
export default connect()(FlowerModules);