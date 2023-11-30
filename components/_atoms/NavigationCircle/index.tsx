import { SpeedDialAction, SpeedDial } from "@mui/material";
import { SvgIcon } from "@mui/material";
import YouTubeSvg from "../YouTubeSvg";
import TwitterSvg from "../TwitterSvg";
import DiscordSvg from "../DiscordSvg";

const NavigationSphere = () => {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{
        position: "absolute",
        bottom: 32,
        right: 16,
      }}
      FabProps={{ style: { backgroundColor: "#1976D2" } }}
      icon={<YouTubeSvg height={32} width={32} fill={"white"} />}
    >
      <SpeedDialAction
        key={"YouTube"}
        onClick={() => {
          window.open("https://www.youtube.com/@ollieq");
        }}
        icon={
          <SvgIcon>
            <YouTubeSvg fill="#F61C0D" />
          </SvgIcon>
        }
        tooltipTitle={"Lots more on my YouTube Channel"}
      />
      <SpeedDialAction
        key={"Twitter"}
        onClick={() => {
          window.open("https://www.twitter.com/interactivexmas");
        }}
        icon={
          <SvgIcon>
            <TwitterSvg fill="#73A1FB" />
          </SvgIcon>
        }
        tooltipTitle={"Twitter Account (hourly updates)"}
      />
      <SpeedDialAction
        key={"Discord"}
        onClick={() => {
          window.open("https://discord.gg/xdJpf4dZF7");
        }}
        icon={
          <SvgIcon>
            <DiscordSvg fill="#7289da" />
          </SvgIcon>
        }
        tooltipTitle={"Interact with the community on Discord"}
      />
    </SpeedDial>
  );
};

export default NavigationSphere;
