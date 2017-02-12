import Vue from 'vue'

import compilePassage from 'lib/compile_passage'

describe('compilePassage', () => {
  it('extracts metadata', () => {
    const passagedata = passagedataNode({pid: '1', name: 'Start'})
    const result = compilePassage(passagedata)

    expect(result.pid).to.equal('1')
    expect(result.name).to.equal('Start')
  })

  it('sets the component name', () => {
    const passagedata = passagedataNode({pid: '1', name: 'Start'})
    const result = compilePassage(passagedata)

    expect(result.component.name).to.equal('passage--Start')
  })

  describe('template parsing', () => {
    it('handles plain text', () => {
      const passagedata = passagedataNode({text: 'hi thar!'})
      const result = compilePassage(passagedata)

      const vm = mountedPassage(result.component)

      expect(vm.$el.querySelector('div p').textContent).to.equal('hi thar!')
    })

    it('handles markdown', () => {
      const passagedata = passagedataNode({text: '# hi thar!'})
      const result = compilePassage(passagedata)

      const vm = mountedPassage(result.component)

      expect(vm.$el.querySelector('div h1').textContent).to.equal('hi thar!')
    })

    it('handles links', () => {
      const linkText = '[[basic link]] [[another link->somewhere]] [[foo|Somewhere else]] [[passage<-text]]'
      const passagedata = passagedataNode({text: linkText})
      const result = compilePassage(passagedata)

      const vm = mountedPassage(result.component)

      expect(vm.$el.querySelector('a[to="basic link"]').textContent).to.equal('basic link')
      expect(vm.$el.querySelector('a[to="somewhere"]').textContent).to.equal('another link')
      expect(vm.$el.querySelector('a[to="Somewhere else"]').textContent).to.equal('foo')
      expect(vm.$el.querySelector('a[to="passage"]').textContent).to.equal('text')
    })
  })
})

function passagedataNode ({pid, name, text}) {
  const passagedata = document.createElement('tw-passagedata')
  const pidNode = document.createAttribute('pid')
  const nameNode = document.createAttribute('name')
  pidNode.value = pid
  nameNode.value = name
  passagedata.setAttributeNode(pidNode)
  passagedata.setAttributeNode(nameNode)
  passagedata.textContent = text

  return passagedata
}

function mountedPassage (component) {
  Vue.component('tw-link', {
    name: 'tw-link',
    template: '<a><slot></slot></a>'
  })
  const Constructor = Vue.extend(
    component)
  return new Constructor().$mount()
}
