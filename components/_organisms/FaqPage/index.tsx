import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Faq from "@/components/_atoms/FAQ";
import faqContent from "@/config/faq.json";

const FaqPage = () => (
  <Box marginX={"1rem"}>
    <Typography marginY={"1rem"}>
      This the Interactive Christmas Tree, it lives somewhere in the middle of
      england but can be controlled from anywhere in the world.
    </Typography>

    {Object.entries(faqContent).map(([question, { answer }]) => (
      <Faq key={question} question={question} answer={answer} />
    ))}
  </Box>
);

export default FaqPage;
