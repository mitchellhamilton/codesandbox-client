export default function transform (file, api) {
  const j = api.jscodeshift
  const root = j(file.source)
  return root.find(j.ImportDeclaration).forEach((path) => {
    if (path.value.source.value === "styled-components") {
      path.value.source.value = 'emotion/react'
    }
  }).toSource({ quote: 'single' })
}
