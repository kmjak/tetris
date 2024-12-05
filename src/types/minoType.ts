import BlockType from "@/types/blockType";

interface MinoType {
  id: number;
  blocks: BlockType[]
  route: number;
  x: number;
  y: number;
  color: string;
  speed: number;
}

export default MinoType;