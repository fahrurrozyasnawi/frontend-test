import { Chip, Stack } from "@mui/material";

type Props = {
  data: any;
};

const Moves = (props: Props) => {
  const { data } = props;
  return (
    <Stack direction="row" gap={2} flexWrap="wrap">
      {data?.map((item: any, index: number) => (
        <Chip label={item.move?.name} key={index} />
      ))}
    </Stack>
  );
};

export default Moves;
