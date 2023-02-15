import React, { Component } from "react";
import { DropzoneArea } from "mui-file-dropzone";

class DropZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
        };
    }
    handleChange(files) {
        this.setState({
            files: files,
        });
    }
    render() {
        return <DropzoneArea style={{width: '33%'}} onChange={this.handleChange.bind(this)} dropzoneText={'Shipping documents. Drag and drop a file here or click'} />;
    }
}

export default DropZone;