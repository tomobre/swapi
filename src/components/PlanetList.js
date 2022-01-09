import React from "react";
import styled from "styled-components";

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 2rem;
`;
const TopWrapper = styled.div`
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
`;
const Headers = styled.th`
  padding: 1rem;
  font-size: 15px;
  margin: 1rem;
  background-color: #cecccc;
`;
const TData = styled.td`
  padding: 1rem;
  font-size: 13px;
  margin: 1rem;
  background-color: #f4f4f4;
`;

function PlanetList({ planets, setPlanets }) {
  const [favourites, setFavourites] = React.useState(false);

  return (
    <Wrapper>
      <TopWrapper>
        {" "}
        <Input type="text" placeholder="Buscar por nombre..." />
        {favourites ? (
          <Button
            onClick={() => {
              setFavourites(false);
            }}
          >
            Volver
          </Button>
        ) : (
          <Button
            onClick={() => {
              setFavourites(true);
            }}
          >
            Ver favoritos
          </Button>
        )}
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
          {planets.map((planet, index) => {
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
                      newArr[index].favourite = e.target.checked;
                      setPlanets(newArr);
                    }}
                  />
                </TData>
              </tr>
            );

            if (favourites) {
              return planet.favourite && html;
            } else {
              return html;
            }
          })}
        </tbody>
      </table>
    </Wrapper>
  );
}

export default PlanetList;
