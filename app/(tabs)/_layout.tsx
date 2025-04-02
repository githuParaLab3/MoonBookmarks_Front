import { View, StyleSheet } from 'react-native';
import HeaderScreen from '@/src/components/HeaderScreen'; // Importa o header
import IconSymbol, { IconColor } from '@/src/components/iconsymbol';
import { Tabs } from 'expo-router';

type TabIconProps = {
  color: IconColor;
};

export default function TabLayout() {
  return (
    <View style={{ flex: 1}}>
      
      <View style={{ flex: 1}}> 
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#FFC107',
            tabBarInactiveTintColor: '#FFFFFF',
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
            headerShown: false, 
            
          }}
        >
          <Tabs.Screen
            name="(home)"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }: TabIconProps) => (
                <IconSymbol size={28} name="house.fill" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="(pesquisa)"
            options={{
              title: 'Pesquisa',
              tabBarIcon: ({ color }: TabIconProps) => (
                <IconSymbol size={28} name="magnifyingglass" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="(comics)"
            options={{
              title: 'Comics',
              tabBarIcon: ({ color }: TabIconProps) => (
                <IconSymbol size={28} name="paintbrush" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="(livros)"
            options={{
              title: 'Livros',
              tabBarIcon: ({ color }: TabIconProps) => (
                <IconSymbol size={28} name="book.fill" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="(audiovisual)"
            options={{
              title: 'Audiovisual',
              tabBarIcon: ({ color }: TabIconProps) => (
                <IconSymbol size={28} name="film" color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#9748FF',
    height: 65,
    marginHorizontal: 10,
    position: 'absolute',
    bottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    paddingBottom: 10,
  },
  tabBarLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
});
