const getLetters = (fullName: string = ''): string =>
  fullName
    .split(' ')
    .map((leter) => leter[0])
    .join('');

export default getLetters;
