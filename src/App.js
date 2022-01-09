import "./App.css";
import PlanetList from "./components/PlanetList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";

/* const PLANETS = gql`
  query Planets {
    allPlanets {
      totalCount
    }
  }
`; */

const PLANETS = gql`
  {
    characters {
      results {
        id
        name
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

function App() {
  const [planets, setPlanets] = React.useState([]);
  const { data, loading, error } = useQuery(PLANETS, {
    onCompleted: () => {
      let result = data.characters.results.map((char) => {
        return Object.assign(char, { favourite: false });
      });

      setPlanets(result);
    },
  });

  if (loading) {
    return <WrapperStatus>Cargando...</WrapperStatus>;
  }

  if (error) {
    return (
      <WrapperStatus>
        Upss...hubo un error! Vuelva a intentarlo mas tarde.
      </WrapperStatus>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PlanetList setPlanets={setPlanets} planets={planets} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
