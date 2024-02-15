import React, { useState } from "react";
import FirstName from "./user_info";
import FullInfo from "./full_name";
import './css_components/main_page.css';

const Buttons = () => {

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
        די קומענדיגע מאל וואס מען פארט אהיים איז ... עס זענען איינגעשריבן ? בחורים קיין  
        <span className="fw-bold"> וויליאמסבורג </span>
            און ? בחורים קיין <span className="fw-bold"> מאנסי </span>
             און ? בחורים קיין <span className="fw-bold"> בארא פארק </span>
    </h2>

    <div className="container text-center mt-5 btn_div">
      
        <button onClick={toggleVisibility} 
          className="btn btn-outline-primary btn-lg w-25"
          style={{ height: '150px'}}
          >
           {isVisible ? 'Hide student detail' : 'View student detail'}
        </button>
        {isVisible && < FullInfo />}

        <button onClick={toggleVisibilityForm} 
          className="btn btn-outline-primary btn-lg w-25"
          style={{ height: '150px'}}
          >
          {isFormVisible ? 'Hide add student' : 'Add student'}
        </button>
      {isFormVisible && < FirstName />}
    </div>

    <div className="container text-center">
    <button onClick={toggleVisibilityWili} 
          className="btn btn-outline-primary btn-lg w-25"
          style={{ height: '150px'}}
          >
          {isWiliVisible ? 'Hide Williamsburg' : 'Williamsburg'}
        </button>

        <button onClick={toggleVisibilityBP} 
          className="btn btn-outline-primary btn-lg w-25"
          style={{ height: '150px'}}
          >
          {isBPVisible ? 'Hide Borough Park' : 'Borough Park'}
        </button>

        <button onClick={toggleVisibilityMonsey} 
          className="btn btn-outline-primary btn-lg w-25"
          style={{ height: '150px'}}
          >
          {isMonseyVisible ? 'Hide Monsey' : 'Monsey'}
        </button>
    </div>
    </>
    )
}

export default Buttons