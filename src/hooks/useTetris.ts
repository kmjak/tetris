import BlockType from "@/types/BlockType";
import MinoType from "@/types/minoType";
import defaultField from "@/lib/defaultField";
import { useCallback, useEffect, useState } from "react";
import getMinoIDUC from "@/usecase/getMinoIDUC";

export default function useTetris() {
  const pressedKeys = new Set<string>();
  const [mino] = useState<MinoType>({
    blocks: [],
    id: -2,
    x: 6,
    y: 1,
    color: "black",
    // speed: 1000,
    speed: 300,
  });
  const [field,setField] = useState<number[][]>(defaultField);

  const isAlive = async (move:string):Promise<boolean> => {
    let res = true
    switch (move) {
      case "down":
        mino.blocks.map((block:BlockType) => {
          if(defaultField[mino.y + block.y][mino.x + block.x] !== 0){
            res = false;
          }
        })
        break;
      case "left":
        mino.blocks.map((block:BlockType) => {
          if(defaultField[mino.y + block.y][mino.x + block.x - 1] !== 0){
            res = false;
          }
        })
        break;
      case "right":
        mino.blocks.map((block:BlockType) => {
          if(defaultField[mino.y + block.y][mino.x + block.x + 1] !== 0){
            res = false;
          }
        })
        break;
    }
    return res;
  }

  const createMino = async (): Promise<void> => {
    mino.id = await getMinoIDUC();;
    switch (mino.id) {
      case 1: // Iミノ
        mino.blocks = [{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }];
        mino.color = "cyan";
        break;
      case 2: // Oミノ
        mino.blocks = [{ x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 0 }, { x: 0, y: -1 }];
        mino.color = "yellow";
        break;
      case 3: // Sミノ
        mino.blocks = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }];
        mino.color = "green";
        break;
      case 4: // Zミノ
        mino.blocks = [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }];
        mino.color = "red";
        break;
      case 5: // Jミノ
        mino.blocks = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }];
        mino.color = "blue";
        break;
      case 6: // Lミノ
        mino.blocks = [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }];
        mino.color = "orange";
        break;
      case 7: // Tミノ
        mino.blocks = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }];
        mino.color = "purple";
        break;
      default:
        break;
    }
    mino.x = 6;
    mino.y = 1;
  };

  const draw = async (new_field:number[][]) => {
    const newField = new_field.map((row) => [...row]);
    mino.blocks.map((block:BlockType) => {
      newField[mino.y + block.y][mino.x + block.x] = mino.id;
    });
    setField(newField);
  }

  const landing = async ():Promise<boolean> => {
    if(await isAlive("down") === false) {
      mino.blocks.map((block:BlockType) => {
        defaultField[mino.y + block.y-1][mino.x + block.x] = -1;
      });
      return false;
    }
    return true;
  }

  const startGame = async (isAliveMino:boolean) => {
    if(isAliveMino === false) {
      await createMino();
      isAliveMino = true;
    }
    isAliveMino = await landing();
    if(isAliveMino){
    await draw(defaultField);
    mino.y++;
    }
    setTimeout(async () => {
      await startGame(isAliveMino);
    }
    , mino.speed);
  }

  const handleKeyDown = useCallback(async (e: KeyboardEvent) => {
    if (pressedKeys.has(e.key)) return;
    pressedKeys.add(e.key);
    switch (e.key) {
      case "a":
        if (await isAlive("left") === false) {
          return;
        }
        mino.x--;
        break;
      case "d":
        if (await isAlive("right") === false) {
          return;
        }
        mino.x++;
        break;
      case "j":
        mino.blocks.forEach((block: BlockType) => {
          const tmp = block.x;
          block.x = block.y;
          block.y = -tmp;
        });
        break;
      case "k":
        mino.blocks.forEach((block: BlockType) => {
          const tmp = block.x;
          block.x = -block.y;
          block.y = tmp;
        });
        break;
      default:
        break;
    }
    await draw(defaultField);
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    pressedKeys.delete(e.key);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return {
    field,
    createMino,
    startGame,
    mino,
  };
}