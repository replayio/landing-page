/**
 * Extracts plain text from React nodes for JSON-LD structured data.
 * This ensures answers are self-contained and comprehensible without HTML context.
 * Handles nested structures, arrays, and various React element types.
 * Formats lists and other structured content for better readability.
 */
export function extractTextFromNode(node: string | React.ReactNode): string {
    if (typeof node === 'string') {
      return node
    }
  
    if (typeof node === 'number' || typeof node === 'boolean') {
      return String(node)
    }
  
    if (node === null || node === undefined) {
      return ''
    }
  
    if (Array.isArray(node)) {
      return node
        .map(extractTextFromNode)
        .filter(Boolean)
        .join(' ')
    }
  
    if (typeof node === 'object' && 'props' in node) {
      const reactElement = node as React.ReactElement
      const { props } = reactElement
      
      // Check the element type to handle specific HTML elements
      const elementType = reactElement.type
      
      // Handle list items - format them with bullet points for clarity
      if (elementType === 'li') {
        const text = extractTextFromNode(props?.children)
        return text ? `• ${text}` : ''
      }
      
      // Handle paragraphs and divs - preserve spacing
      if (elementType === 'p' || elementType === 'div') {
        const text = extractTextFromNode(props?.children)
        return text ? `${text.trim()} ` : ''
      }
      
      // Default: recursively extract from children
      if (props?.children) {
        return extractTextFromNode(props.children)
      }
    }
  
    return ''
  }