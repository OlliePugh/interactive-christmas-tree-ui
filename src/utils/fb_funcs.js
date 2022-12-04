import {
  getDownloadURL,
  getMetadata,
  getStorage,
  ref as sRef,
} from "@firebase/storage";
import { ref, onValue, get } from "firebase/database";
import { httpsCallable } from "firebase/functions";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../config/fb_config";

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

const resetLights = async (functions, data) => {
  const resetLightsFunction = httpsCallable(functions, "resetLights");
  try {
    const result = await resetLightsFunction(data);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

const writeLights = async (functions, data) => {
  const changeLight = httpsCallable(functions, "changeLight");
  const result = await changeLight(data);
  console.log(result);
};

const getBaubleBmpUrl = async (boardId) => {
  const storage = getStorage();
  const pathReference = sRef(storage, `board${boardId}`);
  return await getDownloadURL(pathReference);
};

const getBaubleMetaData = async (boardId) => {
  const storage = getStorage();
  const pathReference = sRef(storage, `board${boardId}`);
  return await getMetadata(pathReference);
};

const getBaubleRecentChanges = async (boardId) => {
  const metaData = await getBaubleMetaData(boardId);
  const recentChangesRef = collection(firestore, `board${boardId}`);
  const q = query(
    recentChangesRef,
    where("time", ">", new Date(metaData.timeCreated))
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
