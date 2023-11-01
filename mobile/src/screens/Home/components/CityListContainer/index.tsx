import React, { FC } from 'react';
import { CityListContainer } from './styled';
import { ICity } from 'lib/interfaces';
import CityListItem from './components/CityListItem';

interface ICityListProps {
  data: ICity[];
  setCityId: React.Dispatch<React.SetStateAction<number | null>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const CityList: FC<ICityListProps> = ({ data, setCityId, setSearchQuery }) => {
  return (
    <CityListContainer>
      {data.map((city, index) => {
        const isLastElement = data.length - 1 === index;
        return (
          <CityListItem
            key={city.id}
            id={city.id}
            name={city.name}
            country={city.country}
            isLastElement={isLastElement}
            setCityId={setCityId}
            setSearchQuery={setSearchQuery}
          />
        );
      })}
    </CityListContainer>
  );
};

export default CityList;
