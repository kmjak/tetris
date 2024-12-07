interface CalcScoreUCProps {
  setScore: (update: (prev: number) => number) => void;
  lines: number;
}

export default async function calcScoreUC({setScore,lines}:CalcScoreUCProps):Promise<void> {
  switch (lines) {
    case 1:
      setScore((prev: number) => prev + 40);
      break;
    case 2:
      setScore((prev: number) => prev + 100);
      break;
    case 3:
      setScore((prev: number) => prev + 300);
      break;
    case 4:
      setScore((prev: number) => prev + 1200);
      break;
  }
}