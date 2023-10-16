import { useEffect, useState } from 'react'

// @mui
import { Typography, Stack, Button } from '@mui/material';

// Components
import Iconify from '../components/iconify';

// @ts-ignore
import { useUserContext } from '../context/UserContext.tsx';

export default function Home() {
  const { setPage } = useUserContext()

  const [grossIncome, setGrossIncome] = useState(0)

  // Whenever page loads, run first mount operations
  useEffect(() => {
    setPage("Home")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Stack marginTop={"35px"} alignItems={"center"} gap={2} minWidth={"540px"} marginX={"55px"}>
        <Stack gap={0.5} alignItems={"center"}>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Typography variant='h5'>Your credit limit is
              {(grossIncome < 100000 && " $1,000") || (grossIncome < 200000 && " $2,000") || (grossIncome < 300000 && " $3,000") || " $5,000"}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} minWidth={"350px"} height={"36px"}>
          <Typography>Verify your onchain credit</Typography>
          <Iconify height={28} width={28} color={"green"} marginRight={"8px"} icon="material-symbols:check" />
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} minWidth={"350px"} height={"36px"}>
          <Typography>Upload bank statement</Typography>
          <Iconify height={28} width={28} color={"green"} marginRight={"8px"} icon="material-symbols:check" />
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} minWidth={"350px"} height={"36px"}>
          <Typography>Stake collederal assets</Typography>
          <Iconify height={28} width={28} color={"green"} marginRight={"8px"} icon="material-symbols:check" />
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} minWidth={"350px"} height={"36px"}>
          <Typography>Verify yearly gross income</Typography>
          {grossIncome === 0 &&
            <Button variant="text" onClick={() => { setGrossIncome(250000) }}>Verify</Button>
          }
          {grossIncome > 0 &&
            <Iconify height={28} width={28} color={"green"} marginRight={"8px"} icon="material-symbols:check" />
          }
        </Stack>
      </Stack >
    </>
  );
}
