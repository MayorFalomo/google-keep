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
  const [lineOpacity, setLineOpacity] = useState(1);
  const drawingDataRef = useRef<any>([]);

  const [coordinates, setCoordinates] = useState<
    Array<{ x: number; y: number; color: string; lineWidth: number }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = lineOpacity;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 5;
        ctx.beginPath(); // Reset the path
        ctxRef.current = ctx;
      }
    }
  }, [lineOpacity, lineColor]);

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

      setCoordinates([
        { x: startX, y: startY, color: lineColor, lineWidth: lineWidth },
      ]);

      isDrawingRef.current = true;
      // console.log(startX, startY);
    }
  };

  // Function for drawing canvas
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
      setCoordinates((prev) => [
        ...prev,
        { x: offsetX, y: offsetY, color: lineColor, lineWidth: lineWidth },
      ]);
    }
  };

  // Function for ending the drawing
  const endDrawing = () => {
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

  //Function for saving canvas
  const saveCanvas = async () => {
    if (coordinates?.length > 1) {
      const canvas = canvasRef.current;
      const imageDataURL = canvas?.toDataURL("image/png");
      const canvasObject = {
        _id: props?.noteUrlParams,
        canvas: [
          {
            type: "draw",
            // color: lineColor,
            // lineWidth: lineWidth,
            points: [...coordinates],
            imageDataURL: imageDataURL || "",
          },
        ],
      };

      try {
        await axios.post(
          "https://keep-backend-theta.vercel.app/api/notes/save-canvas",
          canvasObject
        );
        contextValue?.setNotes((prevState: any) =>
          prevState.map((note: any) => {
            if (note._id == props.noteUrlParams) {
              console.log(note);

              return {
                ...note,
                canvas: [canvasObject.canvas],
              };
            } else {
              return note;
            }
          })
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
      // drawingDataRef.current.push({ type: "" });
    }
  };

  const deleteCanvas = async () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const canvasObject = {
      _id: props?.noteUrlParams,
      // canvas: [],
    };
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    try {
      await axios
        .post(
          `https://keep-backend-theta.vercel.app/api/notes/delete-canvas`,
          canvasObject._id
        )
        .catch((err: any) => console.log(err));
      contextValue?.setNotes((prevState: any) =>
        prevState.map((note: any) => {
          if (note._id == props.noteUrlParams) {
            // console.log(note);

            return {
              ...note,
              canvas: [],
            };
          } else {
            return note;
          }
        })
      );
      toast.success("Canvas deleted successfully");
      props?.setOpenCanvasModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  //Function to recreate the canvas drawing
  const recreateCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //We map over the canvas array and draw each action
      props?.canvasNote?.canvas?.forEach((drawArray: any) => {
        drawArray.forEach((action: any) => {
          if (action.type == "draw" && action.points?.length > 1) {
            ctx.beginPath();

            // Iterate over the points array (second level)
            action.points.forEach((point: any) => {
              // Extract color from each point object
              const { x, y, color } = point;

              // console.log(point, "This is point");
              // console.log(action.points, "This is action.points");

              ctx.strokeStyle = color;
              ctx.lineWidth = lineWidth;
              // ctx.moveTo(x, y);
              // ctx.lineTo(x, y);

              if (point == action.points[0]) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            });

            ctx.stroke();
          }
        });
      });
    }
  };

  // const recreateCanvas = () => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas?.getContext("2d");

  //   if (canvas && ctx) {
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);

  //     props?.canvasNote?.canvas?.forEach((drawArray: any) => {
  //       // Iterate over the nested array (first level)
  //       drawArray.forEach((action: any) => {
  //         console.log(action, "This is action");

  //         if (action.type == "draw" && action.points?.length > 1) {
  //           ctx.beginPath();
  //           ctx.strokeStyle = action.color;
  //           ctx.lineWidth = action.lineWidth;

  //           const startPoint = action.points[0];
  //           ctx.moveTo(startPoint.x, startPoint.y);

  //           // Iterate over the points array (second level)
  //           action.points.forEach((point: any) => {
  //             ctx.lineTo(point.x, point.y);
  //           });

  //           ctx.stroke();
  //         }
  //       });
  //     });
  //   }
  // };

  useEffect(() => {
    recreateCanvas();
  }, []);

  // UseEffect to update the strokeStyle in the canvas when lineColor changes
  useEffect(() => {
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      ctx.globalAlpha = lineOpacity;
    }
  }, [lineColor, lineWidth, lineOpacity]);

  // console.log(coordinates, "coordinates");

  console.log(props?.canvasNote, "This is canvas Note");

  console.log(coordinates, "coordinates", props?.canvasNote?.canvas, "canvas");

  return (
    <div>
      <div className="draw-area">
        <Canvasmenu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          setLineOpacity={setLineOpacity}
          deleteCanvas={deleteCanvas}
          // coordinates={coordinates}
          recreateCanvas={recreateCanvas}
          clearCanvas={clearCanvas}
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
          style={{ width: "100%", height: "100vh" }}
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
