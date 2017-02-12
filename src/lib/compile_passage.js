import marked from 'marked'

export default function compilePassage (passagedataNode) {
  const pid = passagedataNode.getAttribute('pid')
  const name = passagedataNode.getAttribute('name')
  const text = passagedataNode.textContent
  const compiledText = addLinks(marked(text))

  return {
    pid,
    name,
    component: {
      name: `passage--${name.replace(/[ $]/g, '-')}`,
      template: `<div>${compiledText}</div>`
    }
  }
}

function addLinks (text) {
  return text.replace(/\[\[(.+?)\]\]/g, function (_linkTag, link) {
    debugger
    let to, linkText
    if (link.match(/-&gt;/)) {
      [linkText, to] = link.split('-&gt;')
    } else if (link.match(/\|/)) {
      [linkText, to] = link.split('|')
    } else if (link.match(/&lt;-/)) {
      [to, linkText] = link.split('&lt;-')
    } else {
      [to, linkText] = [link, link]
    }

    return `<tw-link to="${to}">${linkText}</tw-link>`
  })
}
