import styled from "@emotion/styled"
import { CircularProgress, Typography } from "@mui/material"
import Helper from "@/utils/helper"

// ----------------------------------------------------------------------

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FullPageLoading = () => (
  <FullPage>
    <CircularProgress />
  </FullPage>
)

export const ErrorBox = ({error}: { error: unknown }) => {
  if (Helper.isError(error)) {
    return <Typography align={"center"}>Error: {error?.message}</Typography>
  }
  return null
}

export const FullPageErrorFallback = ({error}: { error: Error | null }) => (
  <FullPage>
    <ErrorBox error={error} />
  </FullPage>
)

type ImgProps = {
  src: string
  onClick?: () => void
}
export const Img = ({src, onClick}: ImgProps) => (
  <img
    alt=""
    src={src}
    onClick={onClick}
    className="image"
  />
)
