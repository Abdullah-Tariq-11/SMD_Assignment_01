import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart, PieChart, ProgressChart } from 'react-native-chart-kit';
import { DEGREE_CREDITS } from '../constants';
import { termHistory } from '../data/catalog';
import { completedCredits, cumulativeGpa } from '../lib/gpa';
import { creditsByCategory, totalCredits } from '../lib/schedule';
import { categoryColor, palette } from '../theme/palette';
import Card from '../ui/Card';

const chartWidth = Dimensions.get('window').width - 32 - 30;

const baseConfig = {
  backgroundGradientFrom: palette.surface,
  backgroundGradientTo: palette.surface,
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(45, 212, 191, ${opacity})`,
  labelColor: () => palette.muted,
  propsForDots: { r: '4', strokeWidth: '2', stroke: palette.accent },
};

function Tile({ label, value }) {
  return (
    <View style={styles.tile}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export default function InsightsScreen({ planned }) {
  const done = completedCredits(termHistory);
  const planCredits = totalCredits(planned);
  const split = creditsByCategory(planned);

  const pieData = Object.keys(split).map((name) => ({
    name: `${name} (cr)`,
    population: split[name],
    color: categoryColor[name],
    legendFontColor: palette.text,
    legendFontSize: 12,
  }));

  return (
    <View>
      <View style={styles.tiles}>
        <Tile label="CGPA" value={cumulativeGpa(termHistory).toFixed(2)} />
        <Tile label="Credits done" value={`${done}`} />
        <Tile label="Planned credits" value={`${planCredits}`} />
        <Tile label="Planned courses" value={`${planned.length}`} />
      </View>

      <Card title="Credit mix" note="This semester by category">
        {pieData.length === 0 ? (
          <Text style={styles.empty}>Add courses to see how your credits are split.</Text>
        ) : (
          <PieChart
            data={pieData}
            width={chartWidth}
            height={170}
            chartConfig={baseConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="0"
          />
        )}
      </Card>

      <Card title="SGPA trend" note="Past semesters">
        <LineChart
          data={{
            labels: termHistory.map((t) => t.term),
            datasets: [{ data: termHistory.map((t) => t.sgpa) }],
          }}
          width={chartWidth}
          height={190}
          chartConfig={baseConfig}
          bezier
          withInnerLines={false}
          style={styles.line}
        />
      </Card>

      <Card title="Degree progress" note={`${done} of ${DEGREE_CREDITS} credit hours completed`}>
        <ProgressChart
          data={{ labels: ['Done'], data: [Math.min(done / DEGREE_CREDITS, 1)] }}
          width={chartWidth}
          height={150}
          strokeWidth={14}
          radius={46}
          chartConfig={baseConfig}
          hideLegend
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  tiles: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tile: {
    width: '48%',
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  value: { color: palette.accent, fontSize: 26, fontWeight: '800' },
  label: { color: palette.muted, marginTop: 2 },
  empty: { color: palette.muted },
  line: { borderRadius: 12 },
});
