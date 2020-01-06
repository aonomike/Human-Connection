import { config, shallowMount, mount, RouterLinkStub } from '@vue/test-utils'

import Vuex from 'vuex'

import PostCard from './PostCard.vue'

const localVue = global.localVue

config.stubs['client-only'] = '<span><slot /></span>'
config.stubs['v-popover'] = '<span><slot /></span>'

describe('PostCard', () => {
  let store
  let stubs
  let mocks
  let propsData
  let getters
  let Wrapper
  let wrapper

  beforeEach(() => {
    propsData = {
      post: {
        id: 'p23',
        name: 'It is a post',
        author: {
          id: 'u1',
        },
        disabled: false,
      },
    }
    stubs = {
      NuxtLink: RouterLinkStub,
    }
    mocks = {
      $t: jest.fn(),
      $toast: {
        success: jest.fn(),
        error: jest.fn(),
      },
      $apollo: {
        mutate: jest.fn().mockResolvedValue({
          data: { DeletePost: { id: 'deleted-post-id' } },
        }),
      },
    }
    getters = {
      'auth/isModerator': () => false,
      'auth/user': () => {
        return {}
      },
    }
  })

  describe('shallowMount', () => {
    Wrapper = () => {
      store = new Vuex.Store({ getters })
      return shallowMount(PostCard, {
        store,
        propsData,
        mocks,
        localVue,
      })
    }

    beforeEach(jest.useFakeTimers)

    describe('test Post callbacks', () => {
      beforeEach(() => {
        wrapper = Wrapper()
      })

      describe('deletion of Post from Page by invoking "deletePostCallback()"', () => {
        beforeEach(() => {
          wrapper.vm.deletePostCallback()
        })

        describe('after timeout', () => {
          beforeEach(jest.runAllTimers)

          it('does call mutation', () => {
            expect(mocks.$apollo.mutate).toHaveBeenCalledTimes(1)
          })

          it('mutation is successful', () => {
            expect(mocks.$toast.success).toHaveBeenCalledTimes(1)
          })

          it('emits "removePostFromList"', () => {
            expect(wrapper.emitted('removePostFromList')).toEqual([[{ id: 'deleted-post-id' }]])
          })
        })
      })
    })
  })

  describe('mount', () => {
    Wrapper = () => {
      const store = new Vuex.Store({
        getters,
      })
      return mount(PostCard, {
        stubs,
        mocks,
        propsData,
        store,
        localVue,
      })
    }

    describe('given a post', () => {
      beforeEach(() => {
        propsData.post = {
          title: "It's a title",
        }
      })

      it('renders title', () => {
        expect(Wrapper().text()).toContain("It's a title")
      })
    })
  })
})
