import React from 'react';
import PropTypes from 'prop-types';

const Naslov = props => {
    return (
        <>
            <div className="service_section layout_padding m-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <h1 className="service_taital">{
                                props.title
                            }</h1>
                            <p className="text-center">
                                {
                                    props.subtitle
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Naslov.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
};

export default Naslov;