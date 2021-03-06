import marked from 'marked'

export default function compilePassage (passagedataNode) {
  const pid = passagedataNode.getAttribute('pid')
  const name = passagedataNode.getAttribute('name')
  const tags = (passagedataNode.getAttribute('tags') || '').split(' ')
  const text = passagedataNode.textContent
  const compiledText = addLinks(marked(text))

  return {
    pid,
    name,
    tags,
    component: {
      name: `passage--${name.replace(/[ $]/g, '-')}`,
      template: `<div :class='passageClass'>${compiledText}</div>`,
      props: ['passageClass']
    }
  }
}

function addLinks (text) {
  return text.replace(/\[\[(.+?)\]\]/g, function (_linkTag, link) {
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
