import BaublePanel from "../BaublePanel";
import OutsideClickHandler from "react-outside-click-handler";
import { Paper } from "@mui/material";
import { ToastPayload } from "@/@types/toast";
import { UserContext } from "@/components/_atoms/UserProvider";
import { useState, useContext } from "react";

interface BaublePaper {
  setBaubleOpen: (id: number | null) => void;
  baubleOpen: number | null;
  boardId: number;
  setToastMessage: (payload: ToastPayload) => void;
}

const BaublePaper = ({
  setBaubleOpen,
  baubleOpen,
  boardId,
  setToastMessage,
}: BaublePaper) => {
  const { isAdmin } = useContext(UserContext);
  const [isAdminMode, setIsAdminMode] = useState(false);
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (baubleOpen === boardId) {
          setBaubleOpen(null);
          setIsAdminMode(false);
        }
      }}
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
          isAdmin={isAdmin || false}
          isAdminMode={isAdminMode}
          setIsAdminMode={setIsAdminMode}
          setBaubleOpen={setBaubleOpen}
          boardId={boardId}
          setToastMessage={setToastMessage}
        />
      </Paper>
    </OutsideClickHandler>
  );
};

export default BaublePaper;
