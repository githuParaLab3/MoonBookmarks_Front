import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

type BookmarkDetailsProps = {
  title: string;
  chapters: {
    number: string;
    read: boolean;
  }[];
  completed: boolean;
  description: string;
  onToggleChapter: (chapterNumber: string) => void;
  onToggleCompleted: () => void;
  onAddToCollection: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function BookmarkDetails({
  title,
  chapters,
  completed,
  description,
  onToggleChapter,
  onToggleCompleted,
  onAddToCollection,
  onEdit,
  onDelete,
}: BookmarkDetailsProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Detalhes
      </ThemedText>

      <ThemedText type="subtitle" style={styles.subtitle}>
        {title}
      </ThemedText>

      <View style={styles.chaptersContainer}>
        {chapters.map((chapter) => (
          <View key={chapter.number} style={styles.chapterItem}>
            <Pressable
              onPress={() => onToggleChapter(chapter.number)}
              style={styles.checkboxContainer}
            >
              <View style={[styles.checkbox, chapter.read && styles.checked]}>
                {chapter.read && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <ThemedText style={styles.chapterText}>
                Capítulo {chapter.number}
              </ThemedText>
            </Pressable>
          </View>
        ))}

        <Pressable
          onPress={onToggleCompleted}
          style={styles.checkboxContainer}
        >
          <View style={[styles.checkbox, completed && styles.checked]}>
            {completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <ThemedText style={styles.chapterText}>Concluído</ThemedText>
        </Pressable>
      </View>

      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Descrição
        </ThemedText>
        <ThemedText style={styles.descriptionText}>{description}</ThemedText>
      </View>

      <View style={styles.actionsContainer}>
        <Pressable onPress={onAddToCollection} style={styles.actionButton}>
          <ThemedText style={styles.actionText}>Inserir em coleção</ThemedText>
        </Pressable>

        <Pressable onPress={onEdit} style={styles.actionButton}>
          <ThemedText style={styles.actionText}>Editor</ThemedText>
        </Pressable>

        <Pressable onPress={onDelete} style={[styles.actionButton, styles.deleteButton]}>
          <ThemedText style={[styles.actionText, styles.deleteText]}>Excluir</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  chaptersContainer: {
    marginBottom: 20,
  },
  chapterItem: {
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
  },
  chapterText: {
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  actionText: {
    color: '#6200ee',
  },
  deleteButton: {
    backgroundColor: '#ffeeee',
  },
  deleteText: {
    color: '#d32f2f',
  },
});