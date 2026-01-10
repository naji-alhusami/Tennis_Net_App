// Checks whether a string is a valid MongoDB ObjectId (used if a user change the id in the URL)

export const isValidMongoObjectId = (value: string) =>
  /^[0-9a-fA-F]{24}$/.test(value);
