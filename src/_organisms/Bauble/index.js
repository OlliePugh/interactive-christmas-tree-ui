import { Box } from "@mui/system";

const Bauble = ({ openBauble, id, sx }) => {
  return (
    <Box
      sx={{ ...sx, position: "absolute", zIndex: 10 }}
      onClick={() => openBauble(id)}
    >
      <img
        height={"100px"}
        alt="Bauble"
        src={require("../../assetts/bauble.png")}
      />
    </Box>
  );
};

export default Bauble;
