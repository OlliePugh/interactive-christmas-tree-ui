import { ReactComponent as BulbImage } from "../../assetts/bulb.svg";
import { ReactComponent as BulbSocket } from "../../assetts/socket.svg";
import { Box } from "@mui/system";
const Bulb = ({ sx }) => {
  return (
    <Box
      sx={{ ...sx }}
      display={"flex"}
      flexDirection={"column"}
      position={"absolute"}
    >
      <BulbSocket height={20} style={{ transform: "translateY(1px)" }} />
      <BulbImage height={20} fill="green" stroke="black" strokeWidth={20} />
    </Box>
  );
};

export default Bulb;
