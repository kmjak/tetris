import MinoType from "@/types/minoType";
import BlockType from "@/types/BlockType";
import defaultField from "@/lib/defaultField";
import isRange from "@/utils/isRange";

export default async function isAliveUC(move:string,mino:MinoType):Promise<boolean>{
  let res = true
  switch (move) {
    case "down":
      mino.blocks.map((block:BlockType) => {
        if(isRange(mino.x + block.x,mino.y + block.y) === false){
          res = false;
        }else{
          if(defaultField[mino.y + block.y][mino.x + block.x] !== 0){
            res = false;
          }
        }
      })
      break;
    case "left":
      mino.blocks.map((block:BlockType) => {
        if(isRange(mino.x + block.x - 1,mino.y + block.y) === false){
          res = false;
        }else{
          if(defaultField[mino.y + block.y][mino.x + block.x - 1] !== 0){
            res = false;
          }
        }
      })
      break;
    case "right":
      mino.blocks.map((block:BlockType) => {
        if(isRange(mino.x + block.x + 1,mino.y + block.y) === false){
          res = false;
        }else{
          if(defaultField[mino.y + block.y][mino.x + block.x + 1] !== 0){
            res = false;
          }
        }
      })
      break;
    case "routeR":
      const tmp = mino.blocks.map((block:BlockType) => {
        return {x: block.y, y: -block.x};
      });
      tmp.map((block:BlockType) => {
        if(isRange(mino.x + block.x,mino.y + block.y) === false){
          res = false;
        }else{
          if(defaultField[mino.y + block.y][mino.x + block.x] !== 0){
            res = false;
          }
        }
      });
      break;
    case "routeL":
      const tmp2 = mino.blocks.map((block:BlockType) => {
        return {x: -block.y, y: block.x};
      });
      tmp2.map((block:BlockType) => {
        if(isRange(mino.x + block.x,mino.y + block.y) === false){
          res = false;
        }else{
          if(defaultField[mino.y + block.y][mino.x + block.x] !== 0){
            res = false;
          }
        }
      });
      break;
  }
  return res;
}