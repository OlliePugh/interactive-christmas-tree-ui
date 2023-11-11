import { Box } from "@mui/system";
import { Typography, Link } from "@mui/material";
import { colours } from "@/config/palette";

const Footer = () => {
  return (
    <Box
      display={"inline-flex"}
      sx={{ width: "100%", backgroundColor: colours.PRIMARY2 }}
    >
      <Link
        style={{ textDecoration: "none" }}
        href="https://www.iubenda.com/privacy-policy/33877500"
        target={"_blank"}
      >
        <Typography
          display={"inline"}
          align="left"
          marginRight="10px"
          color={"white"}
        >
          Privacy Policy
        </Typography>
      </Link>
      <Link
        style={{ textDecoration: "none" }}
        href="https://www.iubenda.com/privacy-policy/33877500/cookie-policy"
        target={"_blank"}
      >
        <Typography
          display={"inline"}
          align="left"
          marginRight="10px"
          color={"white"}
        >
          Cookie Policy
        </Typography>
      </Link>
      <Typography
        align="right"
        marginRight="10px"
        color={"white"}
        display={"inline"}
        flex={1}
      >
        Copyright © 2022 Oliver Pugh
      </Typography>
    </Box>
  );
};

export default Footer;
