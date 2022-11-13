import { auth } from "../../config/fb_config";
import { colors } from "../../utils/palette";

function Tools({ userData, setCurrentColor, initCanvas }) {
  return (
    <div className="Tools" draggable={true}>
      <div className="Profile">
        <div onClick={() => initCanvas()} className="Reset-Btn Btn">
          [Reset]
        </div>
        <div className="Username Btn">[{userData.displayName}]</div>
        <div
          className="Exit-Btn Btn"
          onClick={() => {
            auth.signOut();
            window.location.reload();
          }}
        >
          [Exit]
        </div>
      </div>
      <div className="Palette">
        {Object.entries(colors).map(([key, value]) => (
          <div
            key={key}
            onClick={() => setCurrentColor(value)}
            className="Palette-item"
            style={{ backgroundColor: value }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Tools;
