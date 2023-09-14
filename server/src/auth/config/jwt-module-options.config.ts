export const options = {
  secret: process.env.SECRET_KEY || 'SECRET',
  signOptions: {
    expiresIn: process.env.JWT_EXP || '24h',
  },
};
