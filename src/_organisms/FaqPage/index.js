import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Faq from "../../_atoms/Faq";
import faqContent from "../../faq.json";

const FaqPage = () => {
  return (
    <Box marginX={"1rem"}>
      <Typography marginY={"1rem"}>
        This the Interactive Christmas Tree, it lives somewhere in the middle of
        england but can be controlled from anywhere in the world.
      </Typography>

      {Object.entries(faqContent).map(([question, { answer, icon }]) => (
        <Faq key={question} question={question} answer={answer} />
      ))}
    </Box>
  );
};

export default FaqPage;
