import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { CovidApiService }  from '../Controlador/Services/Paises';


export default function HomeScreen({ navigation }: any) {
    const [countries, setCountries] = useState<any[]>([]);

    useEffect(() => {
        let created = true;
        const fetchData = async () => {
            try {
                const data = await CovidApiService.getAllCountries();
                if (created) setCountries(data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
        return () => {
            created = false;
        };
    }, []);

  return (
    <SafeAreaView style={styles.back}>
        <ThemedView style={styles.headerContainer}>
            <ThemedText type="title">ListaRecyclerView</ThemedText>
        </ThemedView>
        <ScrollView style={styles.scrollView}>
            <ThemedText style={styles.title} type="title">Hello World!</ThemedText>
      {countries.map((country, index) => (
        <Pressable key={index} onPress={() => navigation.navigate('Country', { country })}>
          <ThemedView style={styles.card}>
            <Image
              source={{ uri: country.countryInfo.flag }}
              style={styles.flag}
              contentFit="cover"
            />
            <ThemedText style={styles.countryName}>{country.country}</ThemedText>
            <ThemedText style={styles.countryName}>{country.cases}</ThemedText>
          </ThemedView>
        </Pressable>
      ))}
        </ScrollView>
    </SafeAreaView>
  );
}

const heightHeader = 60;
const backgroundColor = 'rgba(108, 47, 239, 0.8)';

const styles = StyleSheet.create({
    back: {
      backgroundColor: backgroundColor,
      flex: 1,
    },
    title:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#000000ff',
    alignContent: 'center',
    textAlign: 'center',

  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  scrollView: {
    marginTop: heightHeader,
    padding: 16,
    backgroundColor: 'white',
  },
  headerContainer: {
    position: 'absolute',
    top: 40,
    bottom: 20,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'transparent',
    height: heightHeader + 10,
  },
  card: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  flag : {
    width: 120,
    height: 80,
    marginBottom: 8,
  },
  countryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },

});
