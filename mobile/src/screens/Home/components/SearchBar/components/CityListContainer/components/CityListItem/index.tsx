import React, { FC, useState } from 'react';
import { Divider } from 'react-native-paper';
import { ItemText, ListItem } from './styled';
import { TouchableOpacity } from 'react-native';

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
    <ListItem>
      <TouchableOpacity>
        <ItemText
          style={itemStyle}
          onPress={() => handleSelectedCity(id, name)}
        >{`${name}, ${country}`}</ItemText>
      </TouchableOpacity>
      {!isLastElement && <Divider bold={true} />}
    </ListItem>
  );
};

export default CityListItem;
