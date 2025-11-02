import { Image } from 'expo-image';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { CovidApiService } from '../Controlador/Services/Paises';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

export default function Country({ route }: any) {
  const screenWidth = Dimensions.get('window').width;
  const { country } = route.params;

  const [chartData, setChartData] = useState<{ labels: string[]; data: number[] }>({
    labels: [],
    data: [],
  });

  useEffect(() => {
    let created = true;

    const fetchData = async () => {
      try {
        const data = await CovidApiService.getHistoricalData(country.country);
        if (created && data) {
          const processedCases: Record<string, number> = {};
          for (const key of Object.keys(data.timeline.cases)) {
            const formattedKey = CovidApiService.processTimelineData(key);
            processedCases[formattedKey] = data.timeline.cases[key];
          }
          data.timeline.cases = processedCases;

          // const labels = Object.keys(processedCases).slice(-800); //asi se ve casi todos los datos
          // const values = Object.values(processedCases).slice(-800);
          const labels = Object.keys(processedCases).slice(-50); 
          const values = Object.values(processedCases).slice(-50);

          setChartData({
            labels,
            data: values,
          });
        }
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
        <ThemedText type="title">Covid19</ThemedText>
      </ThemedView>

      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.card}>
          <ThemedText style={styles.countryName}>{country.country}</ThemedText>
          <ThemedText style={styles.space}> </ThemedText>

          <Image source={{ uri: country.countryInfo.flag }} style={styles.flag} contentFit="cover" />
          <ThemedText style={styles.space}> </ThemedText>

          <ThemedText style={styles.countryInfo}>Casos: {country.cases}</ThemedText>
          <ThemedText style={styles.countryInfo}>Recuperados: {country.recovered}</ThemedText>
          <ThemedText style={styles.countryInfo}>Decesos: {country.deaths}</ThemedText>

          {chartData.data.length > 0 ? (
            <LineChart
              data={{
                labels: chartData.labels.filter((_, i) => i % 10 === 0), //Esto se agrego para solo mostarr 1 de cada 10 etiquetas
                datasets: [{ data: chartData.data }],
              }}
              width={screenWidth - 30}
              height={350}
              chartConfig={{
                backgroundGradientFrom: '#ffffffff',
                backgroundGradientTo: '#ffffffff',
                color: (opacity = 1) => `rgba(16, 255, 219, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForBackgroundLines: {
                  stroke: 'black',     
                  strokeWidth: 1,
                  strokeDasharray: '',
                },
              }}
              
              bezier
              yAxisInterval={10}
              verticalLabelRotation={45}
              xLabelsOffset={-10}
              formatYLabel={(value) => parseInt(value).toString()}
            />
          ) : (
            <ThemedText>Cargando Datos</ThemedText>
          )}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const heightHeader = 60;
const backgroundColor = 'rgba(108, 47, 239, 0.8)';

const styles = StyleSheet.create({
  back: {
    backgroundColor,
    flex: 1,
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
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  flag: {
    width: 200,
    height: 130,
    marginBottom: 8,
  },
  countryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  countryInfo: {
    fontSize: 14,
    marginBottom: 1,
    color: '#666',
  },
  space: {
    marginBottom: 8,
  },
});
