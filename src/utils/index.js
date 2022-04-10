export const validateRA = (RA) => {
  const regex = /^221\d{4}-006/;
  return regex.test(RA);
};

export const roleID = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';