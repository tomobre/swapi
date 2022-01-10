import PlanetList from "./components/PlanetList";
import Favourites from "./components/Favourites";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";

const PLANETS = gql`
  query Planets {
    allPlanets {
      planets {
        name
        diameter
        climates
        terrains
      }
    }
  }
`;

const WrapperStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin: 2rem;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin: 2rem;
`;

function App() {
  const [planets, setPlanets] = React.useState([]);
  const { data, loading, error } = useQuery(PLANETS, {
    onCompleted: () => {
      let result = data.allPlanets.planets.map((char) => {
        return Object.assign(char, { favourite: false });
      });

      setPlanets(result);
    },
  });

  if (loading) {
    return (
      <div>
        <Title>SWAPI</Title>
        <WrapperStatus>Cargando...</WrapperStatus>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Title>SWAPI</Title>
        <WrapperStatus>
          Upss...hubo un error! Vuelva a intentarlo mas tarde.
        </WrapperStatus>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Title>SWAPI</Title>
      <Routes>
        <Route
          path="/"
          element={<PlanetList setPlanets={setPlanets} planets={planets} />}
        ></Route>
        <Route
          path="/favoritos"
          element={<Favourites setPlanets={setPlanets} planets={planets} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
