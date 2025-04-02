import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from './ThemedText';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
  title?: string;
}>;

export default function ModalScreen({ isVisible, children, onClose, title = "Modal" }: Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.backDrop}>
        <Pressable 
          style={StyleSheet.absoluteFill} 
          onPress={onClose}
        />
        
        <View style={styles.modalContainer}>
          <View style={styles.titleBar}>
            <View style={styles.titleContainer}>
              <ThemedText type='subtitle'>{title}</ThemedText>
            </View>
          </View>
          
          <View 
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            {children}
          </View>
        </View>
      </View>
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
  modalContent: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
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
  titleButton: {
    padding: 8,
  },
});