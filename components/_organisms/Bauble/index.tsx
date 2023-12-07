import { storage } from "@/config/fb_config";
import { Box, SxProps } from "@mui/system";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";

interface BaubleProps {
  openBauble: (id: number) => void;
  id: number;
  sx: SxProps;
}

const Bauble = ({ openBauble, id, sx }: BaubleProps) => {
  const [imgUrl, setImgUrl] = useState("./bauble.png");

  useEffect(() => {
    const imageRef = ref(storage, `board${id}.jpeg`);
    getDownloadURL(imageRef).then(setImgUrl);
  }, [id]);

  return (
    <Box
      sx={{ ...sx, position: "absolute", zIndex: 10 }}
      onClick={() => openBauble(id)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img height={60} width={60} alt="Bauble" src={imgUrl} />
    </Box>
  );
};

export default Bauble;
