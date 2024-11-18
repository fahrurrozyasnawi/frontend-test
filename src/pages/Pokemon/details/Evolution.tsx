import { Box, Stack } from "@mui/material";

type Props = {
  data: any;
};

function Evolution(props: Props) {
  const { data } = props;
  return (
    <Box>
      <Stack justifyContent="center" direction="row" gap={1} flexWrap="wrap">
        {data?.map((item: string) => (
          <Box component="img" sx={{ width: 140 }} src={item} key={item} />
        ))}
      </Stack>
    </Box>
  );
}

export default Evolution;
