import { Colors } from '@/src/constants/Colors';
import IconSymbol,{IconColor} from '@/src/components/iconsymbol';
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

  const pesquisaOptions = {
    title:"Pesquisa",
    tabBarIcon: ({color}:TabIconProps) => <IconSymbol size={28} name="magnifyingglass" color={color} />
  }

  const comicsOptions = {
    title:"Comics",
    tabBarIcon: ({color}:TabIconProps) => <IconSymbol size={28} name="paintbrush" color={color} />
  }

  const livrosOptions = {
    title:"Livros",
    tabBarIcon: ({color}:TabIconProps) => <IconSymbol size={28} name="book.fill" color={color} />
  }

  const audiovisualOptions = {
    title:"Audiovisual",
    tabBarIcon: ({color}:TabIconProps) => <IconSymbol size={28} name="film" color={color} />
  }

  return (
    <Tabs screenOptions = {
      {
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }
    }>
      <Tabs.Screen name="(home)" options={homeOptions}/>
      <Tabs.Screen name="(pesquisa)" options={pesquisaOptions}/>
      <Tabs.Screen name="(comics)" options={comicsOptions}/>
      <Tabs.Screen name="(livros)" options={livrosOptions}/>
      <Tabs.Screen name="(audiovisual)" options={audiovisualOptions}/>
    </Tabs>
  );
}