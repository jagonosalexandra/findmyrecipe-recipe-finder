import { useEffect } from "react";
import { useNavigationType } from "react-router-dom";

function ScrollToTop() {
  const navType = useNavigationType();

  useEffect(() => {
    if (navType === "PUSH") scrollTo(0, 0);
    else return;
  }, [navType]);
  console.log(useNavigationType());
  return null;
}

export default ScrollToTop;
