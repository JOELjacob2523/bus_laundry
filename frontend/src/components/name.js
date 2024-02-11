import 'bootstrap/dist/css/bootstrap.css';
import { userInfo } from "./try_axios";
import { useRef } from 'react';

const FirstName = () => {

  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userInfo(e);
    formRef.current.reset();
  };

    return ( 
    <div className="container text-center rounded-3 bg-secondary py-3 p-5 mt-5">
            <h3 className="text-center text-light">Please fill out the following fields:</h3>
            <form 
            ref={formRef}
            onSubmit={handleSubmit}
            method="POST"
            action="/user_info"
            className="container text-center">

            <div className="d-flex flex-row mt-4">
                <input 
                  className="col-4 p-2 m-1 rounded-3"
                  type="text" 
                  name="first_name" 
                  placeholder="first name.."
                  required
                />

                <input 
                  className="col-4 p-2 m-1 rounded-3"
                  type="text" 
                  name="last_name" 
                  placeholder="last name.."
                  required
                />

                <input 
                  className="col-4 p-2 m-1 rounded-3"
                  type="number" 
                  name="age" 
                  placeholder="age.."
                  required
                />
                </div>

                <div className="d-flex flex-row">

                <input 
                  className="col-6 p-2 m-1 rounded-3"
                  type="text" 
                  name="address1" 
                  placeholder="address.."
                  required
                />

                <input 
                  className="col-6 p-2 m-1 rounded-3"
                  type="text" 
                  name="address2" 
                  placeholder="address 2.."
                  required
                />

                </div>
                
                <div className="d-flex flex-row">
                <input 
                  className="col-4 p-2 m-1 rounded-3"
                  type="text" 
                  name="city" 
                  placeholder="city.."
                  required
                />

                <input 
                  className="col-4 p-2 m-1 rounded-3"
                  type="text" 
                  name="state" 
                  placeholder="state.."
                  required
                />

                <input 
                  className="col-4 p-2 m-1 rounded-3"
                  type="text" 
                  name="zip_code" 
                  placeholder="zip code.."
                  required
                />
                </div>

                <div className="container text-center">
                <input className="btn btn-outline-light btn-lg w-25 mt-4"
                value="Submit" 
                type="submit"
                 />
                 </div>
            </form>
        </div>
    );
};

export default FirstName