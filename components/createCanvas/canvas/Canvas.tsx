import React, { useEffect, useRef, useState } from "react";
import Canvasmenu from "./Canvasmenu";
import "./Canvas.css";
import axios from "axios";
import { useAppContext } from "@/helpers/Helpers";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { get } from "http";
import { getCookie } from "cookies-next";
type Props = {};

const Canvas = (props: any) => {
  const userId = getCookie("user");
  const { contextValue }: any = useAppContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef(false);

  // const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(1);

  const [coordinates, setCoordinates] = useState<
    Array<{
      x: number;
      y: number;
      color: string;
      lineWidth: number;
      lineOpacity: number;
    }>
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

      ctx.moveTo(startX, startY);

      setCoordinates([
        {
          x: startX,
          y: startY,
          color: lineColor,
          lineWidth: lineWidth,
          lineOpacity: lineOpacity,
        },
      ]);

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
      setCoordinates((prev: any) => [
        ...prev,
        {
          x: offsetX,
          y: offsetY,
          color: lineColor,
          lineWidth: lineWidth,
          lineOpacity: lineOpacity,
        },
      ]);
    }
  };

  // Function for ending the drawing
  const endDrawing = () => {
    isDrawingRef.current = false;
  };

  function dec2hex(dec: any) {
    return dec.toString(16).padStart(2, "0");
  }

  // generateId :: Integer -> String
  function generateId(len: any) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join("");
  }

  const saveCanvas = async () => {
    if (coordinates?.length > 1) {
      const canvas = canvasRef.current;
      const imageDataURL = canvas?.toDataURL("image/png");
      const canvasObject = {
        _id: generateId(24),
        note: "",
        title: "",
        picture: "",
        video: "",
        bgColor: "",
        bgImage: "",
        userId,
        label: "",
        labelId: "",
        location: "",
        collaborator: "",
        createdAt: new Date(),
        canvas: [
          [
            {
              type: "draw",
              points: [...coordinates],
              imageDataURL: imageDataURL || "",
            },
          ],
        ],
      };
      // console.log(canvasObject);

      try {
        await axios
          .post(
            "https://keep-backend-theta.vercel.app/api/notes/create-note-with-canvas",
            canvasObject
          )
          .catch((err) => console.log(err));

        contextValue?.setNotes((prevState: any) => [
          canvasObject,
          ...prevState,
        ]);

        toast.success("Canvas saved successfully");
        props?.setOpenCreateCanvas(false);
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
            console.log(note);

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
              ctx.globalAlpha = lineOpacity;
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

  useEffect(() => {
    recreateCanvas();
  });

  // console.log(props?.noteUrlParams, "Log it");

  // const recreateCanvas = () => {
  //   // console.log(singleNote, "This is singleNote");

  //   const canvas = canvasRef.current;
  //   const ctx = canvas?.getContext("2d");

  //   if (canvas && ctx) {
  //     // Clear the canvas before applying actions
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     // console.log(singleNote?.canvas, "Thi is canvas");
  //     // Iterate through each action and recreate the entire canvas

  //     props?.canvasNote?.canvas?.forEach((action: any) => {
  //       if (action.type == "draw" && action.points?.length > 1) {
  //         ctx.beginPath();
  //         ctx.strokeStyle = action.color;
  //         ctx.lineWidth = action.lineWidth;

  //         // Move to the starting point of the path
  //         const startPoint = action.points[0];
  //         // console.log(action.points[0], "This is action");

  //         // console.log(startPoint.x, startPoint.y);

  //         ctx.moveTo(startPoint.x, startPoint.y);

  //         // Draw the entire path
  //         action.points.forEach((point: any) => {
  //           ctx.lineTo(point.x, point.y);
  //         });

  //         ctx.stroke();
  //       }
  //     });
  //   }
  // };

  // useEffect(() => {
  //   recreateCanvas();
  // }, []);

  // UseEffect to update the strokeStyle in the canvas when lineColor changes
  // useEffect(() => {
  //   const ctx = ctxRef.current;
  //   if (ctx) {
  //     ctx.strokeStyle = lineColor;
  //     ctx.lineWidth = lineWidth;
  //     ctx.globalAlpha = lineOpacity;
  //   }
  // }, [lineColor, lineOpacity]);

  // console.log(coordinates, "coordinates");

  // console.log(props?.canvasNote, "This is canvas Note");
  // console.log(props?.canvasNoteObject, "canvas object");

  return (
    <div>
      <div className="draw-area">
        <Canvasmenu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          setLineOpacity={setLineOpacity}
          recreateCanvas={recreateCanvas}
          clearCanvas={clearCanvas}
          saveCanvas={saveCanvas}
          deleteCanvas={deleteCanvas}
          setOpenCreateCanvas={props?.setOpenCreateCanvas}
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
