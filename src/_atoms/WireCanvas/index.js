import { useRef, useEffect } from "react";

const WireCanvas = ({ bulbConnections, bulbOffset: { offsetX, offsetY } }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    //Our first draw
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    // ...then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    context.fillStyle = "#000000";
    // context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    Object.values(bulbConnections).forEach(({ x, y }, i) => {
      const nextPoint = Object.values(bulbConnections)[i + 1];
      const a = nextPoint?.x - x;
      const b = nextPoint?.y - y;
      const distance = Math.sqrt(a * a + b * b); // larger the distance the more of a sag of the cable
      context.moveTo(x + offsetX, y + offsetY);
      context.bezierCurveTo(
        x,
        y + distance / 10,
        nextPoint?.x,
        nextPoint?.y + distance / 10,
        nextPoint?.x + offsetX,
        nextPoint?.y + offsetY
      );
      context.stroke();
    });
  }, [bulbConnections]);

  return <canvas style={{ opacity: 0.7 }} ref={canvasRef} />;
};

export default WireCanvas;
