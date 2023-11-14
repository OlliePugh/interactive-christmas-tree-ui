import { Box, SxProps } from "@mui/system";
import Image from "next/image";

interface BaubleProps {
  openBauble: (id: number) => void;
  id: number;
  sx: SxProps;
}

const Bauble = ({ openBauble, id, sx }: BaubleProps) => (
  <Box
    sx={{ ...sx, position: "absolute", zIndex: 10 }}
    onClick={() => openBauble(id)}
  >
    <Image height={80} width={80} alt="Bauble" src="/bauble.png" />
  </Box>
);

export default Bauble;
