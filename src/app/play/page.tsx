"use client"
import useTetris from "@/hooks/useTetris";

export default function Play() {
  const {field} = useTetris();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="pt-28">
        {field.map((row, y) => (
          <div
            key={y}
            className="flex"
          >
            {row.map((cell, x) => (
              <div
                key={x}
                className={`w-6 h-6 ${cell && "bg-white border border-gray-500"}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}