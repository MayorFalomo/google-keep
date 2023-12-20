import React from "react";
import "./Canvas.css";

type Props = {};

const Canvasmenu = (props: any) => {
  console.log();

  return (
    <div className="Menu">
      <div style={{ position: "absolute", top: 10, left: 10, color: "#000" }}>
        {`x: ${props?.coordinates.x}, y: ${props?.coordinates.y}`}
      </div>
      <label>Brush Color </label>
      <input
        type="color"
        onChange={(e: any) => {
          props?.setLineColor(e.target.value);
        }}
      />
      <label>Brush Width </label>
      <input
        type="range"
        min="3"
        max="20"
        onChange={(e: any) => {
          props?.setLineWidth(e.target.value);
        }}
      />
      <label>Brush Opacity</label>
      <input
        type="range"
        min="1"
        max="100"
        onChange={(e: any) => {
          props?.setLineOpacity(e.target.value / 100);
        }}
      />
      <button
        style={{ backgroundColor: "#000", color: "#fff" }}
        onClick={() => props?.clearCanvas()}
      >
        Clear Canvas
      </button>
      <button
        style={{ backgroundColor: "#000", color: "#fff" }}
        onClick={() => props?.recreateCanvas()}
      >
        Recreate Canvas
      </button>
      <form onSubmit={props?.saveCanvas}>
        <button
          type="submit"
          style={{ backgroundColor: "#000", color: "#fff" }}
          // onClick={() => props?.saveCanvas()}
        >
          Save Canvas
        </button>
        <button
          style={{ backgroundColor: "#000", color: "#fff", cursor: "pointer" }}
          onClick={() => props?.setOpenCanvasModal(false)}
        >
          Close{" "}
        </button>
      </form>
    </div>
  );
};

export default Canvasmenu;
