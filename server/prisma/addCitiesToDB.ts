// import { PrismaClient } from '@prisma/client';
// import { CITIES } from './city.list';

// const prisma = new PrismaClient();

// export const addCitiesToDB = async () => {
//   CITIES.forEach(async ({ name, country, coord }) => {
//     await prisma.city.create({
//       data: {
//         name,
//         country,
//         longitude: coord.lon,
//         latitude: coord.lat,
//       },
//     });
//   });
//   console.log('All cities added to database');
// };
