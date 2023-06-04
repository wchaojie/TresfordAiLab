import { Post } from "@/utils/http"
import { then, throwErrorMessage } from "./helper"
import { TClaudeReq } from "@/types/chat"

// ----------------------------------------------------------------------

export const chat = async (data: TClaudeReq) => {
  const [res, err] = await Post("/chat", data).then(...then)
  throwErrorMessage(err)

  return res.data
}
