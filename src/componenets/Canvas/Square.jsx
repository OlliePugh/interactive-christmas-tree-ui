import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import realtime, { functions } from "../../config/fb_config";
import { writeData } from "../../utils/fb_funcs";

export default function Square({
  boardId,
  id,
  currentColor,
  placeCooldownCheck,
}) {
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    const dbRef = ref(realtime, `board${boardId}/data/${id}`);
    onValue(dbRef, (snapshot) => {
      setColor(snapshot.val().color);
    });
  }, []);

  const setColorWrapper = async () => {
    if (!placeCooldownCheck()) {
      // cooldown not finished
      return;
    }
    setColor(currentColor);
    try {
      writeData(functions, {
        id,
        boardId,
        color: currentColor,
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      className="Square"
      onClick={setColorWrapper}
      id={id}
      style={{ backgroundColor: color }}
    ></div>
  );
}
