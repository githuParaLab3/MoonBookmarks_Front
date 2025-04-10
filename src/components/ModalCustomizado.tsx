import React, { PropsWithChildren, useEffect, useRef } from "react";
import { 
  Modal, 
  View, 
  Text, 
  Pressable, 
  StyleSheet, 
  Animated, 
  TouchableWithoutFeedback 
} from "react-native";
import { ThemedText } from "./ThemedText";

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
  title?: string;
}>;

export default function ModalCustomizado({ isVisible, children, onClose, title = "Modal" }: Props) {
  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <Modal transparent visible={isVisible} animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backDrop}>
          <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
            <View style={styles.dragIndicator} />
            <View style={styles.titleBar}>
              <View style={styles.titleContainer}>
                <ThemedText type="subtitle">{title}</ThemedText>
              </View>
            </View>

            <View style={styles.modalContent}>
              {children}
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backDrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    height: "75%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "lightgray",
    borderRadius: 3,
    alignSelf: "center",
    marginVertical: 8,
  },
  titleBar: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
});
