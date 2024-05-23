import { Link } from "react-router-dom";

const Details = () => {
  let pay = "https://secure.cardknox.com/congmesivta";
  return (
    <div className="main_details_container">
      <div>add going home weeks</div>
      <div>
        add total amount of gaol for this zman
        <div>add amount of goal for buses</div>
        <div>add amount of goal for wash</div>
      </div>
      <div>
        <Link to={pay} target="_blank">
          Make a payment
        </Link>
      </div>
    </div>
  );
};

export default Details;
