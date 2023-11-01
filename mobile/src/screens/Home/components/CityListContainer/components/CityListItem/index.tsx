import React, { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Divider, List } from 'react-native-paper';

interface ICityListItemProps {
  id: number;
  name: string;
  country: string;
  isLastElement: boolean;
  setCityId: React.Dispatch<React.SetStateAction<number | null>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const CityListItem: FC<ICityListItemProps> = ({
  id,
  name,
  country,
  isLastElement,
  setCityId,
  setSearchQuery,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleSelectedCity = (id: number, name: string) => {
    setIsPressed(true);
    setCityId(id);
    setSearchQuery(name);
  };

  const itemStyle = isPressed && { opacity: 0.3 };

  return (
    <TouchableOpacity>
      <List.Item
        style={itemStyle}
        key={id}
        title={name}
        description={country}
        onPress={() => handleSelectedCity(id, name)}
      />
      {!isLastElement && <Divider />}
    </TouchableOpacity>
  );
};

export default CityListItem;
