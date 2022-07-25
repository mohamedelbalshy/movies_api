export const RatingRepository = jest.fn().mockReturnValue({
  upsert: jest.fn().mockResolvedValue({
    identifiers: [{ id: 1 }],
    generatedMaps: [{ id: 1 }],
    raw: [{ id: 1 }],
  }),
});
