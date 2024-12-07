import MinoType from "@/types/minoType";
import getMinoIDUC from "./getMinoIDUC";

export default async function  createMinoUC(mino:MinoType): Promise<void> {
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