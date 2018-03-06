import React, { Component } from 'react';
import {connect} from "dva";

import FileList from "./FileList/FileList";

class FileManagerModules extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( 
        <div>
            {/*            
    */}
    <FileList></FileList>
        </div>
         )
    }
}
 
export default connect()(FileManagerModules);