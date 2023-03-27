import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../Constants/Colors';

interface Props {
  label:any;
   value:any;
   selectedValue:any;
   onSelect:any;
}


const RadioButton : React.FC<Props> =({ label, value, selectedValue, onSelect }) => {
  const isSelected = value === selectedValue;
  useEffect(()=>{
    console.log("value",value,isSelected,selectedValue)
  },[value])
  return (
    <TouchableOpacity style={styles.container} onPress={() => onSelect(value)}>
        {isSelected?<Icon name="radio-button-checked" size={20} color={COLORS.Font} />:
        <Icon name="radio-button-unchecked" size={20} color={COLORS.Font} />}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

// const RadioButtonGroup = () => {
//   const [selectedValue, setSelectedValue] = useState(null);

//   const handleSelect = value => {
//     setSelectedValue(value);
//   };

//   return (
//     <View>
//       <RadioButton label="Option 1" value="option1" selectedValue={selectedValue} onSelect={handleSelect} />
//       <RadioButton label="Option 2" value="option2" selectedValue={selectedValue} onSelect={handleSelect} />
//       <RadioButton label="Option 3" value="option3" selectedValue={selectedValue} onSelect={handleSelect} />
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
    alignSelf:'center',
    marginHorizontal:'3%'
  },
  label: {
    fontSize: 12,
    color: COLORS.Font,
  },
});

export default RadioButton;
