import React, { useState, useEffect } from "react";
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
  const [temperature, setTemperature] = useState(null);

  const handleSearch = async () => {
    if (playerName === "") {
      return;
    }

    try {
      const response = await axios.get(
        `https://apiv3.apifootball.com/?action=get_players&player_name=${playerName}&APIkey=29c97ffc0ddec5b39553514e05e2a4330b3f6c8813be8af44ec7fdd989bf205a`
      );

      setPlayers(response.data);
      setError(null);
    } catch (error) {
      console.error("Erro ao buscar jogadores:", error);
      setError("Erro ao buscar jogadores. Tente novamente mais tarde.");
    }
  };

  const navigation = useNavigation();

  const uniquePlayers = players.filter(
    (player, index, self) =>
      index === self.findIndex((p) => p.player_key === player.player_key)
  );

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await axios.get(
          "https://api.thingspeak.com/channels/SEU_NUMERO_DE_CANAL/fields/1/last.json"
        );

        setTemperature(response.data.field1);
      } catch (error) {
        console.error("Erro ao buscar temperatura:", error);
      }
    };

    fetchTemperature();
    const intervalo = setInterval(fetchTemperature, 60000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgb(37 99 235)",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", gap: 3 }}>
        <Text style={{ color: "#FFF" }}>Temperatura:</Text>
        <Text style={{ color: "yellow", fontSize: 16, fontWeight: "600" }}>
          {temperature !== null ? temperature.toFixed(2) : "Carregando"}
        </Text>
      </View>
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
          flexDirection: "row",
          gap: 10,
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
                playerImage={
                  typeof player.player_image === "string"
                    ? player.player_image
                    : "https://louisville.edu/enrollmentmanagement/images/person-icon/image"
                }
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
