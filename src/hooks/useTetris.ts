import BlockType from "@/types/BlockType";
import MinoType from "@/types/minoType";
import defaultField from "@/lib/defaultField";
import { useCallback, useEffect, useState } from "react";
import createMinoUC from "@/usecase/createMinoUC";
import isAliveUC from "@/usecase/isAliveUC";
import calcScoreUC from "@/usecase/calcScoreUC";

export default function useTetris() {
  const pressedKeys = new Set<string>();
  const [mino] = useState<MinoType>({
    blocks: [],
    id: -2,
    x: 6,
    y: 1,
    color: "black",
    speed: 300,
  });
  const [field,setField] = useState<number[][]>(defaultField);
  const [score,setScore] = useState<number>(0);

  const handleKeyDown = useCallback(async (e: KeyboardEvent) => {
    if (pressedKeys.has(e.key)) return;
    pressedKeys.add(e.key);
    switch (e.key) {
      case "a":
        if (await isAliveUC("left",mino) === false) {
          return;
        }
        mino.x--;
        break;
      case "d":
        if (await isAliveUC("right",mino) === false) {
          return;
        }
        mino.x++;
        break;
      case "j":
        if (await isAliveUC("routeL",mino) === false) {
          return;
        }
        mino.blocks.forEach((block: BlockType) => {
          const tmp = block.x;
          block.x = -block.y;
          block.y = tmp;
        });
        break;
      case "k":
        if (await isAliveUC("routeR",mino) === false) {
          return;
        }
        mino.blocks.forEach((block: BlockType) => {
          const tmp = block.x;
          block.x = block.y;
          block.y = -tmp;
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

  const eraseLine = async () => {
    let cnt = 0;
    for (let i = 0; i < 20; i++) {
      if (defaultField[i].every((cell) => cell !== 0)) {
        cnt++;
        defaultField.splice(i, 1);
        defaultField.unshift([-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1]);
      }
    }
    await calcScoreUC({setScore,lines:cnt});
  }

  const draw = async (new_field:number[][]) => {
    const newField = new_field.map((row) => [...row]);
    mino.blocks.map((block:BlockType) => {
      newField[mino.y + block.y][mino.x + block.x] = mino.id;
    });
    setField(newField);
  }

  const landing = async ():Promise<boolean> => {
    if(await isAliveUC("down",mino) === false) {
      mino.blocks.map((block:BlockType) => {
        defaultField[mino.y + block.y-1][mino.x + block.x] = -1;
      });
      await eraseLine();
      return false;
    }
    return true;
  }

  const isFinished = async ():Promise<boolean> => {
    let res = false;
    mino.blocks.map((block:BlockType) => {
      if(defaultField[mino.y + block.y][mino.x + block.x] == -1){
        res = true;
      }
    });
    return res;
  }

  const startGame = async (isAliveMino:boolean) => {
    if(isAliveMino === false) {
      await createMinoUC(mino);
      if(await isFinished()){
        alert("Game Over");
        window.location.reload();
        return;
      }
      isAliveMino = true;
    }
    isAliveMino = await landing();
    if(isAliveMino){
    await draw(defaultField);
    mino.y++;
    }
    setTimeout(async () => {
      await startGame(isAliveMino);
    }, mino.speed);
  }

  useEffect(() => {
    if (score >= 9850) {
      mino.speed = 10;
    } else if (score >= 8750) {
      mino.speed = 20;
    } else if (score >= 7700) {
      mino.speed = 40;
    } else if (score >= 6700) {
      mino.speed = 60;
    } else if (score >= 5750) {
      mino.speed = 80;
    } else if (score >= 4850) {
      mino.speed = 100;
    } else if (score >= 4000) {
      mino.speed = 120;
    } else if (score >= 3200) {
      mino.speed = 140;
    } else if (score >= 2450) {
      mino.speed = 160;
    } else if (score >= 1750) {
      mino.speed = 180;
    } else if (score >= 1200) {
      mino.speed = 200;
    } else if (score >= 800) {
      mino.speed = 220;
    } else if (score >= 500) {
      mino.speed = 240;
    } else if (score >= 250) {
      mino.speed = 260;
    } else if (score >= 100) {
      mino.speed = 280;
    }
  }, [score]);

  return {
    field,
    startGame,
    score,
    mino,
  };
}