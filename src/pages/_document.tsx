import { getStyleElement } from '@jsxui/react'
import type { DocumentContext, DocumentInitialProps } from 'next/document'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

class Document extends NextDocument {
  static async getInitialProps(context: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(context)

    return {
      ...initialProps,
      styles: getStyleElement()
    } as DocumentInitialProps
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
