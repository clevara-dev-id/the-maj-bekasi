import React from "react"

import "./index.css"

const Spinner = props => {
    return (
        <div className="custom-spinner">
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
        </div>
    );
};

export default Spinner