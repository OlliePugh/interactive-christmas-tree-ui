import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { colours } from "../../utils/palette";

const Footer = () => {
  return (
    <Box backgroundColor={colours.PRIMARY2}>
      <Typography align="right" marginRight="10px" color={"white"}>
        Copyright © 2022 Oliver Pugh{" "}
      </Typography>
    </Box>
  );
};

export default Footer;
