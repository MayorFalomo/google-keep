export const module = {
  loaders: [
    {
      test: /masonry-layout/,
      loader: "imports?define=>false&this=>window",
    },
  ],
};
