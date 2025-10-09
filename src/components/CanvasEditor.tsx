import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const CanvasEditor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        width: 600,
        height: 400,
        backgroundColor: '#f3f4f6', // Tailwind gray-100
      });
    }
    return () => {
      fabricCanvasRef.current?.dispose();
    };
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (f) {
        fabric.Image.fromURL(f.target?.result as string, (img) => {
          img.set({ left: 100, top: 100, scaleX: 0.5, scaleY: 0.5 });
          fabricCanvasRef.current?.add(img);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddText = () => {
    const text = new fabric.Textbox('텍스트를 입력하세요', {
      left: 150,
      top: 50,
      fontSize: 24,
      fill: '#1f2937', // Tailwind gray-800
      fontFamily: 'sans-serif',
      editable: true,
    });
    fabricCanvasRef.current?.add(text);
  };

  const handleExport = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL({ format: 'png' });
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'canvas.png';
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded shadow">
      <canvas ref={canvasRef} className="border border-gray-300 rounded" />
      <div className="flex gap-2">
        <input type="file" accept="image/*" onChange={handleImageUpload} className="file:mr-2 file:py-1 file:px-2 file:border file:rounded" />
        <button onClick={handleAddText} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">텍스트 추가</button>
        <button onClick={handleExport} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">PNG로 내보내기</button>
      </div>
    </div>
  );
};

export default CanvasEditor;

