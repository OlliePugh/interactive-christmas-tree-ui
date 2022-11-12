import { ref, onValue, set, get } from "firebase/database";
import { httpsCallable } from "firebase/functions";

function ListenData(db, path) {
  const dbRef = ref(db, path);
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    return data;
  });
}

function ReadOnce(db, path) {
  const dbRef = ref(db, path);
  get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return new Error("no data");
    }
  });
}

async function WriteData(functions, data) {
  const changeSquare = httpsCallable(functions, "changeSquare");
  const result = await changeSquare(data);
  console.log(result);
  // set(ref(db, path), data);
}

async function resetBoard(functions, data) {
  const resetBoardFunction = httpsCallable(functions, "resetBoard");
  console.log(resetBoardFunction);

  const result = await resetBoardFunction(data);
  console.log(result);
}

export { ListenData, ReadOnce, WriteData, resetBoard };
