import MinoType from "@/types/minoType";
import { useEffect, useState } from "react";

export default function useTetris() {
  const mino_count = 7;
  const [isFalling, setIsFalling] = useState<boolean>(false);
  const [mino, setMino] = useState<MinoType>({
    blocks: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    route: 0,
    x: 4,
    y: 1,
    color: "black",
    // speed: 1000,
    speed: 100,
  });
  const [field,setField] = useState<number[][]>([
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1],
  ]);

  const getRandomPattern = async () => {
    return Math.floor(Math.random() * mino_count);
  }

  const isAlive = async (move:string):Promise<boolean> => {
    switch (move) {
      case "down":
        if (mino.y + mino.blocks.length >= field.length) {
          return false;
        }
        break;
    }
    return true;
  }
  const createMino = async (): Promise<void> => {
    const pattern = await getRandomPattern();
    switch (pattern) {
      case 0:
        mino.blocks = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [1, 1, 1, 1],
        ];
        mino.color = "aqua";
        break;
      case 1:
        mino.blocks = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
        ];
        mino.color = "yellow";
        break;
      case 2:
        mino.blocks = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [0, 0, 1, 1],
        ];
        mino.color = "green";
        break;
      case 3:
        mino.blocks = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 1, 1, 0],
          [1, 1, 0, 0],
        ];
        mino.color = "red";
        break;
      case 4:
        mino.blocks = [
          [0, 0, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 1, 0],
          [0, 1, 1, 0],
        ];
        mino.color = "blue";
        break;
      case 5:
        mino.blocks = [
          [0, 0, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 1, 0],
        ];
        mino.color = "orange";
        break;
      case 6:
        mino.blocks = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 1, 0],
          [0, 1, 1, 1],
        ];
        mino.color = "purple";
        break;
      default:
        break;
    }
    setMino({...mino});
    setIsFalling(true);
  }

  useEffect(() => {
    if (isFalling) {
      const draw = async ():Promise<void> =>{
        mino.blocks.forEach((row, y) => {
          row.forEach((cell, x) => {
            field[y+mino.y][x + mino.x] = cell;
          });
        });
        setField([...field]);
        setTimeout(async () => {
          const res = await isAlive("down")
          console.log(res);
          if(res === false) {
            setIsFalling(false);
            return;
          }
          draw()
        }
        , mino.speed);
        mino.y++;
        setMino({...mino});
      }
      draw();
    }
  }, [isFalling]);

  return {
    field,
    createMino,
  };
}