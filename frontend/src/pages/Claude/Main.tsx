import { useEffect, useRef, useState } from "react"
import { Avatar, Box, Grid, IconButton, List, Stack, TextField, Tooltip, Typography, } from "@mui/material"
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop'
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom'
import { styled } from "@mui/material/styles"
import LoadingButton from '@mui/lab/LoadingButton'
import UserContainer from "@/containers/UserContainer"
import RolesContainer from "@/containers/RolesContainer"
import { chat } from "@/providers/ClaudeProvider"
import { emotions, getRolePrompt } from "@/providers/RolesProvider"

// svg
import IconSvg from "@/components/IconSvg"
import cleanSvg from "@/assets/icons/clean.svg"
import sendSvg from "@/assets/icons/send.svg"
import defaultUserAvatar from "@/assets/icons/defaultUserAvatar.svg"

import { IMessage } from "@/types/chat"

// ----------------------------------------------------------------------

export default function Main() {
  const listRef = useRef(null)
  const {currRole} = RolesContainer.useContainer()
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState<string>("")
  const [emotion, setEmotion] = useState("Normal")
  const [msgBoxExpand, setMsgBoxExpand] = useState(false)
  const {user} = UserContainer.useContainer()
  const [messages, setMessages] = useState<IMessage[]>([])

  const handleSendMessage = () => {
    setLoading(true)
    setQuery("")
    setMessages([
      ...messages,
      {role: "user", content: query},
    ])
    const prompt = getRolePrompt(currRole.name, query)
    console.log(prompt)
    chat({prompt, maxTokens: 1000}).then(res => {
      setLoading(false)
      setMessages(messages => [
        ...messages,
        {role: "assistant", content: res.completion},
      ])
      // Change Emotion
      const emotionText = res.completion.slice(-12)
      const emotionTag = emotions.filter(val => emotionText.indexOf(val) > 0)
      setEmotion(emotionTag[0])
    }).catch(err => {
      console.log(err)
      setLoading(false)
    }).finally(() => {
      setLoading(false)
    })
  }

  const handleCleanMessages = () => {
    // TODO: add confirmation dialog box.
    setMessages([])
  }

  useEffect(() => {
    const current = listRef.current!
    // @ts-ignore
    current.scrollTop = current.scrollHeight
  }, [messages])

  useEffect(() => {
    setMessages([])
    setEmotion("Normal")
  }, [currRole])

  return (
    <Background height={1} py={2} img={`/background/${currRole.name}.webp`}>
      <Wrapper
        height={1}
        img={`/emotion/${currRole.name}/${emotion}.webp`}
        bgimgsize={currRole.imgWidth}
      >
        <Stack height={1} justifyContent="space-between" alignItems="center">
          <Title cleanFunc={handleCleanMessages} />
          <MessageWrapper width="96%" height={msgBoxExpand ? "85%" : "45%"} mb={2}>
            <List
              ref={listRef}
              sx={{
                width: '100%',
                height: '80%',
                overflow: 'auto',
              }}
            >
              <Box pt={1.5} px={1.5}>
                {messages.map((val, idx) => <MessageBox key={idx} data={val} />)}
              </Box>
            </List>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              // className="debug"
              sx={{position: "absolute", bottom: 0, borderTop: "1px solid #404042"}}
            >
              <Grid height={1} item xs>
                <Input
                  autoFocus
                  disabled={loading}
                  fullWidth
                  variant="standard"
                  placeholder="Prompt"
                  size="medium"
                  InputProps={{disableUnderline: true}}
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  onKeyDown={event => (event.key == 'Enter' && handleSendMessage())}
                />
              </Grid>
              <Grid item xs={1} sx={{height: "60px", marginTop: "-6px"}}>
                {loading
                  ? <LoadingButton loading sx={{height: "110%"}} />
                  : <IconButton size="small" onClick={handleSendMessage}>
                    <IconSvg size={60} src={sendSvg} />
                  </IconButton>
                }
              </Grid>
            </Grid>
            <ButtonExpand pt={.5} px={0.2} className="link" onClick={() => setMsgBoxExpand(!msgBoxExpand)}>
              {msgBoxExpand
                ? <VerticalAlignBottomIcon />
                : <VerticalAlignTopIcon />
              }
            </ButtonExpand>
          </MessageWrapper>
        </Stack>
      </Wrapper>
    </Background>
  )
}

// ----------------------------------------------------------------------

const Background = styled(Box)<{
  img?: string
}>`
  background-image: url(${props => props.img || "none"});
  background-size: auto 90%;
  background-repeat: no-repeat;
  background-position: center top;
  background-color: #222;
`

const Wrapper = styled(Box)<{
  img?: string
  bgimgsize?: string
}>`
  position: relative;
  border-radius: 8px;
  padding-top: 16px;
  background-image: url(${props => props.img || "none"});
  background-size: ${props => props.bgimgsize || "90%"} auto;
  background-repeat: no-repeat;
  background-position: center top;
`

type TitleProps = {
  cleanFunc: () => void
}
const Title = ({cleanFunc}: TitleProps) => {
  const {currRole} = RolesContainer.useContainer()
  return (
    <Stack width={1} px={2} direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography className="shadow" variant="h5">{currRole.name}</Typography>
        <Typography className="shadow" color="#007FFF">[ {currRole.character} ]</Typography>
      </Stack>
      <Tooltip title="Clean">
        <Box className="link" onClick={cleanFunc}>
          <IconSvg size={32} src={cleanSvg} />
        </Box>
      </Tooltip>
    </Stack>
  )
}

const MessageWrapper = styled(Box)(({theme}) => ({
  position: "relative",
  borderRadius: theme.spacing(0.5),
  borderTopRightRadius: 0,
  background: "rgba(49, 50, 55, 0.9)",
}))

type MessageBoxProps = {
  data: IMessage & { avatar?: string }
}
const MessageBox = ({data}: MessageBoxProps) => {
  const {role, content} = data
  const {user} = UserContainer.useContainer()
  const {currRole} = RolesContainer.useContainer()
  let isUser = role === "user"

  return (
    <Stack
      direction={isUser ? "row-reverse" : "row"}
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={1}
    >
      {isUser
        ? <IconSvg size={40} src={defaultUserAvatar} color="#848484" />
        : <Avatar src={`/avatar/${currRole.name}Round.webp`} />
      }
      <Stack
        alignItems={isUser ? "flex-end" : "flex-start"}
        gap={0.5}
      >
        <Typography className="shadow" color="#637381">{isUser ? user.name : currRole.name}</Typography>
        <Message isuser={isUser ? 1 : 0}>
          <Typography className="shadow" color="#D1D5DB">{content}</Typography>
          {/*{(role === "assistant") && <MessageTools />}*/}
        </Message>
      </Stack>
    </Stack>
  )
}

const Message = styled(Box)<{
  isuser: number | boolean
}>`
  position: relative;
  padding: 8px;
  margin-left: ${props => props.isuser ? "80px" : "auto"};
  margin-right: ${props => props.isuser ? "auto" : "80px"};
  background-color: ${props => props.isuser ? '#28292D' : "#3E4045"};
  border-radius: 5px;
`

const Input = styled(TextField)(({theme}) => ({
  height: theme.spacing(4),
  paddingLeft: theme.spacing(2),
}))

const ButtonExpand = styled(Box)(({theme}) => ({
  position: "absolute",
  top: -32,
  right: 0,
  borderTopLeftRadius: 3,
  borderTopRightRadius: 3,
  background: "rgba(49, 50, 55, 0.9)",
}))
