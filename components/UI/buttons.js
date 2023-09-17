import Link from "next/link";
import classes from "./buttons.module.css";

const Buttons = (props) => {
  //   console.log(props);
  if (props.link) {
    return (
      <Link href={props.link} className={classes.btn}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.OnClick}>
      {props.children}{" "}
    </button>
  );
};

export default Buttons;
