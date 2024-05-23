import { Link } from "react-router-dom";

const items = [
  {
    label: (
      <Link target="_blank" style={{ textDecoration: "none" }}>
        באסעס
      </Link>
    ),
    key: "0",
  },
  {
    label: (
      <Link target="_blank" style={{ textDecoration: "none" }}>
        וועש
      </Link>
    ),
    key: "1",
  },
  {
    label: (
      <Link target="_blank" style={{ textDecoration: "none" }}>
        באסעס און וועש
      </Link>
    ),
    key: "2",
  },
];

export default items;
