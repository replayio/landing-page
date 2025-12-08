export const ResendIcon = (props: JSX.IntrinsicElements['img'] & { width?: number; height?: number }) => {
    const { className, width = 32, height = 32, ...rest } = props
  
    return (
      <img
        src="/icons/Resend.svg"
        alt="Resend"
        width={width}
        height={height}
        className={className}
        {...rest}
      />
    )
  }
  
  export default ResendIcon
  