import React, { Component } from 'react';
import {connect} from "dva";

class Step1 extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( 
            <div className="step1">
                Step1
            </div>
         )
    }
}
 
export default connect()(Step1);