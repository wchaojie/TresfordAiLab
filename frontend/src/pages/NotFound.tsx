import { Link as RouterLink } from "react-router-dom"

// material
import { styled } from "@mui/material/styles"
import { Button, Container, Typography } from "@mui/material"

// components
import Page from "@/components/Page"

const ContentStyle = styled("div")(({theme}) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0)
}))

export default function NotFound() {
  return (
    <Page title="404 Page Not Found">
      <Container>
        <ContentStyle sx={{textAlign: "center", alignItems: "center"}}>
          <Typography variant="h3" paragraph>Sorry, Page Not Found!</Typography>
          <Button
            to="/"
            size="large"
            variant="outlined"
            component={RouterLink}
          >
            Homepage
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  )
}
