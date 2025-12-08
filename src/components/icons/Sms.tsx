export const SmsIcon = (props: JSX.IntrinsicElements['img'] & { width?: number; height?: number }) => {
    const { className, width = 32, height = 32, ...rest } = props
  
    return (
      <img
        src="/icons/Sms.svg"
        alt="SMS / Text"
        width={width}
        height={height}
        className={className}
        {...rest}
      />
    )
  }
  
  export default SmsIcon
