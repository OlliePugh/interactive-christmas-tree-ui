import { useRef, useEffect, useState } from "react";

const Countdown = ({ targetDate }) => {
  const [num, setNum] = useState(Math.floor((targetDate - Date.now()) / 1000));
  const numRef = useRef();

  useEffect(() => {
    if (num) {
      numRef.current = num;
    }
  }, [num]);

  let intervalRef = useRef();

  const decreaseNum = () => setNum((prev) => prev - 1);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (num && numRef.current <= 1) {
        clearInterval(intervalRef.current);
        setNum(0);
      } else {
        decreaseNum();
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [num]);

  return <span>{num < 0 ? 0 : num}</span>;
};

export default Countdown;
