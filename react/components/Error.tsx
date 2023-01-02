import React from "react";

interface Props {
    message?: string;
}

const Error = (props: Props) => {
return <div>Error :( {props.message}</div>;
};

export default Error;
