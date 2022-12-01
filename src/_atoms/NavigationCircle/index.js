import { SpeedDialAction, SpeedDial } from "@mui/material";
import { SvgIcon } from "@mui/material";
import { ReactComponent as YoutubeIcon } from "../../assetts/youtube-icon.svg";
import { ReactComponent as TwitterIcon } from "../../assetts/twitter-icon.svg";
import { ReactComponent as DiscordIcon } from "../../assetts/discord-icon.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const NavigationSphere = () => {
  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 32, right: 16 }}
        icon={<MoreHorizIcon />}
      >
        <SpeedDialAction
          key={"YouTube"}
          onClick={() => {
            window.open("https://www.youtube.com/@ollieq");
          }}
          icon={
            <SvgIcon>
              <YoutubeIcon />
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
              <TwitterIcon />
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
              <DiscordIcon />
            </SvgIcon>
          }
          tooltipTitle={"Interact with the community on Discord"}
        />
      </SpeedDial>
    </>
  );
};

export default NavigationSphere;
