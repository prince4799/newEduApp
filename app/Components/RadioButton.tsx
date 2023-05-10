import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../Constants/Colors';

interface Props {
  label:any;
   value:any;
   selectedValue:any;
   onSelect:any;
   color ?:string,
}


const RadioButton : React.FC<Props> =({ label, value, selectedValue, onSelect, color }) => {
  const isSelected = value === selectedValue;
  useEffect(()=>{
    // console.log("value",value,isSelected,selectedValue)
  },[value])
  return (
    <TouchableOpacity style={styles.container} onPress={() => onSelect(value)}>
        {isSelected?<Icon name="radio-button-checked" size={20} color={color?color:COLORS.Font} />:
        <Icon name="radio-button-unchecked" size={20} color={color?color:COLORS.Font} />}
      <Text style={{...styles.label, color:color?color:COLORS.Font}}>{label}</Text>
    </TouchableOpacity>
  );
};
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
  },
});

export default RadioButton;
