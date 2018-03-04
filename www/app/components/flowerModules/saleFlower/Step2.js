import React, { Component } from 'react';
import {connect} from "dva";

class Step2 extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( 
            <div className="step2">
                Step2
            </div>
         )
    }
}
 
export default connect()(Step2);