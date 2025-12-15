import { v4 as uuidv4 } from "uuid";

const COOKIE_NAME = "chat_session_id";
const ONE_MONTH = 60 * 60 * 24 * 30;

export const getChatSessionId = () => {
  const match = document.cookie.match(
    new RegExp("(^| )" + COOKIE_NAME + "=([^;]+)")
  );
  return match ? match[2] : null;
};

export const createNewChatSession = () => {
  const sessionId = uuidv4();
  document.cookie = `${COOKIE_NAME}=${sessionId}; path=/; max-age=${ONE_MONTH}`;
  return sessionId;
};

export const ensureChatSession = () => {
  let sessionId = getChatSessionId();
  if (!sessionId) {
    sessionId = createNewChatSession();
  }
  return sessionId;
};

export const replaceChatSession = () => {
  return createNewChatSession();
};
