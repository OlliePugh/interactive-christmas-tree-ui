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
  const [imgUrl, setImgUrl] = useState<string | undefined>();

  useEffect(() => {
    const imageRef = ref(storage, `board${id}.jpeg`);
    getDownloadURL(imageRef).then(setImgUrl);
  }, [id]);

  return (
    <Box
      className={`joyride-bauble-thumbnail-${id}`}
      sx={{
        ...sx,
        position: "absolute",
        zIndex: 10,
        transition: "all .2s ease-in-out",
        "&:hover": {
          transform: "scale(102%)",
          opacity: 1,
        },
        ...(imgUrl != null && {
          border: "1px black solid",
          borderRadius: "5px",
          overflow: "hidden",
        }),
        cursor: "pointer",
      }}
      onClick={() => openBauble(id)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img height={60} width={60} alt="Bauble" src={imgUrl || "./bauble.png"} />
    </Box>
  );
};

export default Bauble;
