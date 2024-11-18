import {
  Box,
  Chip,
  Dialog,
  Slide,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import {
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import About from "./details/About";
import BaseStats from "./details/BaseStats";
import Moves from "./details/Moves";
import Evolution from "./details/Evolution";

type Props = {
  id: number;
  open: boolean;
  color: string;
  onClose: () => void;
};

type BaseInfo = {
  id: number;
  name: string;
  img: string;
  types: string[];
};

type About = {
  species: string;
  height: number;
  weight: number;
  abilities: string[];
};

type Stats = {
  hp: number;
  attack: number;
  defence: number;
  spAttack: number;
  spDefence: number;
  speed: number;
};

type DetailData = {
  baseInfo: BaseInfo;
  about: About;
  stats: Stats;
  forms: any;
  moves: any;
};

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<unknown>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PokemonDetail = (props: Props) => {
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const { open, id, color, onClose } = props;

  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [detailValue, setDetailValue] = useState<any>({});

  const handleChange = async (
    event: SyntheticEvent,
    newValue: number
  ): Promise<void> => {
    setValue(newValue);
  };

  useEffect(() => {
    setLoading(true);
    async function fetchDetail(): Promise<any> {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();

      let img = result.sprites.other;
      img = img["official-artwork"]["front_default"];

      const baseInfo = {
        id: result.id,
        name: result.name,
        img: img,
        types: result.types?.map((t: any) => t.type.name),
      };

      const about = {
        species: result.species.name,
        height: result.height,
        weight: result.weight,
        abilities: result.abilities.map((ab: any) => ab.ability.name),
      };

      let stats = result.stats;
      stats = {
        hp: stats[0].base_stat,
        attack: stats[1].base_stat,
        defence: stats[2].base_stat,
        spAttack: stats[3].base_stat,
        spDefence: stats[4].base_stat,
        speed: stats[5].base_stat,
      };
      let sprites = result.sprites?.other?.showdown;
      sprites = Object.values(sprites).filter((val) => val !== null);
      const moves = result.moves;

      const data = {
        baseInfo,
        about,
        stats,
        sprites,
        moves,
      };

      console.log("detail value", data);
      setDetailValue(data);
      setLoading(false);
    }

    fetchDetail();
  }, []);

  // console.log(detailValue);
  if (!loading) {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={mobileView}
        sx={{ pt: 3, pb: 4 }}
        TransitionComponent={Transition}
      >
        <Stack
          sx={{
            color: "white",
            bgcolor: color,
            pt: 4,
            height: 350,
            position: "relative",
          }}
          px={1.5}
          direction="row"
          justifyContent="space-between"
        >
          <Box>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              textTransform="capitalize"
            >
              {detailValue?.baseInfo.name}
            </Typography>
            <Stack direction="row">
              {detailValue?.baseInfo.types?.map((type: string) => (
                <Chip
                  sx={{ color: "white", textTransform: "capitalize" }}
                  size="small"
                  key={type}
                  label={type}
                />
              ))}
            </Stack>
          </Box>

          <Typography>{id}</Typography>

          <Box
            component="img"
            sx={{
              position: "absolute",
              zIndex: 0,
              height: 320,
              bottom: -210,
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            src={detailValue?.baseInfo.img}
          />
        </Stack>

        <Box
          sx={{
            width: "100%",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            pt: 5,
          }}
        >
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="About" {...a11yProps(0)} />
              <Tab label="Base Stats" {...a11yProps(1)} />
              <Tab label="SPrites" {...a11yProps(2)} />
              <Tab label="Moves" {...a11yProps(3)} />
            </Tabs>
          </Box>

          <Box
            sx={{
              height: { xs: 340, md: 400 },
              maxWidth: { xs: "auto", md: 400 },
              overflow: "auto",
            }}
          >
            <CustomTabPanel value={value} index={0}>
              <About data={detailValue?.about} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <BaseStats data={detailValue?.stats} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Evolution data={detailValue?.sprites} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <Moves data={detailValue?.moves} />
            </CustomTabPanel>
          </Box>
        </Box>
      </Dialog>
    );
  }
};

export default PokemonDetail;
