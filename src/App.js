import Header from "./_organisms/Header";
import { Box } from "@mui/system";
import Footer from "./_organisms/Footer";
import MainBody from "./_organisms/MainBody";
const App = () => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Header />
        <Box sx={{ overflow: "hidden" }}>
          <MainBody />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default App;
