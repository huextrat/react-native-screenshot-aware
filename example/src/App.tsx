import { StyleSheet, Text, View } from "react-native";
import { useScreenshotAware } from "react-native-screenshot-aware";

export default function App() {
  useScreenshotAware(() => {
    console.log("A screenshot was taken!");
  });

  return (
    <View style={styles.container}>
      <Text>Example</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
