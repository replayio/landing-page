export const GoogleDocsIcon = (props: JSX.IntrinsicElements['img'] & { width?: number; height?: number }) => {
    const { className, width = 32, height = 32, ...rest } = props
  
    return (
      <img
        src="/icons/GoogleDocs.svg"
        alt="Google Docs"
        width={width}
        height={height}
        className={className}
        {...rest}
      />
    )
  }
  
  export default GoogleDocsIcon
  