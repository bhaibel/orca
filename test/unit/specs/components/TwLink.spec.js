import Vue from 'vue'
import TwLink from 'src/components/TwLink'

describe('TwLink.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      template: '<div><tw-link to="a place">lol</tw-link></div>',
      components: {TwLink}
    }).$mount()

    expect(vm.$el.querySelector('a[href="a place"]').textContent)
      .to.equal('lol')
  })
})
