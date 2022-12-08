import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Faq = ({ question, answer, icon }) => {
  return (
    <Box>
      <Typography sx={{ fontWeight: "600" }}>{question}</Typography>
      <Typography marginLeft={"1rem"}>{answer}</Typography>
    </Box>
  );
};

export default Faq;
