import BaublePanel from "../BaublePanel";
import OutsideClickHandler from "react-outside-click-handler";
import { Paper } from "@mui/material";

const BaublePaper = ({
  setBaubleOpen,
  baubleOpen,
  userData,
  boardId,
  setToastMessage,
}) => {
  return (
    <OutsideClickHandler
      onOutsideClick={() => baubleOpen === boardId && setBaubleOpen()}
    >
      <Paper
        sx={{
          display: baubleOpen === boardId ? "block" : "none",
          zIndex: 100,
          margin: "auto",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          position: "absolute",
          height: "80%",
          width: "95%",
          overflow: "hidden",
        }}
        elevation={24}
        className={"bauble-wrapper"}
      >
        <BaublePanel
          userData={userData}
          boardId={boardId}
          setToastMessage={setToastMessage}
        />
      </Paper>
    </OutsideClickHandler>
  );
};

export default BaublePaper;
