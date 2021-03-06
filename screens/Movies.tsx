import React, {useEffect, useState} from "react";
import styled from "styled-components/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import {ActivityIndicator, Dimensions} from "react-native";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

const API_KEY = "34de53bc7d6248a1820c343b0e69d157";

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

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
        containerStyle={{marginBottom: 30, width: "100%", height: SCREEN_HEIGHT / 4}}
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
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScroll
        contentContainerStyle={{ paddingLeft: 30 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {trending.map((movie) => {
          return (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 13)}
                {movie.original_title.length > 13 ? "..." : null}
              </Title>
              <Votes>?????? {movie.vote_average}/10</Votes>
            </Movie>
          )
        })}
      </TrendingScroll>
    </Container>
  );
}

export default Movies;
