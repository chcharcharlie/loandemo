import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

// @mui
import { Typography, Stack, Button } from '@mui/material';

// Components
import Iconify from '../components/iconify';

// @ts-ignore
import { useUserContext } from '../context/UserContext.tsx';

import * as apis from "../utils/apirequests"

export default function Home() {
  const { setPage } = useUserContext()

  const [grossIncome, setGrossIncome] = useState(0)
  const [queryid, setQueryid] = useState(null)

  const triggerQuery = async function () {
    const query = uuidv4()
    setQueryid(query)
    window.open(`${process.env.REACT_APP_JOMO_URL}/prove?flowid=108&publicaccountid=${query}`, '_blank');
    listenToQuery(query)
  }

  const listenToQuery = async function (query) {
    const results = await apis.postUrl(`/api/verify/verifications`, {
      "public_account_id": query,
      "api_key": "demolenderapi"
    })
    if (!results || results.length === 0) {
      setTimeout(() => { listenToQuery(query) }, 3000)
    } else {
      for (const result of results) {
        if (result.flow_id !== "108") continue
        console.log(parseInt(result.lower_bounds[3]))
        setGrossIncome(parseInt(result.lower_bounds[3]))
        setQueryid(null)
        break
      }
    }
  }

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
          {grossIncome === 0 && !queryid &&
            <Button variant="text" onClick={() => { triggerQuery() }}>Verify</Button>
          }
          {grossIncome === 0 && queryid &&
            <Iconify height={28} width={28} marginRight={"8px"} icon="line-md:loading-loop" />
          }
          {grossIncome > 0 &&
            <Iconify height={28} width={28} color={"green"} marginRight={"8px"} icon="material-symbols:check" />
          }
        </Stack>
      </Stack >
    </>
  );
}
