import React from 'react';
import PropTypes from 'prop-types';

const Container = (props) => {
    return (
        <div className="App">
            <div className="container vh-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="questions-container col-12 col-md-8">
                        <div className="question">
                            <div className="question-content">
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Container.propTypes = {};

export default Container;