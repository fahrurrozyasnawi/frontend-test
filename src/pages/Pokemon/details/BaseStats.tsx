import { Box, LinearProgress, Table, TableCell, TableRow } from "@mui/material";

type Props = {
  data: BaseStatsData;
};

type BaseStatsData = {
  hp: number;
  attack: number;
  defence: number;
  spAttack: number;
  spDefence: number;
  speed: number;
};

const BaseStats = (props: Props) => {
  const { data } = props;
  return (
    <Box>
      <Table>
        <TableRow>
          <TableCell>HP</TableCell>
          <TableCell>{data.hp}</TableCell>
          <TableCell width={100}>
            <LinearProgress
              variant="determinate"
              value={data.hp}
              color="success"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Attack</TableCell>
          <TableCell>{data.attack}</TableCell>
          <TableCell width={100}>
            <LinearProgress
              variant="determinate"
              value={data.attack}
              color="error"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Defence</TableCell>
          <TableCell>{data.defence}</TableCell>
          <TableCell width={100}>
            <LinearProgress
              variant="determinate"
              value={data.defence}
              color="primary"
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sp Attack</TableCell>
          <TableCell>{data.spAttack}</TableCell>
          <TableCell width={100}>
            <LinearProgress
              variant="determinate"
              color="error"
              value={data.spAttack}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sp Defence</TableCell>
          <TableCell>{data.spDefence}</TableCell>
          <TableCell width={100}>
            <LinearProgress
              variant="determinate"
              color="primary"
              value={data.spDefence}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Speed</TableCell>
          <TableCell>{data.speed}</TableCell>
          <TableCell width={100}>
            <LinearProgress
              variant="determinate"
              value={data.speed}
              color="warning"
            />
          </TableCell>
        </TableRow>
      </Table>
    </Box>
  );
};

export default BaseStats;
