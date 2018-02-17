import React, { Component } from 'react';
import {connect} from "dva";


import FlowerShow from "./flowerShow/FlowerShow"

class FlowerList extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( 
            <FlowerShow></FlowerShow>
         )
    }
}
 
export default connect()(FlowerList);