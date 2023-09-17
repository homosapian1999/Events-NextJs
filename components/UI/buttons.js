import Link from "next/link";
import classes from "./buttons.module.css";

const Buttons = (props) => {
  //   console.log(props);
  return (
    <Link href={props.link} className={classes.btn}>
      {props.children}
    </Link>
  );
};

export default Buttons;
