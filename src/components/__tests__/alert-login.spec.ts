import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Alert from '@/components/alert-login.vue'

const setupComponent = (propsData: any) => {
  return mount(Alert, {
    props: propsData
  })
}

describe('Alert', () => {
  it('exibe mensagem de erro corretamente', async () => {
    const wrapper = setupComponent({
      type: 'error', // define o tipo de alerta como 'error'
      message: 'Um dos campos ou ambos estão inválidos. Tente novamente.', // define a mensagem de erro
      isVisible: true // deixa o alerta visível
    })

    await wrapper.vm.$nextTick() // espera pela próxima atualização do ciclo de vida do vue

    const alert = wrapper.find('.alert') // encontra o elemento DOM com a classe '.alert'

    expect(alert.exists()).toBe(true) // verifica se o elemento '.alert' existe no DOM

    expect(alert.classes()).toContain('alert-error') // verifica se o elemento '.alert' possui a classe 'alert-error'

    expect(alert.text()).toContain('Um dos campos ou ambos estão inválidos. Tente novamente.') // Verifica se o texto da mensagem de erro está presente no conteúdo do elemento '.alert'
  })

  it('exibe mensagem de sucesso corretamente', async () => {
    const wrapper = setupComponent({
      type: 'success', // define o tipo de alerta como 'success'
      message: 'Login bem-sucedido!', // define a mensagem de sucesso
      isVisible: true // deixa o alerta visível
    })
    await wrapper.vm.$nextTick() // aguarda a próxima atualização do ciclo de vida do vue

    const alert = wrapper.find('.alert') // encontra o elemento DOM com a classe '.alert'

    expect(alert.exists()).toBe(true) // verifica se o elemento '.alert' existe no DOM

    expect(alert.classes()).toContain('alert-success') // verifica se o elemento '.alert' possui a classe 'alert-success'

    expect(alert.text()).toContain('Login bem-sucedido!') // verifica se o texto da mensagem de sucesso está presente no conteúdo do elemento '.alert'
  })

  it('não exibe alerta quando isVisible é false', async () => {
    const wrapper = setupComponent({ isVisible: false }) // monta o componente Alert com isVisible definido como false

    await wrapper.vm.$nextTick() // aguarda a próxima atualização do ciclo de vida do vue

    expect(wrapper.find('.alert').exists()).toBe(false) // verifica se o elemento '.alert' não existe no DOM
  })
})
