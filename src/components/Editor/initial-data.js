const initialData = {
  ptexts: {
    "ptext-1": { id: "ptext-1", content: "take out garbage" },
    "ptext-2": { id: "ptext-2", content: "watch show" },
    "ptext-3": { id: "ptext-3", content: "charge phone" },
    "ptext-4": { id: "ptext-4", content: "cook dinner" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Part 1 (title)",
      ptextIds: ["ptext-1", "ptext-2", "ptext-3"],
    },
    "column-2": {
      id: "column-2",
      title: "Part 2 (title)",
      ptextIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Part 3 (title)",
      ptextIds: [],
    },
  },
  //for reordering columns later on
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default initialData;
