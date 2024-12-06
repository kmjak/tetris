export default async function getMinoIDUC(){
  const mino_count = 7;
  return Math.floor(Math.random() * mino_count) + 1;
}