export const isValidRA = (RA) => {
  const regex = /^221\d{4}-006/;
  return regex.test(RA);
};
