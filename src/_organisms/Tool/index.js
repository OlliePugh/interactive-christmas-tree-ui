import { auth } from "../../config/fb_config";
import { colours } from "../../utils/palette";

const Tools = ({ userData, setCurrentColor, initCanvas }) => {
  return (
    <div className="Tools" draggable={true}>
      <div className="Palette">
        {Object.entries(colours).map(([key, value]) => (
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
};

export default Tools;
