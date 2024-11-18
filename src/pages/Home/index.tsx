import PokemonCard from "@components/Card/PokemonCard";
import { Box, Button, Grid2, Typography } from "@mui/material";
import PokemonDetail from "@pages/Pokemon";
import { useEffect, useState } from "react";

type ResponseResult = {
  name: string;
  url: string;
};

type DetailResponseResult = {
  id: number;
  name: string;
  types: string[];
  img: string;
  species: string;
};

interface State {
  open: boolean;
  id: number;
  color: string;
}

const Home = () => {
  const [pokedex, setPokedex] = useState<any>([]);
  const [indexPage, setIndexPage] = useState(1);
  const [showDetail, setShowDetail] = useState({
    open: false,
    id: 0,
    color: "inherit",
  });

  const handleClose = () => {
    setShowDetail({ open: false, id: 0, color: "inherit" });
  };

  const handleOpenDetail = (state: State) => {
    setShowDetail((prev) => ({ ...prev, ...state }));
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const offset: number = 10 * (indexPage - 1);
        const url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        const results: ResponseResult[] = json.results;
        const listDetails = await Promise.all(
          results.map(async (item) => {
            const resp = await fetch(item.url);
            const result: any = await resp.json();

            let img = result.sprites.other;
            img = img["official-artwork"]["front_default"];
            return {
              id: result.id,
              name: result.name,
              types: result.types?.map((t: any) => t.type.name),
              img: img,
              species: result.species.name,
            };
          })
        );

        if (indexPage > 1) {
          setPokedex((prev: any) => [...prev, ...listDetails]);
        } else {
          setPokedex(listDetails);
        }
      } catch (error) {
        console.log("error fetch data", error);
      }
    };

    fetchData();
  }, [indexPage]);

  return (
    <>
      <Typography gutterBottom variant="h3">
        Pokedex
      </Typography>

      <Grid2 container spacing={1}>
        {pokedex.map((item: DetailResponseResult, index: number) => (
          <Grid2 key={index} size={{ xs: 6, md: 4 }}>
            <PokemonCard data={item} onDetail={handleOpenDetail} />
          </Grid2>
        ))}
      </Grid2>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 2,
        }}
      >
        <Button
          sx={{ textTransform: "capitalize" }}
          onClick={() => setIndexPage((prev) => prev + 1)}
          variant="contained"
          size="small"
        >
          Show More
        </Button>
      </Box>

      {showDetail.open && (
        <PokemonDetail
          open={showDetail.open}
          id={showDetail.id}
          color={showDetail.color}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default Home;
