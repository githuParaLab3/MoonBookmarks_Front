import React, { useState } from "react";
import { ThemedView } from "@/src/components/ThemedView";
import Header from "@/src/components/Header";
import BookmarksRenderScreen from "@/src/components/bookmarksrender";
export function BookmarksScreen() {

  return (
    <ThemedView style={{ flex: 1, padding: 20 }}>
      <Header />
      <BookmarksRenderScreen/>
    </ThemedView>
  );
}
