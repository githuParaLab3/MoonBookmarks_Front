import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';


const MAPPING = {
 
  'house.fill': 'home',
  'gear': 'settings',
  'magnifyingglass': 'search',
  'film': 'movie',
  'book.fill': 'book', 
  'paintbrush': 'brush',
  'bookmark.fill': 'bookmark', 
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;
export type IconColor = string | OpaqueColorValue;


export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: IconColor;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
