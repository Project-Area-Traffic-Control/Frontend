// dependencies
import React from "react";
import PropTypes from "prop-types";

const hiddenStyle = {
    display: "hidden"
};

class ImageRotate extends React.Component {
    static propTypes = {
        file: PropTypes.object.isRequired
    };

    state = {
        file: '/static/junction/3way.jpg',
        degrees: 45
    };

    render() {
        const { file } = this.props;

        return (
            <div>
                <img src='/static/junction/3way.jpg' style={hiddenStyle} alt="" width='818px' height='660px' />
            </div>
        );
    }
}

export default ImageRotate;
