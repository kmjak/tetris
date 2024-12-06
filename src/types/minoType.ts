import BlockType from "@/types/BlockType";

interface MinoType {
  id: number;
  blocks: BlockType[]
  x: number;
  y: number;
  color: string;
  speed: number;
}

export default MinoType;