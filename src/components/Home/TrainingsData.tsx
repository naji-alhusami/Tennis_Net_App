import { type TrainingLevel } from "@/lib/types/TrainingLevels";



export const TrainingLevelsData: TrainingLevel[] = [
  {
    id: "1",
    courseType: "BEGINNER",
    percent: 80,
    width: "80",
    style: "font-bold text-white w-4/5 h-6 absolute top-0 bg-yellow-500 flex flex-row items-center justify-between px-5",
  },
  {
    id: "2",
    courseType: "INTERMEDIATE",
    percent: 70,
    width: "70",
    style: "font-bold text-white w-3/5 h-6 absolute top-0 bg-green-700 flex flex-row items-center justify-between px-5",
  },
  {
    id: "3",
    courseType: "ADVANCED",
    percent: 50,
    width: "50",
    style: "font-bold text-white w-3/5 h-6 absolute top-0 bg-yellow-500 flex flex-row items-center justify-between px-5",
  },
];
