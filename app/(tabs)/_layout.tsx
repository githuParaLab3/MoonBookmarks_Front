import { View, StyleSheet } from 'react-native';
import IconSymbol, { IconColor } from '@/src/components/iconsymbol';
import { Tabs } from 'expo-router';

type TabIconProps = {
  color: IconColor;
};

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
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
            name="(bookmarks)"
            options={{
              title: 'Bookmarks',
              tabBarIcon: ({ color }: TabIconProps) => (
                <IconSymbol size={28} name="bookmark.fill" color={color} />
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
    position: 'absolute',
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
