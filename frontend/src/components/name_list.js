import React, { useState } from "react"
import FullName from "./full_name"
import FirstName from "./name";
import './name_list.css';

const NameList = () => {
    const [names, setNames] = useState([]);
  
    const addName = (newName) => {
      setNames([...names, newName]);
    };
  
    return (
      <div>
        {/* loads all input values */}
        <FirstName addName={addName} />
        {/* loop over user input */}
        {names.map((name, index) => (
          <FullName key={index} 
          firstName={name.firstName} 
          lastName={name.lastName} 
          age={name.age}
          address={name.address}
          addressTwo={name.addressTwo}
          city={name.city} 
          state={name.state} 
          zip={name.zip} 
          />
        ))}
      </div>
    );
  };

export default NameList