import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { describe, expect, it } from 'vitest'
import Form from '@/components/form-login.vue'

const setupComponentWithRouter = (component: any, options: any = {}) => {
  const history = createMemoryHistory()
  const router = createRouter({
    history,
    routes: [
      {
        path: '/login',
        name: 'login',
        component: component
      },
      {
        path: '/home',
        name: 'home',
        component: { template: '<div>Home View</div>' }
      }
    ]
  })

  const wrapper = mount(component, {
    global: {
      plugins: [router]
    },
    ...options
  })
  return { wrapper, router }
}

describe('Form', () => {
  it('renders login form correctly', async () => {
    const { wrapper } = setupComponentWithRouter(Form) // monta o componente Form com o router

    // verifica se os elementos do formulário estão presentes no DOM
    expect(wrapper.find('.login-field#login-name').exists()).toBe(true)
    expect(wrapper.find('.login-field#login-pass').exists()).toBe(true)
    expect(wrapper.find('.btn').exists()).toBe(true)
  })

  it('displays error message on invalid login attempt', async () => {
    const { wrapper } = setupComponentWithRouter(Form) // monta o componente Form com o router

    // insere valores nos campos de login e simula um clique no botão de login
    await wrapper.find('.login-field#login-name').setValue('anag')
    await wrapper.find('.login-field#login-pass').setValue('123')
    await wrapper.find('.btn').trigger('click')

    await wrapper.vm.$nextTick() // espera pela próxima atualização do ciclo de vida do vue

    // verifica se o componente Alert é renderizado com o tipo e mensagem corretos
    expect(wrapper.findComponent({ name: 'Alert' }).props('type')).toBe('error')
    expect(wrapper.findComponent({ name: 'Alert' }).props('message')).toBe(
      'Um dos campos ou ambos estão inválidos. Tente novamente.'
    )
  })

  it('redirects to home on successful login', async () => {
    const { wrapper, router } = setupComponentWithRouter(Form) // monta o componente Form com o router

    // insere valores nos campos de login e simula um clique no botão de login
    await wrapper.find('.login-field#login-name').setValue('anagdinizg')
    await wrapper.find('.login-field#login-pass').setValue('12345')
    await wrapper.find('.btn').trigger('click')

    await router.isReady() // espera até que o router esteja pronto para navegação

    expect(router.currentRoute.value.name).toBe('home') // verifica se a rota atual do router é 'home'
  })
})
