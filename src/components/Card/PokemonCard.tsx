import { Box, Card, Chip, Skeleton, Stack, Typography } from "@mui/material";
import { useColor } from "color-thief-react";

type data = {
  id: number;
  name: string;
  types: string[];
  img: string;
  species?: string;
};

// type SetState = React.Dispatch<React.SetStateAction<State>>;

interface State {
  open: boolean;
  id: number;
  color: string;
}

type Props = {
  data: data;
  onDetail: (state: State) => void;
};

const PokemonCard = (props: Props) => {
  const { data, onDetail } = props;
  const { data: color, loading } = useColor(data.img, "hex", {
    crossOrigin: "anonymous",
  });

  const _state = {
    open: true,
    id: data.id,
    color: color ?? "inherit",
  };

  return loading ? (
    <Skeleton sx={{ height: { xs: 120, md: 220 } }} />
  ) : (
    <>
      <Card
        onClick={() => onDetail(_state)}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
          position: "relative",
          p: { xs: 1, md: 2.5 },
          display: "flex",
          height: { xs: 120, md: 220 },
          bgcolor: color,
        }}
      >
        <Box
          component="img"
          sx={{
            position: "absolute",
            zIndex: 0,
            height: { xs: 120, md: 240 },
            transform: "rotate(25deg)",
            top: { xs: 60, md: 120 },
            right: 10,
            filter: "invert(95%)",
          }}
          src="/pokeball.png"
        />

        <Box sx={{ flexGrow: 1, position: "relative" }} component="div">
          <Typography
            sx={{ color: "white" }}
            textTransform="capitalize"
            gutterBottom
            variant="h5"
          >
            {data.name}
          </Typography>

          <Stack gap={1}>
            {data.types.map((type) => (
              <Chip
                sx={{
                  color: "#fff",
                  textTransform: "capitalize",
                }}
                size="small"
                label={type}
                key={type}
              />
            ))}
          </Stack>
        </Box>

        <Box component="div" sx={{ width: { xs: 120, md: 330 } }}>
          <Box
            component="img"
            sx={{
              position: "relative",
              right: "-8px",
              top: { xs: "20px", md: "70px" },
              width: "100%",
            }}
            src={data.img}
          />
        </Box>
      </Card>
    </>
  );
};

export default PokemonCard;
