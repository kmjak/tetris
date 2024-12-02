import MinoType from "@/types/minoType";
import { useCallback, useEffect, useState } from "react";

export default function useTetris() {
  const mino_count = 7;
  const [mino, setMino] = useState<MinoType>({
    blocks: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    id: -2,
    route: 0,
    x: 4,
    y: 1,
    color: "black",
    // speed: 1000,
    speed: 100,
  });
  const defaultField = [
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  ]
  const [field,setField] = useState<number[][]>(defaultField);

  const getRandomMinoId = async () => {
    return Math.floor(Math.random() * mino_count) + 1;
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

  const handleKeyDown = useCallback((e:KeyboardEvent) => {
    switch (e.key) {
      case "a":
        if (mino.x > 0) {
          mino.x--;
        }
        break;
      case "d":
        if (mino.x + mino.blocks[0].length < field[0].length) {
          mino.x++;
        }
        break;
      case "s":
        if (mino.y + mino.blocks.length < field.length) {
          mino.y++;
        }
        break;
      default:
        break;
    }
    setMino({...mino});
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);


  const createMino = async (): Promise<void> => {
    const pattern = await getRandomMinoId();
    mino.id = pattern;
    switch (pattern) {
      case 1:
        mino.blocks = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [1, 1, 1, 1],
        ];
        mino.color = "cyan";
        break;
      case 2:
        mino.blocks = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 2, 2, 0],
          [0, 2, 2, 0],
        ];
        mino.color = "yellow";
        break;
      case 3:
        mino.blocks = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 3, 3, 0],
          [0, 0, 3, 3],
        ];
        mino.color = "green";
        break;
      case 4:
        mino.blocks = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 4, 4, 0],
          [4, 4, 0, 0],
        ];
        mino.color = "red";
        break;
      case 5:
        mino.blocks = [
          [0, 0, 0, 0],
          [0, 0, 5, 0],
          [0, 0, 5, 0],
          [0, 5, 5, 0],
        ];
        mino.color = "blue";
        break;
      case 6:
        mino.blocks = [
          [0, 0, 0, 0],
          [0, 6, 0, 0],
          [0, 6, 0, 0],
          [0, 6, 6, 0],
        ];
        mino.color = "orange";
        break;
      case 7:
        mino.blocks = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 7, 0],
          [0, 7, 7, 7],
        ];
        mino.color = "purple";
        break;
      default:
        break;
    }
    mino.route = 0
    mino.x = 4
    mino.y = 1
    setMino({...mino});
  }

  const drawField = async (new_field:number[][]) => {
    const newField = new_field.map((row) => [...row]);
    mino.blocks.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell !== 0) {
          newField[y+mino.y][x + mino.x] = cell;
        }
      });
    });
    setField(newField);
  }

  const startGame = async (isAliveMino:boolean) => {
    if(isAliveMino === false) {
      await createMino();
      isAliveMino = true;
    }
    setField(defaultField);
    await drawField(defaultField);
    setTimeout(async () => {
      const res = await isAlive("down")
      if(res === false) {
        mino.blocks.forEach((row, y) => {
          row.forEach((cell, x) => {
            if (cell !== 0) {
              defaultField[y+mino.y-1][x + mino.x] = -1;
            }
          });
        });
        setField(defaultField);
        isAliveMino = false;
      }
      await startGame(isAliveMino);
    }
    , mino.speed);
    mino.y++;
    setMino({...mino});
  }

  return {
    field,
    createMino,
    startGame,
    mino,
  };
}