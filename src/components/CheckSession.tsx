import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native-paper';

const CheckSession = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const userId = await AsyncStorage.getItem('userId');

      if (token && userId) {
        
        router.push('/(tabs)/(home)');
      } else {
        
        router.push('/telainicial');
      }

      setIsLoading(false);
    };

    checkSession();
  }, []);

  if (isLoading) {
    return <ActivityIndicator/>
  }

  return null;
};

export default CheckSession;
