import React, { useEffect, useRef, useState } from "react";
import Canvasmenu from "./Canvasmenu";
import "./Canvas.css";
import axios from "axios";
import { useAppContext } from "@/helpers/Helpers";
import toast, { ToastBar, Toaster } from "react-hot-toast";
type Props = {};

const Canvas = (props: any) => {
  const { contextValue }: any = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef(false);
  // const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  // const [lineOpacity, setLineOpacity] = useState(1);
  const startCoordinatesRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const endCoordinatesRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const drawingDataRef = useRef<any>([]);
  // const [drawingData, setDrawingData] = useState<any>([]);
  // const [coordinates, setCoordinates] = useState({
  //   x1: 0,
  //   y1: 0,
  //   x2: 0,
  //   y2: 0,
  // });
  const [coordinates, setCoordinates] = useState<
    Array<{ x: number; y: number }>
  >([]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        // ctx.globalAlpha = lineOpacity;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctxRef.current = ctx;
      }
    }
  }, []);

  // Function for starting the drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.beginPath();
      const startX = e.nativeEvent.offsetX;
      const startY = e.nativeEvent.offsetY;
      // drawingDataRef.current.push({
      //   type: "draw",
      //   points: [{ x: startX, y: startY }],
      // });
      ctx.moveTo(startX, startY);

      setCoordinates([{ x: startX, y: startY }]);

      isDrawingRef.current = true;
      // console.log(startX, startY);
    }
  };

  // Function for drawing
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) {
      return;
    }

    const ctx = ctxRef.current;
    if (ctx) {
      const { offsetX, offsetY } = e.nativeEvent;

      // Draw the line segment
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      setCoordinates((prev) => [...prev, { x: offsetX, y: offsetY }]);
      // Save the current point to the drawing data
      // drawingDataRef.current[drawingDataRef.current.length - 1].points.push({
      //   x: offsetX,
      //   y: offsetY,
      // });
    }
  };

  // console.log(coordinates, "cordinates");

  // const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
  //   const ctx = ctxRef.current;
  //   if (ctx) {
  //     ctx.beginPath();
  //     const startX = e.nativeEvent.offsetX;
  //     const startY = e.nativeEvent.offsetY;

  //     // Set the starting coordinates
  //     setCoordinates({
  //       x1: startX,
  //       y1: startY,
  //       x2: startX,
  //       y2: startY,
  //     });

  //     // Add initial drawing data
  //     drawingDataRef.current.push({
  //       type: "draw",
  //       x1: startX,
  //       y1: startY,
  //       x2: startX,
  //       y2: startY,
  //       color: ctx.strokeStyle,
  //       lineWidth: ctx.lineWidth,
  //     });

  //     isDrawingRef.current = true;
  //   }
  // };

  // const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
  //   if (!isDrawingRef.current) {
  //     return;
  //   }

  //   const ctx = ctxRef.current;
  //   if (ctx) {
  //     const { offsetX, offsetY } = e.nativeEvent;

  //     // Draw the line segment
  //     ctx.strokeStyle = ctx.strokeStyle; // use the state
  //     ctx.lineWidth = ctx.lineWidth; // use the state
  //     ctx.lineTo(offsetX, offsetY);
  //     ctx.stroke();

  //     // Update the drawing data and coordinates
  //     setCoordinates((prev) => ({
  //       ...prev,
  //       x2: offsetX,
  //       y2: offsetY,
  //     }));

  //     drawingDataRef.current.push({
  //       type: "draw",
  //       x1: coordinates.x1,
  //       y1: coordinates.y1,
  //       x2: offsetX,
  //       y2: offsetY,
  //       color: ctx.strokeStyle, // use the state
  //       lineWidth: ctx.lineWidth, // use the state
  //     });

  //     // Move to the new starting point for the next segment
  //     ctx.beginPath();
  //     ctx.moveTo(offsetX, offsetY);
  //   }
  // };

  // const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
  //   if (!isDrawingRef.current) {
  //     return;
  //   }

  //   const ctx = ctxRef.current;
  //   if (ctx) {
  //     const x = e.nativeEvent.offsetX;
  //     const y = e.nativeEvent.offsetY;
  //     console.log(x, y, "This is x and y");
  //     setCoordinates((prev) => ({ ...prev, x2: x, y2: y }));
  //     ctx.lineTo(x, y);
  //     ctx.stroke();

  //     // Update end coordinates
  //     endCoordinatesRef.current = { x, y };

  //     // Update end coordinates in drawing data
  //     drawingDataRef.current[drawingDataRef.current.length - 1].x2 = x;
  //     drawingDataRef.current[drawingDataRef.current.length - 1].y2 = y;
  //     console.log(
  //       drawingDataRef.current[drawingDataRef.current.length - 1].y2,
  //       "This is y2 length apaz"
  //     );
  //   }
  // };

  // Function for starting the drawing
  // const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
  //   const ctx = ctxRef.current;
  //   if (ctx) {
  //     const { offsetX, offsetY } = e.nativeEvent;
  //     ctx.beginPath();
  //     ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  //     // setIsDrawing(true);
  //     isDrawingRef.current = true;
  //     drawingDataRef.current.push({
  //       type: "draw",
  //       start: true,
  //       x: offsetX,
  //       y: offsetY,
  //       color: ctx.strokeStyle,
  //       lineWidth: ctx.lineWidth,
  //     });
  //   }
  //   console.log(drawingDataRef.current, "startDrawing function");
  // };

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
  // const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
  //   if (!isDrawingRef.current) {
  //     return;
  //   }

  //   const ctx = ctxRef.current;
  //   if (ctx) {
  //     const { offsetX, offsetY } = e.nativeEvent;
  //     console.log(offsetX, offsetY, "This are my offsets");

  //     // ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  //     ctx.lineTo(offsetX, offsetY);
  //     ctx.stroke();
  //     console.log(
  //       e.nativeEvent.offsetX,
  //       e.nativeEvent.offsetX,
  //       "native events offset"
  //     );
  //     console.log(drawingDataRef.current, "This is drawingDataRef.current");
  //     console.log();

  //     drawingDataRef.current.push({
  //       type: "draw",
  //       x1: offsetX,
  //       y1: offsetX,
  //       x2: offsetY,
  //       y2: offsetY,
  //       color: ctx.strokeStyle,
  //       lineWidth: ctx.lineWidth,
  //     });
  //     ctx.beginPath();
  //     ctx.moveTo(offsetX, offsetY);
  //     console.log(drawingDataRef.current);
  //   }
  // };

  // const saveCanvas = async (e: any) => {
  //   e.preventDefault();

  //   if (drawingDataRef.current[drawingDataRef.current.length - 1]) {
  //     console.log(
  //       drawingDataRef.current[drawingDataRef.current.length - 1],
  //       "last one"
  //     );
  //     // const drawing = drawingData;
  //     // console.log(drawingData);
  //     const canvasObject = {
  //       _id: props?.noteUrlParams,
  //       canvas: drawingDataRef?.current[drawingDataRef.current.length - 1],
  //     };
  //     try {
  //       console.log(canvasObject, "This is canvasObject");

  //       await axios
  //         .post("http://localhost:5000/api/notes/save-canvas", canvasObject)
  //         .catch((err: any) => console.log(err));
  //       contextValue?.setNotes((prevState: any) =>
  //         prevState.map((note: any) =>
  //           note._id == props.noteUrlParams
  //             ? {
  //                 ...note,
  //                 canvas: canvasObject.canvas,
  //               }
  //             : note
  //         )
  //       );
  //       toast.success("Canvas saved successfully");
  //       props?.setOpenCanvasModal(false);
  //     } catch (err) {
  //       console.log(err);
  //       toast.error("Error saving canvas");
  //     }
  //   }
  // };

  const saveCanvas = async (e: any) => {
    e.preventDefault();

    if (coordinates?.length > 1) {
      const canvasObject = {
        _id: props?.noteUrlParams,
        canvas: {
          type: "draw",
          color: lineColor,
          lineWidth: lineWidth,
          points: [...coordinates],
        },
      };

      try {
        await axios.post(
          "http://localhost:5000/api/notes/save-canvas",
          canvasObject
        );
        contextValue?.setNotes((prevState: any) =>
          prevState.map((note: any) =>
            note._id == props.noteUrlParams
              ? { ...note, canvas: canvasObject.canvas }
              : note
          )
        );
        toast.success("Canvas saved successfully");
        props?.setOpenCanvasModal(false);
      } catch (err) {
        console.log(err);
        toast.error("Error saving canvas");
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

  // const recreateCanvas = () => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas?.getContext("2d");
  //   console.log(canvasRef, "canvas ref");
  //   console.log(ctx, "ctx");

  //   if (canvas && ctx) {
  //     // Clear the canvas before applying actions
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     console.log(props?.canvasNote?.canvas, "This is canvas");

  //     // Iterate through each action and recreate the canvas
  //     props?.canvasNote?.canvas?.forEach((action: any, index: number) => {
  //       console.log(action, "This is action");
  //       console.log(action.x, "This is action");

  //       ctx.beginPath();
  //       ctx.strokeStyle = action.color;
  //       ctx.lineWidth = action.lineWidth;
  //       ctx.moveTo(action.x1, action.y1);
  //       ctx.lineTo(action.x2, action.y2);
  //       ctx.stroke();
  //     });
  //   }
  // };

  const recreateCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      // Clear the canvas before applying actions
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Iterate through each action and recreate the entire canvas
      props?.canvasNote?.canvas?.forEach((action: any) => {
        if (action.type == "draw" && action.points?.length > 1) {
          ctx.beginPath();
          ctx.strokeStyle = action.color;
          ctx.lineWidth = action.lineWidth;

          // Move to the starting point of the path
          const startPoint = action.points[0];
          console.log(action.points[0], "This is action");

          console.log(startPoint.x, startPoint.y);

          ctx.moveTo(startPoint.x, startPoint.y);

          // Draw the entire path
          action.points.forEach((point: any) => {
            ctx.lineTo(point.x, point.y);
          });

          ctx.stroke();
        }
      });
    }
  };

  useEffect(() => {
    recreateCanvas();
  }, []);
  // useEffect(() => {
  //   if()
  // })

  // console.log(
  //   drawingDataRef.current[drawingDataRef.current.length - 1],
  //   "This is drawing DataRef"
  // );
  console.log(coordinates, "coordinates");

  // console.log(drawingDataRef.current.slice(-1)[0], "This is drawing DataRef");
  // console.log(contextValue?.notes, "This is Notes");
  console.log(props?.canvasNote, "This is canvas Note");

  return (
    <div>
      <div className="draw-area">
        <Canvasmenu
          setLineColor={(color: any) => {
            if (ctxRef.current) {
              ctxRef.current.strokeStyle = color;
            }
          }}
          setLineWidth={(width: any) => {
            if (ctxRef.current) {
              ctxRef.current.lineWidth = width;
            }
          }}
          setLineOpacity={(opacity: any) => {
            if (ctxRef.current) {
              ctxRef.current.globalAlpha = opacity;
            }
          }}
          coordinates={coordinates}
          clearCanvas={clearCanvas}
          recreateCanvas={recreateCanvas}
          saveCanvas={saveCanvas}
          setOpenCanvasModal={props?.setOpenCanvasModal}
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
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#313235",
            color: "#fff",
            width: "350px",
            height: "70px",
          },
        }}
      >
        {(t: any) => (
          <ToastBar toast={t}>
            {({ icon, message }: any) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <button onClick={() => toast.dismiss(t.id)}>X</button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
};

export default Canvas;
