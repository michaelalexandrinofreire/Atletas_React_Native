import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Player from "../components/Player";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);
  const [favoritePlayers, setFavoritePlayers] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (playerName === "") {
      return;
    }

    try {
      const response = await axios.get(
        `https://apiv3.apifootball.com/?action=get_players&player_name=${playerName}&APIkey=89216a0f2caa92bc7cfe9a4de79cecbc35feab2955d4f6b88478715113426cc3`
      );

      setPlayers(response.data);
      setError(null);
    } catch (error) {
      console.error("Erro ao buscar jogadores:", error);
      setError("Erro ao buscar jogadores. Tente novamente mais tarde.");
    }
  };

  const navigation = useNavigation();

  const uniquePlayers = players.filter((player, index, self) =>
    index === self.findIndex((p) => p.player_key === player.player_key)
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgb(37 99 235)",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TextInput
          style={{
            width: "70%",
            height: 40,
            backgroundColor: "white",
            marginTop: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}
          value={playerName}
          onChangeText={setPlayerName}
          placeholder="Nome do jogador"
        />
        <TouchableOpacity
          style={{
            backgroundColor: "rgb(234 179 8)",
            width: 45,
            height: 40,
            marginTop: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
          onPress={handleSearch}
        >
          <FontAwesome name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Favoritos", { favoritePlayers });
        }}
        style={{
          backgroundColor: "rgb(234 179 8)",
          height: 38,
          paddingHorizontal: 10,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
          flexDirection: 'row',
          gap: 10
        }}
      >
        <AntDesign name="star" size={20} color="white" />
        <Text
          style={{
            color: "white",
            fontSize: 14,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Ir para Favoritos
        </Text>
      </TouchableOpacity>
      {error ? (
        <Text style={{ color: "rgb(220 38 38)", textAlign: "center" }}>
          {error}
        </Text>
      ) : (
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "82%",
            alignItems: "center",
            gap: 25,
          }}
        >
          {Array.isArray(uniquePlayers) ? (
            uniquePlayers.map((player, index) => (
              <Player
                key={player.player_key}
                playerAge={player.player_age}
                onFavoriteToggle={(isFavorite) => {
                  if (isFavorite) {
                    setFavoritePlayers((prevFavorites) => [
                      ...prevFavorites,
                      player,
                    ]);
                  } else {
                    setFavoritePlayers((prevFavorites) =>
                      prevFavorites.filter(
                        (favPlayer) =>
                          favPlayer.player_key !== player.player_key
                      )
                    );
                  }
                }}
                playerImage={typeof player.player_image === 'string' ? player.player_image : 'https://louisville.edu/enrollmentmanagement/images/person-icon/image'}
                playerName={player.player_name}
                playerTime={player.player_team}
              />
            ))
          ) : (
            <Text style={{ color: "red", textAlign: "center" }}>
              Nenhum jogador encontrado.
            </Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
