"use client"
import useTetris from "@/hooks/useTetris";
import clsx from "clsx";

export default function Play() {
  const {field, createMino, mino} = useTetris();
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
                className={clsx(
                  'w-6 h-6 border box-border -m-px border-gray-500',
                  {
                    'bg-white': cell === -1,
                    [`bg-${mino.color}-500 border-black`]: cell === mino.id,
                  },
                )}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={createMino}>click</button>
    </div>
  )
}