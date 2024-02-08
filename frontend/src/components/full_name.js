import './full_name.css';

const FullName = ({firstName, lastName, age, address, addressTwo, city, state, zip}) => {
    return(
    <div>
        <p className="container text-center">
            First name is: {firstName}  & last name is: {lastName} & age is: {age} 
            & address is: {address} & address 2 is: {addressTwo} & city is: {city} & state is: {state} & zipCode is: {zip}
        </p>
    </div>
    )
}

export default FullName