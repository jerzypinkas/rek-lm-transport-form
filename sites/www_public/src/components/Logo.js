import React, { Component } from "react";

class Logo extends React.Component {
    render() {
        const hStyle = {
            color: "#072C57",
            padding: "10px",
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: 800,
            fontSize: '96px',
            lineHeight: '112px',
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0
        };

        return (
            <div>
                <h1 style={hStyle}>AirCargo</h1>
            </div>
        );
    }
}

export default Logo;