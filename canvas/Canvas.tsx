import React, { useEffect, useRef, useState } from "react";
import Canvasmenu from "./Canvasmenu";
import "./Canvas.css";
import axios from "axios";
import { useAppContext } from "@/helpers/Helpers";
type Props = {};

const Canvas = (props: any) => {
  const { contextValue }: any = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(1);
  const drawingDataRef = useRef<any>([]);
  const [drawingData, setDrawingData] = useState<any>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = lineOpacity;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctxRef.current = ctx;
      }
    }
  }, [lineColor, lineOpacity, lineWidth]);

  // Function for starting the drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      // setIsDrawing(true);
      isDrawingRef.current = true;
    }
  };

  // Function for ending the drawing
  const endDrawing = () => {
    // const ctx = ctxRef.current;
    // if (ctx) {
    //   ctx.closePath();
    //   setIsDrawing(false);
    // }
    isDrawingRef.current = false;
  };

  // Function for drawing
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) {
      return;
    }

    const ctx = ctxRef.current;
    if (ctx) {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    }

    // Save the drawing data
    // setDrawingData((prevData: any) => [
    //   ...prevData,
    //   {
    //     type: "draw",
    //     x: e.nativeEvent.offsetX,
    //     y: e.nativeEvent.offsetY,
    //     color: lineColor,
    //     lineWidth: lineWidth,
    //   },
    // ]);
    // Save the drawing data
    drawingDataRef.current.push({
      type: "draw",
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
      color: lineColor,
      lineWidth: lineWidth,
    });
  };

  const saveCanvas = async (e: any) => {
    e.preventDefault();

    if (drawingDataRef.current[drawingDataRef.current.length - 1]) {
      // setDrawingData(drawingDataRef.current[drawingDataRef.current.length - 1]);
      // const drawing = drawingData;
      // console.log(drawingData);
      const canvasObject = {
        _id: props?.noteUrlParams,
        canvas: drawingDataRef?.current[drawingDataRef.current.length - 1],
      };
      try {
        await axios
          .post(
            "http://localhost:5000/api/notes/save-canvas",
            drawingDataRef.current[drawingDataRef.current.length - 1]
          )
          .catch((err: any) => console.log(err));
        contextValue?.setNotes((prevState: any) =>
          prevState.map((note: any) =>
            note._id == props.noteUrlParams
              ? {
                  ...note,
                  canvas:
                    drawingDataRef.current[drawingDataRef.current.length - 1],
                }
              : note
          )
        );
      } catch (err) {
        console.log(err);
      }
    }
  };
  // Function to clear the canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Save the clear canvas action
      drawingDataRef.current.push({ type: "clearCanvas" });
      // Save the clear canvas action
      // setDrawingData((prevData: any) => [...prevData, { type: "clearCanvas" }]);
    }
  };

  // Function to recreate the canvas based on saved drawing data
  const recreateCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawingData.forEach((action: any) => {
        if (action.type == "draw") {
          ctx.strokeStyle = action.color;
          ctx.lineWidth = action.lineWidth;
          ctx.lineTo(action.x, action.y);
          ctx.stroke();
        } else if (action.type == "clearCanvas") {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      });
    }
  };

  console.log(
    drawingDataRef.current[drawingDataRef.current.length - 1],
    "This is drawing DataRef"
  );

  // * or this console.log(drawingDataRef.current.slice(-1)[0], "This is drawing DataRef");

  return (
    <div>
      <div className="draw-area">
        <Canvasmenu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          setLineOpacity={setLineOpacity}
          clearCanvas={clearCanvas}
          recreateCanvas={recreateCanvas}
          saveCanvas={saveCanvas}
        />
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ border: "1px solid green", width: "100%", height: "100vh" }}
          // style={{ border: "1px solid #000" }}
        />
      </div>
    </div>
  );
};

export default Canvas;
