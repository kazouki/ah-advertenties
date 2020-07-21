const initialData = {
  ptexts: {
    "ptext-1": { id: "ptext-1", content: " " },
    "ptext-2": { id: "ptext-2", content: " " },
    "ptext-3": { id: "ptext-3", content: " " },
    "ptext-4": { id: "ptext-4", content: " " },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: " ",
      ptextIds: ["ptext-1", "ptext-2", "ptext-3", "ptext-4"],
    },
    "column-2": {
      id: "column-2",
      title: " ",
      ptextIds: [],
    },
    "column-3": {
      id: "column-3",
      title: " ",
      ptextIds: [],
    },
  },

  columnOrder: ["column-1", "column-2", "column-3"],
};

export default initialData;
