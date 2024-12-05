import BlockType from "@/types/blockType";
import MinoType from "@/types/minoType";
import { useCallback, useEffect, useState } from "react";

export default function useTetris() {
  const mino_count = 7;
  const [mino, setMino] = useState<MinoType>({
    blocks: [],
    id: -2,
    route: 0,
    x: 6,
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

  const handleKeyDown = useCallback(async (e:KeyboardEvent) => {
    switch (e.key) {
      case "s":
        if(await isAlive("down")) {
          mino.y++;
        }
        break;
      case "a":
        if(await isAlive("left")) {
          mino.x--;
        }
        break;
      case "d":
        if(await isAlive("right")) {
          mino.x++;
        }
        break;
      case "j":
        mino.route = (mino.route + 3) % 4;
        mino.blocks.map((block:BlockType) => {
          const tmp = block.x;
          block.x = block.y;
          block.y = -tmp;
        });
        break;
      case "k":
        mino.route = (mino.route + 1) % 4;
        mino.blocks.map((block:BlockType) => {
          const tmp = block.x;
          block.x = -block.y;
          block.y = tmp;
        });
        break
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
    mino.route = 0;
    mino.x = 6;
    mino.y = 1;
    setMino({ ...mino });
  };
  const draw = async (new_field:number[][]) => {
    const newField = new_field.map((row) => [...row]);
    mino.blocks.map((block:BlockType) => {
      newField[mino.y + block.y][mino.x + block.x] = mino.id;
    });
    setField(newField);
  }

  const startGame = async (isAliveMino:boolean) => {
    if(isAliveMino === false) {
      await createMino();
      isAliveMino = true;
    }
    setField(defaultField);
    await draw(defaultField);
    mino.y++;
    setMino({...mino});
    setTimeout(async () => {
      if(await isAlive("down") === false) {
        mino.blocks.map((block:BlockType) => {
          defaultField[mino.y + block.y-1][mino.x + block.x] = -1;
        });
        setField(defaultField);
        isAliveMino = false;
      }
      await startGame(isAliveMino);
    }
    , mino.speed);
  }

  return {
    field,
    createMino,
    startGame,
    mino,
  };
}