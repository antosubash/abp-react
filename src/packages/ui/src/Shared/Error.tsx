import React from 'react';

interface ErrorProps {
    message?: string;
}

const Error = (props: ErrorProps) => {
    return <div>Error :( {props.message}</div>;
};

export default Error;
