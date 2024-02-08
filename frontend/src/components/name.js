import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

const FirstName = ({ addName }) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [address, setAddress] = useState("")
    const [addressTwo, setAddressTwo] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")

    const firstNameInput = (event) => {
        setFirstName(event.target.value)
    }

    const lastNameInput = (event) => {
        setLastName(event.target.value)
    }

    const ageInput = (event) => {
      setAge(event.target.value)
    }

    const addressInput = (event) => {
      setAddress(event.target.value)
    }

    const addressTwoInput = (event) => {
      setAddressTwo(event.target.value)
    }

    const cityInput = (event) => {
      setCity(event.target.value)
    }

    const stateInput = (event) => {
      setState(event.target.value)
    }

    const zipInput = (event) => {
      setZip(event.target.value)
    }
    return ( 
    <div className="container text-center rounded-3 bg-secondary py-3 p-5 mt-5">
            <h3 className="text-center text-light">Please fill out the following fields:</h3>
            <form className="container text-center">

            <div className="d-flex flex-row mt-4">
                <input 
                  className="col-4 p-2 m-1 rounded-3"
                  type="text" 
                  onChange={firstNameInput} 
                  name="firstName" 
                  value={firstName} 
                  placeholder="first name.."
                />

                <input 
                  className="col-4 p-2 m-1 rounded-3"
                  type="text" 
                  onChange={lastNameInput} 
                  name="lastName" 
                  value={lastName} 
                  placeholder="last Name.."
                />

                <input 
                  className="col-4 p-2 m-1 rounded-3"
                  type="number" 
                  onChange={ageInput} 
                  name="age" 
                  value={age} 
                  placeholder="age.."
                />
                </div>

                <div className="d-flex flex-row">

                <input 
                  className="col-6 p-2 m-1 rounded-3"
                  type="text" 
                  onChange={addressInput} 
                  name="address" 
                  value={address} 
                  placeholder="address.."
                />

                <input 
                  className="col-6 p-2 m-1 rounded-3"
                  type="text" 
                  onChange={addressTwoInput} 
                  name="addressTwo" 
                  value={addressTwo} 
                  placeholder="address 2.."
                />

                </div>
                
                <div className="d-flex flex-row">
                <input 
                  className="col-4 p-2 m-1 rounded-3"
                  type="text" 
                  onChange={cityInput} 
                  name="city" 
                  value={city} 
                  placeholder="city.."
                />

                <input 
                  className="col-4 p-2 m-1 rounded-3"
                  type="text" 
                  onChange={stateInput} 
                  name="state" 
                  value={state} 
                  placeholder="state.."
                />

                <input 
                  className="col-4 p-2 m-1 rounded-3"
                  type="text" 
                  onChange={zipInput} 
                  name="zip" 
                  value={zip} 
                  placeholder="zip code.."
                />
                </div>

                <div className="container text-center">
                <button className="btn btn-outline-light btn-lg w-25 mt-4" type="button" onClick={ () => {
                    addName({firstName, lastName, age, address, addressTwo, city, state, zip})
                    setFirstName("")
                    setLastName("")
                    setAge("")
                    setAddress("")
                    setAddressTwo("")
                    setCity("")
                    setState("")
                    setZip("")
                 }}>Submit</button>
                 </div>
            </form>
        </div>
    );
};

export default FirstName