import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import React, { useEffect } from "react";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const {
    data: movies,
    loading,
    error,
    refetch: refetchMovies,
    reset,
  } = useFetch(
    () =>
      fetchMovies({
        query: searchQuery,
      }),
    false
  );

  useEffect(() => {
    const loadMovies = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetchMovies();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(loadMovies);
  }, [searchQuery]);

  useEffect(() => {
    if (movies && movies.length > 0) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        className="mx-5"
        ListHeaderComponent={
          <>
            <View className="flex-row w-full justify-center mt-20">
              <Image source={icons.logo} className="w-12 h-10 mb-5" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text) => handleSearch(text)}
              />

              {loading && (
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  className="mt-10 self-center"
                />
              )}
              {error && (
                <Text className="text-red-500 px-5 my-3">
                  Error: {error?.message}
                </Text>
              )}
              {!loading &&
                !error &&
                searchQuery.trim() &&
                (movies ?? []).length > 0 && (
                  <Text className="text-white text-xl font-bold mt-5">
                    Search results for{" "}
                    <Text className="text-accent">{searchQuery}</Text>
                  </Text>
                )}
            </View>
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-gray-500 text-center">
                {searchQuery.trim()
                  ? `No movies found for "${searchQuery}"`
                  : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
