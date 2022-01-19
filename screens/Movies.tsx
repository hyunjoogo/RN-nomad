import React from "react";
import styled from "styled-components/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import Swiper from "react-native-web-swiper";
import {Dimensions} from "react-native";

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.mainBgColor};
`;

const ViewContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: blue;
`;
const Title = styled.Text`
`;

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => (
  <Container>
    <Swiper loop={true} containerStyle={{width: "100%", height: SCREEN_HEIGHT / 4}}>
      <ViewContainer style={{backgroundColor: "red"}}>
        <Title>
          slide1
        </Title>
      </ViewContainer>
      <ViewContainer style={{backgroundColor: "blue"}}>
        <Title>
          slide2
        </Title>
      </ViewContainer>
      <ViewContainer style={{backgroundColor: "red"}}>
        <Title>
          slide3
        </Title>
      </ViewContainer>
    </Swiper>
  </Container>
)

export default Movies;
