/* Landing page demo data: everything here is hardcoded on purpose, no API call. */

export type DemoOption = {
  id: number;
  text: string;
  votes: number;
};

export const SINGLE_CHOICE_DEMO = {
  title: "Where should the team offsite happen this year?",
  description: "One vote per person. Closes in 3 days.",
  hashtags: ["work", "offsite"],
  options: [
    { id: 1, text: "Lisbon", votes: 128 },
    { id: 2, text: "Berlin", votes: 74 },
    { id: 3, text: "Marseille", votes: 96 },
    { id: 4, text: "Stay remote", votes: 41 },
  ] satisfies DemoOption[],
};

export const MULTIPLE_CHOICE_DEMO = {
  title: "Which nights work for the family dinner?",
  hashtags: ["family"],
  options: [
    { id: 1, text: "Friday", votes: 9 },
    { id: 2, text: "Saturday", votes: 12 },
    { id: 3, text: "Sunday", votes: 5 },
  ] satisfies DemoOption[],
};

export const SLIDER_DEMO = {
  title: "How ready are we to ship on Friday?",
  leftLabel: "Not at all",
  rightLabel: "Ship it",
  average: 65,
  voters: 23,
};

export const TRENDING_POLLS = [
  {
    title: "Pineapple on pizza: yes or no?",
    votes: "12 480 votes",
    tag: "food",
  },
  {
    title: "Tabs or spaces, one last time",
    votes: "8 902 votes",
    tag: "dev",
  },
  {
    title: "Best month to take holidays in France",
    votes: "3 117 votes",
    tag: "life",
  },
];

export const ROOM_DEMO_POLLS = [
  { title: "Venue: barn or seaside?", status: "Closed" },
  { title: "Menu — pick your two favourites", status: "Open" },
  { title: "Playlist veto list", status: "Open" },
];

export const ROOM_DEMO_MESSAGES = [
  {
    author: "Tom",
    message: "Barn won by 3 votes — I'm calling them tomorrow.",
  },
  {
    author: "Mum",
    message: "Can we add a vegetarian option to the menu poll?",
  },
];
