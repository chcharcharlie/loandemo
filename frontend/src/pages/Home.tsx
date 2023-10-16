import { useEffect } from 'react'

// @mui
import { Typography, Stack } from '@mui/material';

// Components
import Iconify from '../components/iconify';

// @ts-ignore
import { useUserContext } from '../context/UserContext.tsx';

export default function Home() {
  const { setPage } = useUserContext()

  // Whenever page loads, run first mount operations
  useEffect(() => {
    setPage("Home")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Stack marginTop={"35px"} alignItems={"center"} gap={2} minWidth={"540px"} marginX={"15px"}>
        <Stack gap={0.5} alignItems={"center"}>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Iconify height={28} width={28} icon="mdi:dollar" />
            <Typography variant='h5'>Your credit limit is $1,000</Typography>
          </Stack>
        </Stack>
      </Stack >
    </>
  );
}
