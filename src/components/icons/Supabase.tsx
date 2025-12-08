export const SupabaseIcon = (props: JSX.IntrinsicElements['img'] & { width?: number; height?: number }) => {
    const { className, width = 32, height = 32, ...rest } = props
  
    return (
      <img
        src="/icons/Supabase.svg"
        alt="Supabase"
        width={width}
        height={height}
        className={className}
        {...rest}
      />
    )
  }
  
  export default SupabaseIcon
  