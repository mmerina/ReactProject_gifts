import React, { Component } from 'react';
import {connect} from "dva";

import FlowerFilterBox from "./FlowerFilterBox";
import FlowerTableBox from "./FlowerTableBox";
import FlowerShow from "../flowerShow/FlowerShow";
import Buy from "../../../containers/Buy.js";

import "./FlowerList.less";

class FlowerList extends Component {
    constructor(props) {
        super(props);
        props.dispatch({ "type":"flowerlist/init"});
        this.state={
            isFlowerShow:false
        }
    }
    setFlowerShow(bool){
        this.setState({"isFlowerShow":bool});
    }
    render() { 
        return ( 
            <Buy columnKey="flowerlist" columnName="鲜花">
            <div>
                    {!this.state.isFlowerShow?
                        <div>
                            <FlowerFilterBox></FlowerFilterBox>
                            <FlowerTableBox setFlowerShow={this.setFlowerShow.bind(this)}></FlowerTableBox> 
                        </div>
                    :
                        <FlowerShow setFlowerShow={this.setFlowerShow.bind(this)}></FlowerShow>
                    }
                
            </div>
        </Buy>

         )
    }
}
 
export default connect()(FlowerList);