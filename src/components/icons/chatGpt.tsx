export const ChatGptIcon = (props: JSX.IntrinsicElements['img'] & { width?: number; height?: number }) => {
  const { className, width = 32, height = 32, ...rest } = props

  return (
    <img
      src="/icons/chatGpt.svg"
      alt="ChatGPT"
      width={width}
      height={height}
      className={className}
      {...rest}
    />
  )
}

export default ChatGptIcon
