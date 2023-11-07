import React from "react";
import { View, Text } from "react-native";
import Player from "../components/Player";

export default function Favoritos({ route }) {
  const { favoritePlayers } = route.params;

  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        backgroundColor: "rgb(37 99 235)",
        paddingTop: 30
      }}
    >
      <View
        style={{
          width: "80%",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
          flexDirection: 'row',
          gap: 20
        }}
      >
        {favoritePlayers && favoritePlayers.length > 0 ? (
          favoritePlayers.map((player) => (
            <Player
              key={player.player_key}
              playerAge={player.player_age}
              playerImage={player.player_image}
              playerName={player.player_name}
              playerTime={player.player_team}
            />
          ))
        ) : (
          <Text style={{ color: "white", fontSize: 16 }}>
            Nenhum jogador favorito encontrado.
          </Text>
        )}
      </View>
    </View>
  );
}
