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
            tabBarActiveTintColor: '#FFD700', // Amarelo mais vibrante
            tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)', // Branco semi-transparente
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarItemStyle: styles.tabBarItem,
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
    height: 80,
    position: 'absolute',
    borderTopWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    paddingHorizontal: 20,
  },
  tabBarItem: {
    paddingVertical: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: -5,
    marginBottom: 5,
  },
});