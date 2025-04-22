import React, { useState, useEffect, useCallback } from "react";
import { FlatList, TextInput, Text, View, Image, Pressable, ActivityIndicator, Modal, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useBookmarks } from "../../../hooks/useBookmarks"; 
import { Tipo, Status } from "../../../types/enums";
import styles from "./bookmarks.styles";
import Header from "@/src/components/Header";
import { useFocusEffect } from "@react-navigation/native";

export function BookmarksScreen() {
  const [filteredBookmarks, setFilteredBookmarks] = useState<any[]>([]);
  const [searchText, setSearchText] = useState(""); 
  const [selectedType, setSelectedType] = useState<string | null>("Todos");
  const [selectedStatus, setSelectedStatus] = useState<string | null>("Todos");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const router = useRouter();
  const tipos = Object.values(Tipo);
  const status = Object.values(Status);

  const { data: bookmarks, isLoading, isError, refetch } = useBookmarks();


  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

 
  useEffect(() => {
    if (bookmarks) {
      let filtered = bookmarks;

      if (searchText.trim() !== "") {
        filtered = filtered.filter((bookmark) => {
          const titulo = bookmark.obra?.titulo || "";  
          return titulo.toLowerCase().includes(searchText.toLowerCase());
        });
      }

      if (selectedType && selectedType !== "Todos") {
        filtered = filtered.filter((bookmark) => bookmark.obra?.tipo === selectedType);
      }

      if (selectedStatus && selectedStatus !== "Todos") {
        filtered = filtered.filter((bookmark) => bookmark.status === selectedStatus);
      }

      setFilteredBookmarks(filtered);
    }
  }, [searchText, bookmarks, selectedType, selectedStatus]);

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const renderBookmark = ({ item }: { item: any }) => {
    const title = item.obra?.titulo || "Título não disponível";
    const rawImage = item.obra?.imagem?.trim() || null;
  
    const normalizeBase64 = (image: string | null) => {
      if (!image) return null;
      if (image.startsWith("data:image") || image.startsWith("http")) return image;
      return `data:image/jpeg;base64,${image}`;
    };
  
    const normalizedImage = normalizeBase64(rawImage);
  
    const imageSource = normalizedImage
      ? { uri: normalizedImage }
      : require("@/assets/images/logo.png"); 
  
    return (
      <Pressable
        style={styles.bookmarkItem}
        onPress={() => router.push(`/detalhesbookmark/${item.id}`)}
      >
        <Image
          source={imageSource}
          style={styles.imagem}
          onError={() => console.warn("❌ Erro ao carregar imagem:", normalizedImage)}
        />
        <View style={styles.textoContainer}>
          <Text style={styles.titulo}>{title}</Text>
          <Text style={styles.progresso}>
            Status: {capitalizeFirstLetter(item.status)}
          </Text>
          <Text style={styles.progresso}>
            Progresso: {item.progresso ? `${item.progresso}` : "Não iniciado"}
          </Text>
        </View>
      </Pressable>
    );
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#6200ee" />;
  }

  if (isError) {
    return <Text>Erro ao carregar os bookmarks.</Text>;
  }

  return (
    <View style={styles.container}>
      <Header/>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar bookmark..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText} 
        />
        <TouchableOpacity onPress={() => setShowAdvancedSearch(true)} style={styles.advancedSearchIcon}>
          <Ionicons name="options" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showAdvancedSearch}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAdvancedSearch(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowAdvancedSearch(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Filtros de Pesquisa</Text>

                <Text style={styles.modalSubTitle}>Status</Text>
                <FlatList
                  data={["Todos", ...status]}  
                  horizontal
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        setSelectedStatus(item);
                        setShowAdvancedSearch(false);
                      }}
                      style={[styles.typeItem, selectedStatus === item && styles.selectedTypeItem]}
                    >
                      <Text style={styles.typeText}>{capitalizeFirstLetter(item)}</Text>
                    </Pressable>
                  )}
                  keyExtractor={(item) => item}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <FlatList
        data={["Todos", ...tipos]} 
        horizontal
        style={styles.typeList}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setSelectedType(item)}
            style={[styles.typeItem, selectedType === item && styles.selectedTypeItem]}
          >
            <Text style={styles.typeText}>{capitalizeFirstLetter(item)}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
      />

      <FlatList
        style={styles.margemFlatlist}
        data={filteredBookmarks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBookmark}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum bookmark encontrado</Text>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
