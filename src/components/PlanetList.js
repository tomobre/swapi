import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Button = styled(Link)`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  text-decoration: none;
  @media (max-width: 768px) {
    font-size: 0.7em;
    margin: 0.5em;
    padding: 0.25em 0.5em;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 2rem;

  @media (max-width: 768px) {
    margin: 1rem;
  }
`;
export const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;
const Input = styled.input`
  font-size: 15px;
  border: none;
  box-shadow: inset 0 -1px 0 rgba(#000, 0.3);
  color: #000;
  padding: 0.5rem 0.4rem;
  margin: 0rem 1rem;
  @media (max-width: 768px) {
    font-size: 0.7em;
    margin: 0.5em;
    padding: 0.25em 0.5em;
  }
`;
const SearchButton = styled.button`
  color: green;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid green;
  border-radius: 3px;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 0.7em;
    margin: 0.5em;
    padding: 0.25em 0.5em;
  }
`;
export const Headers = styled.th`
  padding: 1rem;
  font-size: 15px;
  margin: 1rem;
  background-color: #cecccc;
  @media (max-width: 768px) {
    font-size: 10px;
    padding: 0.5rem 0.2rem;
  }
`;
export const TData = styled.td`
  padding: 1rem;
  font-size: 13px;
  margin: 1rem;
  background-color: #f4f4f4;

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 0.5rem 0.2rem;
  }
`;

function PlanetList({ planets, setPlanets }) {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState(false);
  const [visible, setVisible] = React.useState({ beg: 0, end: 10 });

  const handleSearch = () => {
    setFilter(!filter);
  };

  const handleEnter = (e) => {
    if (e.code === "Enter" && filter === false) {
      handleSearch();
    }
  };

  const loadMore = () => {
    setVisible({ beg: visible.beg + 10, end: visible.end + 10 });
  };

  const loadBack = () => {
    setVisible({ beg: visible.beg - 10, end: visible.end - 10 });
  };

  return (
    <Wrapper>
      <TopWrapper>
        <div>
          {" "}
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyPress={(e) => {
              handleEnter(e);
            }}
            type="text"
            placeholder="Buscar por nombre..."
          />
          <SearchButton onClick={() => handleSearch()}>
            {filter ? "Volver" : "Buscar"}
          </SearchButton>
        </div>

        <Button to="/favoritos">Ver favoritos</Button>
      </TopWrapper>

      <table>
        <tbody>
          <tr>
            <Headers>Nombre</Headers>
            <Headers>Diametro</Headers>
            <Headers> Clima</Headers>
            <Headers> Terreno</Headers>
            <Headers>Favorito</Headers>
          </tr>
          {planets
            .filter((planet) => {
              if (filter) {
                let planetName = planet.name.slice(0, 3).toLowerCase();
                let searching = search.slice(0, 3).toLowerCase();
                return planetName === searching;
              } else {
                return planet;
              }
            })
            .slice(visible.beg, visible.end)
            .map((planet, index) => {
              let finalClimate = "",
                finalTerrain = "";

              planet.climates.forEach((climate, index) => {
                finalClimate += ` ${index === 0 ? "" : "/"} ${climate}`;
              });
              planet.terrains.forEach((terrain, index) => {
                finalTerrain += ` ${index === 0 ? "" : "/"} ${terrain}`;
              });
              let html = (
                <tr key={planet.id}>
                  <TData>{planet.name}</TData>
                  <TData>{planet.diameter}</TData>

                  <TData>{finalClimate}</TData>
                  <TData>{finalTerrain}</TData>
                  <TData>
                    {" "}
                    <input
                      type="checkbox"
                      checked={planet.favourite}
                      onChange={(e) => {
                        let newArr = [...planets];
                        newArr[index + visible.beg].favourite =
                          e.target.checked;

                        setPlanets(newArr);
                      }}
                    />
                  </TData>
                </tr>
              );

              return html;
            })}
        </tbody>
      </table>
      {filter === false && (
        <TopWrapper>
          {visible.beg > 0 && (
            <div>
              <img
                alt="previous"
                src="https://icongr.am/jam/chevrons-circle-left-f.svg?size=30&color=699dfb"
                onClick={loadBack}
              ></img>
            </div>
          )}
          {visible.end < planets.length && (
            <div>
              <img
                alt="next"
                src="https://icongr.am/jam/chevrons-circle-right-f.svg?size=30&color=699dfb"
                onClick={loadMore}
              ></img>
            </div>
          )}
        </TopWrapper>
      )}
    </Wrapper>
  );
}

export default PlanetList;
