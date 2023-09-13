export const options = {
  secret: process.env.PRIVATE_KEY || 'SECRET',
  signOptions: {
    expiresIn: process.env.JWT_EXP || '24h',
  },
};
