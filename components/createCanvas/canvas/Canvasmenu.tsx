import React from "react";
import "./Canvas.css";

type Props = {};

const Canvasmenu = (props: any) => {
  // console.log(props?.lineColor, "this is line color");

  return (
    <div className="Menu">
      <div className="container">
        <div className="controls">
          <section>
            <label className="text-#000 bg-black " id="color">
              Brush Color{" "}
            </label>
            <input
              id="color"
              type="color"
              onChange={(e: any) => {
                const newColor = e.target.value;
                props?.setLineColor(newColor);
              }}
            />
          </section>
          <section
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <label>Brush Width </label>
            <input
              type="range"
              min="3"
              max="20"
              onChange={(e: any) => {
                const newWidth = e.target.value;
                props?.setLineWidth(newWidth);
              }}
            />
          </section>
          <section
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <label>Brush Opacity</label>
            <input
              type="range"
              min="1"
              max="100"
              onChange={(e: any) => {
                const newOpacity = e.target.value / 100;
                props?.setLineOpacity(newOpacity);
              }}
            />
          </section>
        </div>
        <div>
          <div className="flex items-center gap-3 ">
            <button
              className="py-1 px-3 rounded-[5px]"
              style={{
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "5px",
              }}
              onClick={() => props?.clearCanvas()}
            >
              Clear
            </button>
            <button
              className="py-1 px-3 rounded-[5px]"
              style={{
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "5px",
              }}
              onClick={() => props?.recreateCanvas()}
            >
              Recreate
            </button>
            {/* <form onSubmit={() => props?.saveCanvas}> */}
            <button
              // type="submit"
              onClick={() => props?.saveCanvas()}
              className="py-1 px-3 rounded-[5px]"
              style={{
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "5px",
              }}
              // onClick={() => props?.saveCanvas()}
            >
              Save
            </button>
            {/* </form> */}
            <button
              className="py-1 px-3 rounded-[5px] cursor-pointer "
              style={{
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "5px",
              }}
              onClick={() => props?.setOpenCreateCanvas(false)}
            >
              Close{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvasmenu;
