import React from "react";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";

import Icon from "./Icon";

import Calendar from "../assets/images/svgs/Calendar";

import { getCurrentDay, getCurrentMonth } from "../utils/formatDate";
import { capitalizeFirstLetter } from "../utils/formatString";

import MonthOptions from "../settings/MonthOptions";

interface ItemProps {
  description: string;
  icon: string;
  onSelect: (option: string) => void;
}

interface Props {
  date: Date | null;
  onChangeDate: (date: Date) => void;
}

function createMonthWithDaysQuantity(daysQuantity: number): number[] {
  return Array.from({ length: daysQuantity }, (_, i) => i + 1);
}

export default function Datepicker({ date, onChangeDate }: Props): JSX.Element {
  const [
    defaultDaysOfTheCurrentMonth,
    updateDefaultDaysOfTheCurrentMonth
  ] = React.useState<number[]>(createMonthWithDaysQuantity(31));

  const [ modalVisible, setModalVisible ] = React.useState<boolean>(false);

  const [ daysOfTheMonth, setDaysOfTheMonth ] = React.useState<number[]>(defaultDaysOfTheCurrentMonth);
  const [ day, updateDay ] = React.useState<string>(getCurrentDay(new Date(Date.now())));
  const [ month, updateMonth ] = React.useState<string>(getCurrentMonth(new Date(Date.now())));

  function handleUpdateMonth(month: string): void {
    updateMonth(month);
  }

  function handleUpdateDay(day: string): void {
    updateDay(day);
  }

  function Item({ description, icon, onSelect }: ItemProps): JSX.Element {
    return(
      <TouchableOpacity
        onPress={() => onSelect(description)}
      >
        <View style={[ styles.card ]}>
          <View style={styles.image}>
            <Icon
              svg={icon}
              fill="#050505"
              height="37px"
              width="37px"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>{capitalizeFirstLetter(description)}</Text>
          </View>
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
        <View style={[ styles.container ]}>
          <FlatList
            style={[ { marginTop: 14 } ]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={MonthOptions}
            renderItem={({ item }) => <Item icon={item.icon} description={item.description} onSelect={() => handleUpdateMonth(item.description)} />}
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