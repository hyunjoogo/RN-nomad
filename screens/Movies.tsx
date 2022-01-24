import React, {useEffect, useState} from "react";
import styled from "styled-components/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import {ActivityIndicator, Dimensions} from "react-native";
import Slide from "../components/Slide";

const API_KEY = "34de53bc7d6248a1820c343b0e69d157";

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {

  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
    const {results} = await response.json();
    setTrending(results);
  }
  const getUpcoming = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`);
    const {results} = await response.json();
    setUpcoming(results);
  }
  const getNowPlaying = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`);
    const {results} = await response.json();
    setNowPlaying(results);
  }

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()])
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [])


  return loading ? (
    <Loader>
      <ActivityIndicator/>
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={true}
        paginationStyle={{bottom: 5}}
        containerStyle={{width: "100%", height: SCREEN_HEIGHT / 4}}
      >
        {nowPlaying.map((movie) => <Slide
          key={movie.id}
          backdropPath={movie.backdrop_path}
          posterPath={movie.poster_path}
          originalTitle={movie.title}
          voteAverage={movie.vote_average}
          overview={movie.overview}
        />)}
      </Swiper>
    </Container>
  );
}

export default Movies;
