export const FileUploadIcon = (props: JSX.IntrinsicElements['img'] & { width?: number; height?: number }) => {
    const { className, width = 32, height = 32, ...rest } = props
  
    return (
      <img
        src="/icons/FileUpload.svg"
        alt="File Upload"
        width={width}
        height={height}
        className={className}
        {...rest}
      />
    )
  }
  
  export default FileUploadIcon
  