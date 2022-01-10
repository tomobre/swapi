import React from "react";
import { TData, Headers, TopWrapper, Wrapper, Button } from "./PlanetList";

function PlanetList({ planets, setPlanets }) {
  return (
    <Wrapper>
      <TopWrapper>
        <Button to="/">Volver</Button>
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

            return planet.favourite && html;
          })}
        </tbody>
      </table>
    </Wrapper>
  );
}

export default PlanetList;
