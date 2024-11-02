import React, { useState } from 'react';

const InfoDisplay = () => {
  const [info, setInfo] = useState({
    description: "Welcome to the Fullstack Development",
    name: "Pegah Ghods Mohammadi",
    id: "101479024",
    message: "George Brown College"
  });

  return (
    <div>
      <h1>{info.description}</h1>
      <h2>{info.name}</h2>
      <h3>{info.id}</h3>
      <p>{info.message}</p>
    </div>
  );
};

export default InfoDisplay;
