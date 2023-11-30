import { getDownloadURL, getMetadata, ref as sRef } from "@firebase/storage"; // TODO remove this dep
import { ref, onValue, get, Database } from "firebase/database";
import { Functions, httpsCallable } from "firebase/functions";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { firestore, storage } from "@/config/fb_config";

const listenData = (db: Database, path: string) => {
  const dbRef = ref(db, path);
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    return data;
  });
};

const readOnce = (db: Database, path: string) => {
  const dbRef = ref(db, path);
  get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return new Error("no data");
    }
  });
};

const writeData = async (
  functions: Functions,
  data: {
    id: number;
    boardId: number;
    colour: string;
  }
) => {
  const changeSquare = httpsCallable(functions, "changeSquare");
  const result = await changeSquare(data);
  console.log(result);
};

const resetBoard = async (functions: Functions, data: unknown) => {
  const resetBoardFunction = httpsCallable(functions, "resetBoard");
  try {
    const result = await resetBoardFunction(data);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

const resetLights = async (functions: Functions, data: { length: number }) => {
  const resetLightsFunction = httpsCallable(functions, "resetLights");
  try {
    const result = await resetLightsFunction(data);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

const writeLights = async (
  functions: Functions,
  data: { id: number; colour: string }
) => {
  const changeLight = httpsCallable(functions, "changeLight");
  const result = await changeLight(data);
};

const getBaubleBmpUrl = async (boardId: number) => {
  const pathReference = sRef(storage, `board${boardId}`);
  return await getDownloadURL(pathReference);
};

const getBaubleMetaData = async (boardId: number) => {
  const pathReference = sRef(storage, `board${boardId}`);
  return await getMetadata(pathReference);
};

const getBaubleRecentChanges = async (boardId: number) => {
  const metaData = await getBaubleMetaData(boardId);
  const recentChangesRef = collection(firestore, `board${boardId}`);
  const q = query(
    recentChangesRef,
    where("time", ">", new Date(metaData.timeCreated)),
    orderBy("time")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot;
};

export {
  getBaubleRecentChanges,
  getBaubleBmpUrl,
  listenData,
  readOnce,
  writeData,
  resetBoard,
  resetLights,
  writeLights,
};
