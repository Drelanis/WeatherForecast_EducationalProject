// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// interface ICity {
//   id: number;
//   name: string;
//   country: string;
//   coord: {
//     lon: number;
//     lat: number;
//   };
// }

// const getCities = async () => {
//   const cityList = (await import('./city.list.json')) as any as ICity[];
//   return cityList;
// };

// export const seedCities = async () => {
//   const cityData = await getCities();
//   const batchSize = 100;
//   const totalCities = cityData.length;
//   for (let startIndex = 0; startIndex < totalCities; startIndex += batchSize) {
//     const batchCities = cityData.slice(startIndex, startIndex + batchSize);
//     batchCities.forEach(async ({ id, name, country, coord }) => {
//       await prisma.city.createMany({
//         data: {
//           id,
//           name,
//           country,
//           longitude: coord.lon,
//           latitude: coord.lat,
//         },
//       });
//     });
//   }
//   console.log('All cities have been inserted into postgreSQL');
// };
