import { Typography } from "@mui/material";
import { Box } from "@mui/system";

interface FaqProps {
  question: string;
  answer: string;
}

const Faq = ({ question, answer }: FaqProps) => {
  return (
    <Box>
      <Typography sx={{ fontWeight: "600" }}>{question}</Typography>
      <Typography marginLeft={"1rem"}>{answer}</Typography>
    </Box>
  );
};

export default Faq;
