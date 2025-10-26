
export interface EpisodeData {
  id: number;
  episode_id: string;
  title: string;
  description: string;
  category: string;
  content: string; // path to audio file
  created_at: string;
  type: "episode";
}

export const episodeData: EpisodeData[] = [
  {
    id: 1,
    episode_id: "EP1",
    title: "Selyula 101 – Overview of the Beginning of Life",
    description:
      "An introductory episode discussing the beginning of life and the role of cells.",
    category: "Cell Biology",
    content:
      "/assets/others/EP-1-_Selyula-101_---Overview-of-the-Beginning-of-Life-Made-with-Clipchamp.mp3",
    created_at: "2025-10-10",
    type: "episode",
  },
  {
    id: 2,
    episode_id: "EP2",
    title: "Selyula 101 – Overview of the Beginning of Life",
    description: "Exploring how cells began the foundation of life on Earth.",
    category: "Cell Biology",
    content:
      "/assets/others/EP-2-_Selyula-101_---Overview-of-the-Beginning-of-Life.mp3",
    created_at: "2025-10-12",
    type: "episode",
  },
  {
    id: 3,
    episode_id: "EP3",
    title: "SelTalk – Parts and Functions of the Cell",
    description:
      "Learn the essential parts and functions that make up the cell.",
    category: "Cell Anatomy",
    content:
      "/assets/others/EP-3-_SelTalk_---Parts-and-Functions-of-the-Cell-Made-with-Clipchamp.mp3",
    created_at: "2025-10-14",
    type: "episode",
  },
  {
    id: 4,
    episode_id: "EP4",
    title: "Likas na Selyula – Cell Cycle and Cell Division",
    description:
      "Discover how cells reproduce and the process of cell division.",
    category: "Cell Division",
    content:
      "/assets/others/EP-4-_Likas-na-Selyula_-Cell-Cycle-and-Cell-Division.mp3",
    created_at: "2025-10-17",
    type: "episode",
  },
];
