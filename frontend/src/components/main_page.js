import React, { useState } from "react";
import FirstName from "./user_info";
import FullInfo from "./full_name";
import './css_components/main_page.css';

const Buttons = ({ cityCounts }) => {

  const [isFormVisible, setFormVisible] = useState(false)
  const [isVisible, setVisible] = useState(false)
  const [isWiliVisible, setWiliVisible] = useState(false)
  const [isBPVisible, setBPVisible] = useState(false)
  const [isMonseyVisible, setMonseyVisible] = useState(false)
  

  const toggleVisibility = () => {
    setVisible((prevVisibility) => !prevVisibility);
  };

  const toggleVisibilityForm = () => {
    setFormVisible((prevVisibility) => !prevVisibility);
  };

  const toggleVisibilityWili = () => {
    setWiliVisible((prevVisibility) => !prevVisibility);
  };

  const toggleVisibilityBP = () => {
    setBPVisible((prevVisibility) => !prevVisibility);
  };

  const toggleVisibilityMonsey = () => {
    setMonseyVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <>
    <h2 className="container text-center mt-5">
    <span>?</span> די קומענדיגע מאל וואס מען פארט אהיים איז 
    </h2>

    <div className="container text-center mt-5 btn_div">
      
        <button onClick={toggleVisibility} 
          className="btn btn-outline-primary btn-lg w-25"
          style={{ height: '150px'}}
          >
           {isVisible ? 'Hide student detail' : 'בחורים אינפארמאציע'}
        </button>
        {isVisible && < FullInfo />}

        <button onClick={toggleVisibilityForm} 
          className="btn btn-outline-primary btn-lg w-25"
          style={{ height: '150px'}}
          >
          {isFormVisible ? 'Hide add student' : 'לייג צו נאך א בחור'}
        </button>
      {isFormVisible && < FirstName />}
    </div>

    <div className="container text-center">
    <button onClick={toggleVisibilityWili} 
          className="btn btn-outline-primary btn-lg w-25"
          style={{ height: '150px'}}
          >
          {isWiliVisible ? 'Hide Williamsburg' : `עס איז איינגעשריבן ${cityCounts.brooklyn || 0} בחורים קיין וויליאמסבורג`}
        </button>

        <button onClick={toggleVisibilityBP} 
          className="btn btn-outline-primary btn-lg w-25"
          style={{ height: '150px'}}
          >
          {isBPVisible ? 'Hide Boro Park' : `עס איז איינגעשריבן ${cityCounts.boropark || 0} בחורים קיין בארא פארק`}
        </button>

        <button onClick={toggleVisibilityMonsey} 
          className="btn btn-outline-primary btn-lg w-25"
          style={{ height: '150px'}}
          >
          {isMonseyVisible ? 'Hide Monsey' : `עס איז איינגעשריבן ${cityCounts.monsey || 0} בחורים קיין מאנסי`}
        </button>
    </div>
    </>
    )
}

export default Buttons