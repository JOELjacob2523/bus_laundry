import { Link } from "react-router-dom";

const Details = () => {
  let pay = "https://secure.cardknox.com/congmesivta";
  return (
    <Link to={pay} target="_blank">
      Make a payment
    </Link>
  );
};

export default Details;
