import React from "react";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions
} from "react-native";

import Icon from "./Icon";

import Calendar from "../assets/images/svgs/Calendar";

import { getCurrentDay, getCurrentMonth, getCurrentYear } from "../utils/formatDate";
import { capitalizeFirstLetter } from "../utils/formatString";

import MonthOptions, { IMonth } from "../settings/MonthOptions";

interface MonthItemProps {
  description: string;
  onSelect: (option: string) => void;
}

interface DayItemProps {
  day: number;
  onSelect: (option: string) => void;
}

interface Props {
  onChangeDate: (date: Date) => void;
}

function createMonthWithDaysQuantity(daysQuantity: number): number[] {
  return Array.from({ length: daysQuantity }, (_, i) => i + 1);
}

export default function Datepicker({ onChangeDate }: Props): JSX.Element {
  const [ modalVisible, setModalVisible ] = React.useState<boolean>(false);
  const [ modalPickDayVisible, setModalPickDayVisible ] = React.useState<boolean>(false);

  const [ daysOfTheMonth, updateDaysOfTheMonth ] = React.useState<number[]>(createMonthWithDaysQuantity(31));

  const [ day, updateDay ] = React.useState<string>(getCurrentDay(new Date(Date.now())));
  const [ month, updateMonth ] = React.useState<string>(getCurrentMonth(new Date(Date.now())));

  function handleUpdateMonth(month: string, number: number, days: number): void {
    updateMonth(month);

    const currentYear: number = getCurrentYear(new Date(Date.now()));

    if(month === "fevereiro") {
      const isLeapYear: boolean = ((currentYear % 4 == 0) && (currentYear % 100 != 0)) || (currentYear % 400 == 0);

      isLeapYear
      ? updateDaysOfTheMonth(createMonthWithDaysQuantity(29))
      : updateDaysOfTheMonth(createMonthWithDaysQuantity(days));
    } else {
      updateDaysOfTheMonth(createMonthWithDaysQuantity(days));
    }

    const newDate: Date = new Date(currentYear, (number - 1), Number(day));

    onChangeDate(newDate);
  }

  function handleUpdateDay(day: string): void {
    updateDay(day);

    const currentYear: number = getCurrentYear(new Date(Date.now()));

    const currentMonthData: IMonth = MonthOptions.find(monthOption => monthOption.description === month)!;

    const monthNumber: number = currentMonthData.number;

    const newDate: Date = new Date(currentYear, (monthNumber - 1), Number(day));

    onChangeDate(newDate);
  }

  function MonthItem({ description, onSelect }: MonthItemProps): JSX.Element {
    return(
      <TouchableOpacity
        onPress={() => {
          onSelect(description);
          setModalPickDayVisible(true);
        }}
      >
        <View style={[
          styles.monthItem,
          {
            marginTop: 14,
            marginBottom: 0,
          }
        ]}>
          <Text style={[ styles.text, { textAlign: "center" } ]}>{capitalizeFirstLetter(description)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function DayItem({ day, onSelect }: DayItemProps): JSX.Element {
    return(
      <TouchableOpacity
        onPress={() => {
          onSelect(String(day));
          setModalPickDayVisible(true);
        }}
      >
        <View style={[
          styles.dayItem,
          {
            marginTop: 14,
            marginBottom: 0,
          }
        ]}>
          <Text style={[ styles.text, { textAlign: "center" } ]}>{String(day)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return(
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
      >
        <View style={[ styles.card ]}>
          <View style={styles.image}>
            <Icon
              svg={Calendar}
              fill="#050505"
              height="37px"
              width="37px"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>{day} de {month}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[ styles.container, { paddingHorizontal: 0 } ]}>
          <FlatList
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",

              paddingHorizontal: 10,
              paddingTop: 45,
            }}       
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={MonthOptions}
            renderItem={({ item }) => <MonthItem description={item.description} onSelect={() => handleUpdateMonth(item.description, item.number, item.days)} />}
            keyExtractor={item => item.description}
          />
        </View>
        <View style={[ { paddingHorizontal: 20, backgroundColor: "#ffffff" }]}>
          <TouchableOpacity
            style={{ marginTop: 14 }}
            onPress={() => setModalVisible(false)}
          >
            <View style={[
              styles.card,
              styles.button,
            ]}>
              <View style={[ styles.inputContainer, { flexDirection: "row", alignItems: "center" } ]}>
                <View style={styles.image}>
                  <Icon
                    svg={Calendar}
                    fill="#050505"
                    height="37px"
                    width="37px"
                  />
                </View>
                <Text style={styles.text}>{day} de {month}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={modalPickDayVisible}
        onRequestClose={() => setModalPickDayVisible(false)}
      >
        <View style={[ styles.container, { paddingHorizontal: 0 } ]}>
          <FlatList
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",

              paddingHorizontal: 20,
              paddingTop: 45,
            }}
            numColumns={4}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={daysOfTheMonth}
            renderItem={({ item }) => <DayItem day={item} onSelect={() => handleUpdateDay(String(item))} />}
            keyExtractor={item => String(item)}
          />
        </View>
        <View style={[ { paddingHorizontal: 20, backgroundColor: "#ffffff" }]}>
          <TouchableOpacity
            style={{ marginTop: 14 }}
            onPress={() => {
              setModalVisible(false);
              setModalPickDayVisible(false);
            }}
          >
            <View style={[
              styles.card,
              styles.button,
            ]}>
              <View style={[ styles.inputContainer, { flexDirection: "row", alignItems: "center" } ]}>
                <View style={styles.image}>
                  <Icon
                    svg={Calendar}
                    fill="#050505"
                    height="37px"
                    width="37px"
                  />
                </View>
                <Text style={styles.text}>{day} de {month}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,

    backgroundColor: "#ffffff",
  },

  image: {
    marginRight: 20,

    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    height: 42,

    flexDirection: "row",

    marginBottom: 14,
  },

  monthItem: {
    minWidth: Dimensions.get("window").width / 2 - 30,

    flexBasis: 0,

    backgroundColor: "#EFEBF6",
    
    padding: 15,
    marginHorizontal: 14,

    borderRadius: 4,
  },

  dayItem: {
    minWidth: Dimensions.get("window").width / 4 - 34,

    flexBasis: 0,

    backgroundColor: "#EFEBF6",
    
    marginHorizontal: 7,

    paddingVertical: 12,
    borderRadius: 4,
  },
  
  inputContainer: {
    flex: 1,
    justifyContent: "center",
  },

  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,

    textAlignVertical: "center",

    color: "#050505",
  },

  button: {
    width: "100%",

    backgroundColor: "#D1FBEA",

    height: 60,

    borderRadius: 4,

    justifyContent: "center",
    alignItems: "center",
  },
  
  paddingView: {
    height: 25,
  },
});