import React, { useState } from "react";

const Card = ({ name, image }) => {
    return <img className="Card" src={image} style={{ position: "absolute"}} />
}

export default Card;