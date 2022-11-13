import { ref, onValue, set, get } from "firebase/database";
import { httpsCallable } from "firebase/functions";

const listenData = (db, path) => {
  const dbRef = ref(db, path);
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    return data;
  });
};

const readOnce = (db, path) => {
  const dbRef = ref(db, path);
  get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return new Error("no data");
    }
  });
};

const writeData = async (functions, data) => {
  const changeSquare = httpsCallable(functions, "changeSquare");
  const result = await changeSquare(data);
  console.log(result);
  // set(ref(db, path), data);
};

const resetBoard = async (functions, data) => {
  const resetBoardFunction = httpsCallable(functions, "resetBoard");
  try {
    const result = await resetBoardFunction(data);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

export { listenData, readOnce, writeData, resetBoard };
