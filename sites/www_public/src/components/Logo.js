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
            marginBottom: 0,
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 4px 8px 14px rgba(0, 0, 0, 0.25)'
        };

        return (
            <div>
                <h1 style={hStyle}>AirCargo</h1>
            </div>
        );
    }
}

export default Logo;