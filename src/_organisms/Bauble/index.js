import { Box } from "@mui/system";

const Bauble = ({ openBauble, id }) => {
  return (
    <Box
      sx={{ position: "absolute", zIndex: 10 }}
      onClick={() => openBauble(id)}
    >
      <img height={"100px"} src={require("../../assetts/bauble.png")} />
    </Box>
  );
};

export default Bauble;
