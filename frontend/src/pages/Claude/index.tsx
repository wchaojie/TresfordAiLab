import { Box, Button, Container, Grid, Stack, Typography, } from "@mui/material"
import { styled } from "@mui/material/styles"

import UserContainer from "@/containers/UserContainer"
import appConfig from "@/configs/app"

// components
import Page from "@/components/Page"
import Logo from "@/components/Logo"
import addSvg from "@/assets/icons/add.svg"
import Main from "./Main"
import Tabs from "./Tabs"

// ----------------------------------------------------------------------

export default function Index() {
  const {user, setUser} = UserContainer.useContainer()

  return (
    <Page title="Chat">
      <ContainerStyle maxWidth="lg">
        <Grid height={1} container>
          <Grid item xs={3}>
            <Stack width={1} mt={4} mb={5} direction="row" justifyContent="center">
              <Logo />
            </Stack>
            <Stack
              height="85%"
              width={1}
              justifyContent="space-between"
              alignItems="center"
            >
              <Tabs />
              <Box width={1} px={3} pb={3}>
                <Stack p={2} direction="row" justifyContent="space-between" alignItems="center">
                  <Typography>{user.name}</Typography>
                  <Typography className="link" color="#007FFF" onClick={() => setUser({name: 'Gamer'})}>Change</Typography>
                </Stack>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Box component="img" src={addSvg} />}
                >
                  New Chat
                </Button>
                <Stack width={1} p={1} direction="row" justifyContent="center">
                  <Typography
                    variant={"body2"}
                    gutterBottom
                    color="#484848"
                  >
                    {appConfig.version} beta
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Main />
          </Grid>
        </Grid>
      </ContainerStyle>
    </Page>
  )
}

// ----------------------------------------------------------------------

const ContainerStyle = styled(Container)(({theme}) => ({
  marginTop: theme.spacing(5),
  height: "88vh",
  borderRadius: theme.spacing(1),
  backgroundColor: "#191A1D",
}))
