export const GoogleSheetsIcon = (props: JSX.IntrinsicElements['img'] & { width?: number; height?: number }) => {
    const { className, width = 32, height = 32, ...rest } = props
  
    return (
      <img
        src="/icons/GoogleSheets.svg"
        alt="Google Sheets"
        width={width}
        height={height}
        className={className}
        {...rest}
      />
    )
  }
  
  export default GoogleSheetsIcon
  