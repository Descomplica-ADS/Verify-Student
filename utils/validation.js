export const isValidRA = (RA) => {
  const regex = /^22\d{5}-006/;
  const isValid = regex.test(RA);
  if (!isValid) return { isValid };
  const period = Number(RA.substring(3, 2));

  return { isValid, period };
};
