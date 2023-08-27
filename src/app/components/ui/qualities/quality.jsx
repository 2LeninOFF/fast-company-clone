import React from "react";
import PropTypes from "prop-types";
<<<<<<< Updated upstream
const Quality = ({ color, name, _id }) => {
=======

const Quality = ({ color, name }) => {
>>>>>>> Stashed changes
    return (
        <span className={"badge m-1 bg-" + color}>
            {name}
        </span>
    );
};
Quality.propTypes = {
<<<<<<< Updated upstream
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
=======
    color: PropTypes.string,
    name: PropTypes.string
>>>>>>> Stashed changes
};

export default Quality;
