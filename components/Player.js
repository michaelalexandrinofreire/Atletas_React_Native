import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Player({
  playerImage,
  playerName,
  playerAge,
  playerTime,
  onFavoriteToggle,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavoriteToggle({ playerName, playerAge, playerTime, isFavorite });
  };

  return (
    <View
      style={{
        width: 150,
        backgroundColor: "rgb(234 179 8)",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        height: 200,
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={{
            uri:
              typeof playerImage === "string" && playerImage !== ""
                ? playerImage
                : "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg",
          }}
          style={{ width: 128, height: 128, borderRadius: 64 }}
        />

        <TouchableOpacity
          style={{
            position: "absolute",
            backgroundColor: "rgb(21 128 61)",
            padding: 5,
            borderRadius: 100,
            bottom: 5,
            right: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={toggleFavorite}
        >
          <MaterialIcons
            name={isFavorite ? "star" : "star-border"}
            size={20}
            color={isFavorite ? "rgb(234 179 8)" : "white"}
          />
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
        <Text style={{ textAlign: "center" }}>
          <Text style={{ color: "rgb(37 99 235)", fontWeight: "800" }}>
            {playerName}
          </Text>
        </Text>
        <Text style={{ textAlign: "center" }}>
          <Text style={{ color: "rgb(37 99 235)", fontWeight: "800" }}>
            {playerAge}
          </Text>
        </Text>
        <Text style={{ textAlign: "center" }}>
          <Text style={{ color: "rgb(37 99 235)", fontWeight: "800" }}>
            {playerTime}
          </Text>
        </Text>
      </View>
    </View>
  );
}
