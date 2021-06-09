import React from "react";

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";

import Icon from "./Icon";

export interface IOption {
  icon: string;
  description: string;
};

interface Props {
  options: IOption[];
  defaultOption: string | number;
  onChangeSelect: (option: IOption) => void;
}

export default function Select({ options, defaultOption, onChangeSelect }: Props): JSX.Element {
  const [ modalVisible, setModalVisible ] = React.useState<boolean>(false);
  const [ selectedOption, setSelectedOption ] = React.useState<IOption>(setDefaultOption(defaultOption));

  function setDefaultOption(defaultOption: Props["defaultOption"]): IOption {
    if(typeof(defaultOption) === "string") {
      const optionPosition = options.map((option) => {
        return option.description;
      }).indexOf(defaultOption);

      return options[optionPosition];
    } else {
      return options[defaultOption];
    }
  }

  function Option(option: IOption): JSX.Element {
    return(
      <TouchableOpacity
        onPress={() => {
          onChangeSelect(option);
          setSelectedOption(option);
          setModalVisible(false);
        }}
      >
        <View style={[ styles.card ]}>
          <View style={styles.image}>
            <Icon
              svg={option.icon}
              fill="#050505"
              height="37px"
              width="37px"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>{option.description}</Text>
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
        <View style={[ styles.card, { marginBottom: 32 } ]}>
          <View style={styles.image}>
            <Icon
              svg={selectedOption.icon}
              fill="#050505"
              height="37px"
              width="37px"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>{selectedOption.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView
          style={[ styles.container, { paddingVertical: 25 } ]}
        >
          {
            options.map((option, index) => <Option key={index} { ...option } />)
          }
        </ScrollView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingVertical: 45,
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

  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,

    textAlignVertical: "center",

    color: "#050505",
  },

  inputContainer: {
    flex: 1,
    justifyContent: "center",
  },
});