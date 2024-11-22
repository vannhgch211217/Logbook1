import {
  Image,
  StyleSheet,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen() {
  const [selectedFrom, setSelectedFrom] = useState();
  const [selectedTo, setSelectedTo] = useState();
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  const convertUnits = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult("Please enter a valid number");
      return;
    }

    let scalingFactor = 1;

    if (selectedFrom === "Metre") {
      if (selectedTo === "Millimetre") {
        scalingFactor = 1000;
      } else if (selectedTo === "Mile") {
        scalingFactor = 0.000621371;
      } else if (selectedTo === "Foot") {
        scalingFactor = 3.28084;
      } else {
        scalingFactor = 1;
      }
    } else if (selectedFrom === "Millimetre") {
      if (selectedTo === "Metre") {
        scalingFactor = 0.001;
      } else if (selectedTo === "Mile") {
        scalingFactor = 6.2137e-7;
      } else if (selectedTo === "Foot") {
        scalingFactor = 0.00328084;
      } else {
        scalingFactor = 1;
      }
    } else if (selectedFrom === "Mile") {
      if (selectedTo === "Metre") {
        scalingFactor = 1609.34;
      } else if (selectedTo === "Millimetre") {
        scalingFactor = 1609340;
      } else if (selectedTo === "Foot") {
        scalingFactor = 5280;
      } else {
        scalingFactor = 1;
      }
    } else if (selectedFrom === "Foot") {
      if (selectedTo === "Metre") {
        scalingFactor = 0.3048;
      } else if (selectedTo === "Millimetre") {
        scalingFactor = 304.8;
      } else if (selectedTo === "Mile") {
        scalingFactor = 0.000189394;
      } else {
        scalingFactor = 1;
      }
    }    

    const convertedValue = value * scalingFactor;
    setResult(`Result: ${convertedValue} ${selectedTo}`);
    setInputValue("");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ textAlign: "center", fontSize: 25 }}>
            Unit Converter
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.input}>
            <Text>Input the value</Text>
            <TextInput
              keyboardType="number-pad"
              maxLength={10}
              style={styles.textInput}
              value={inputValue}
              onChangeText={setInputValue}
            />
          </View>
          <View style={styles.convert}>
            <View style={styles.pickerContainer}>
              <Text>From</Text>
              <Picker
                selectedValue={selectedFrom}
                onValueChange={(itemValue) => setSelectedFrom(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Metre" value="Metre" />
                <Picker.Item label="Millimetre" value="Millimetre" />
                <Picker.Item label="Mile" value="Mile" />
                <Picker.Item label="Foot" value="Foot" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text>To</Text>
              <Picker
                selectedValue={selectedTo}
                onValueChange={(itemValue) => setSelectedTo(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Metre" value="Metre" />
                <Picker.Item label="Millimetre" value="Millimetre" />
                <Picker.Item label="Mile" value="Mile" />
                <Picker.Item label="Foot" value="Foot" />
              </Picker>
            </View>
          </View>
          <View style={styles.button}>
            <Button title="Convert" onPress={() => { Keyboard.dismiss(); convertUnits(); }} />
          </View>
          {result ? <Text style={styles.result}>{result}</Text> : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F2D5D5",
    paddingTop: 50,
    flex: 1,
  },
  body: {
    flex: 12,
    backgroundColor: "#F3EEEE",
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
  input: {
    padding: 20,
  },
  textInput: {
    borderBlockColor: "#F2D5D5",
    borderBottomWidth: 2,
    marginHorizontal: 15,
    margin: 15,
  },
  convert: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  pickerContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  button: {
    padding: 150,
  },
  result: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
});
