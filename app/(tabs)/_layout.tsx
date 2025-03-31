import { Colors } from '@/src/constants/Colors';
import IconSymbol,{IconColor} from '@/src/cp/iconsymbol';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

type TabIconProps = {
  color:IconColor,
}

export default function TabLayout() {

  const colorScheme = useColorScheme();

  const homeOptions = { 
    title:"Home",
    tabBarIcon: ({color}:TabIconProps) => <IconSymbol size={28} name="house.fill" color={color} />
  }

  const settingOptions = {
    title:"Settings",
    tabBarIcon: ({color}:TabIconProps) => <IconSymbol size={28} name="gear" color={color} />
  }

  return (
    <Tabs screenOptions = {
      {
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }
    }>
      <Tabs.Screen name="(home)" options={homeOptions}/>
      <Tabs.Screen name="settings" options={settingOptions}/>
    </Tabs>
  );
}