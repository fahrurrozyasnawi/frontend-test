import { Box, Table, TableCell, TableRow } from "@mui/material";

type Props = {
  data: AboutData;
};

type AboutData = {
  species: string;
  height: number;
  weight: number;
  abilities: string[];
};

const About = (props: Props) => {
  const { data } = props;
  console.log("data about", data);
  return (
    <Box>
      <Table>
        <TableRow>
          <TableCell>Species</TableCell>
          <TableCell sx={{ textTransform: "capitalize" }}>
            {data.species}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Height</TableCell>
          <TableCell>{data.height}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Weight</TableCell>
          <TableCell>{data.weight}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Abilities</TableCell>
          <TableCell>{data.abilities.join(",")}</TableCell>
        </TableRow>
      </Table>
    </Box>
  );
};

export default About;
