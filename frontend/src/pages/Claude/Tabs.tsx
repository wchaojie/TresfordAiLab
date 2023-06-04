import { styled } from "@mui/material/styles"
import { Box, Stack, Typography } from "@mui/material"

import RolesContainer from "@/containers/RolesContainer"
import { Img } from "@/components/Common"

// ----------------------------------------------------------------------

export default function Tabs() {
  const {roles, currRole, changeCurrentRole} = RolesContainer.useContainer()

  return (
    <Stack width={1}>
      {
        roles.map((role, id) => (
          <TabWrapper key={id} justifyContent="flex-end" onClick={() => changeCurrentRole(id)}>
            {currRole.id === id
              ? <TabFocus bgcolor={currRole.imgColor} ml={3} pl={3} direction="row" alignItems="center">
                <TabImage><Img src={`/avatar/${role.name}Focus.webp`} /></TabImage>
                <Typography className="shadow" ml={10}>{role.name}</Typography>
              </TabFocus>
              : <Tab mx={3} direction="row" alignItems="center">
                <Box height="50px"><Img src={`/avatar/${role.name}.webp`} /></Box>
                <Typography color="#637381">{role.name}</Typography>
              </Tab>
            }
          </TabWrapper>
        ))
      }
    </Stack>
  )
}

// ----------------------------------------------------------------------

const TabWrapper = styled(Stack)(({theme}) => ({
  height: 100,
}))

const TabFocus = styled(Stack)<{
  bgcolor: string
}>`
  position: relative;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  height: 50px;
  background-color: #242528;
  background-image: ${props => props.bgcolor ? `linear-gradient(45deg, ${props.bgcolor}, #242528 40%)` : "none"};
`

const TabImage = styled(Stack)(({theme}) => ({
  position: "absolute",
  height: 80,
  bottom: 0,
  left: 8,
}))

const Tab = styled(Stack)(({theme}) => ({
  border: "1px solid #484848",
  borderRadius: 4,
  '&:hover': {
    cursor: "pointer",
  },
}))
