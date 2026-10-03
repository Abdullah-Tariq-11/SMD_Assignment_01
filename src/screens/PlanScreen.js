import { StyleSheet, Text, TextInput, View } from 'react-native';
import { INSTALLMENT_OPTIONS } from '../constants';
import { estimateFees, formatPkr, parseScholarship } from '../lib/fees';
import { addState, totalCredits, weekView } from '../lib/schedule';
import { categoryColor, palette } from '../theme/palette';
import Card from '../ui/Card';
import CourseRow from '../ui/CourseRow';
import CreditMeter from '../ui/CreditMeter';
import Notice from '../ui/Notice';
import Pill from '../ui/Pill';

export default function PlanScreen({ planned, fee, onFeeChange, onToggle, onClear }) {
  const credits = totalCredits(planned);
  const scholarship = parseScholarship(fee.scholarship);
  const estimate = estimateFees(credits, scholarship.value, fee.installments);

  return (
    <View>
      <Card title="Credit load">
        <CreditMeter credits={credits} />
      </Card>

      {planned.length === 0 ? (
        <Notice title="Your plan is empty" message="Open the Catalog and add courses to build your semester." />
      ) : (
        <View>
          <Card title="Weekly timetable" note="Sessions grouped by day">
            {weekView(planned).map(({ day, entries }) => (
              <View key={day} style={styles.dayRow}>
                <Text style={styles.day}>{day}</Text>
                <View style={styles.entries}>
                  {entries.length === 0 ? (
                    <Text style={styles.free}>Free</Text>
                  ) : (
                    entries.map((e) => (
                      <View
                        key={e.course.id + e.start}
                        style={[styles.slot, { borderLeftColor: categoryColor[e.course.category] }]}
                      >
                        <Text style={styles.slotTitle}>{e.course.code}</Text>
                        <Text style={styles.slotTime}>{e.start} - {e.end}</Text>
                      </View>
                    ))
                  )}
                </View>
              </View>
            ))}
          </Card>

          <Text style={styles.heading}>Selected courses</Text>
          {planned.map((course) => (
            <CourseRow key={course.id} course={course} state={addState(course, planned)} onPress={() => onToggle(course)} />
          ))}
          <View style={styles.clear}>
            <Pill label="Clear plan" active={false} onPress={onClear} />
          </View>
        </View>
      )}

      <Card title="Fee estimate" note="Based on your selected credit hours">
        <Text style={styles.label}>Scholarship (%)</Text>
        <TextInput
          style={[styles.input, scholarship.error !== '' && styles.inputBad]}
          value={fee.scholarship}
          onChangeText={(text) => onFeeChange({ ...fee, scholarship: text })}
          keyboardType="numeric"
          maxLength={3}
          placeholder="0"
          placeholderTextColor={palette.muted}
        />
        {scholarship.error !== '' && <Text style={styles.error}>{scholarship.error}</Text>}

        <Text style={styles.label}>Pay in installments</Text>
        <View style={styles.wrap}>
          {INSTALLMENT_OPTIONS.map((n) => (
            <Pill key={n} label={String(n)} active={fee.installments === n} onPress={() => onFeeChange({ ...fee, installments: n })} />
          ))}
        </View>

        <View style={styles.line}><Text style={styles.lineLabel}>Tuition</Text><Text style={styles.lineValue}>{formatPkr(estimate.gross)}</Text></View>
        <View style={styles.line}><Text style={styles.lineLabel}>Scholarship</Text><Text style={styles.lineValue}>- {formatPkr(estimate.discount)}</Text></View>
        <View style={styles.line}><Text style={styles.total}>You pay</Text><Text style={styles.total}>{formatPkr(estimate.net)}</Text></View>
        <Text style={styles.each}>{fee.installments} x {formatPkr(estimate.perInstallment)}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  dayRow: { flexDirection: 'row', paddingVertical: 8, borderTopWidth: 1, borderTopColor: palette.line },
  day: { width: 44, color: palette.accent, fontWeight: '700' },
  entries: { flex: 1 },
  free: { color: palette.muted },
  slot: {
    borderLeftWidth: 4,
    backgroundColor: palette.raised,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slotTitle: { color: palette.text, fontWeight: '700' },
  slotTime: { color: palette.muted },
  heading: { color: palette.text, fontSize: 16, fontWeight: '700', marginBottom: 10 },
  clear: { alignSelf: 'flex-start', marginBottom: 6 },
  label: { color: palette.muted, fontSize: 12, marginTop: 8, marginBottom: 6, textTransform: 'uppercase' },
  input: {
    backgroundColor: palette.bg,
    borderWidth: 1,
    borderColor: palette.line,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: palette.text,
  },
  inputBad: { borderColor: palette.bad },
  error: { color: palette.bad, marginTop: 4, fontSize: 12 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap' },
  line: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  lineLabel: { color: palette.muted },
  lineValue: { color: palette.text },
  total: { color: palette.text, fontWeight: '800', fontSize: 16, marginTop: 4 },
  each: { color: palette.accent, marginTop: 4, fontWeight: '600' },
});
