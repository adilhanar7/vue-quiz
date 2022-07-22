import { createStore } from 'vuex'

export default createStore({
  state: {
    listQuestions: [
      {
        index: 0,
        title: 'Когда я родился ?',
        time: 15,
        vars: ['В 2008 году', 'В 2000 году', 'В 1995 году'],
        rightVar: 'В 2008 году',
      },
      {
        index: 1,
        title: 'Какая у меня фамилия ?',
        time: 5,
        vars: ['Айками', 'Лай', 'Арбуду', 'Луй'],
        rightVar: 'Арбуду',
      },
      {
        index: 2,
        title: 'Какая у меня фамилия ?',
        time: 5,
        vars: ['Айками', 'Лай', 'Арбуду', 'Луй'],
        rightVar: 'Арбуду',
      },
      {
        index: 3,
        title: 'Какая у меня фамилия ?',
        time: 5,
        vars: ['Айками', 'Лай', 'Арбуду', 'Луй'],
        rightVar: 'Арбуду',
      },
    ],
    listVarsUser: [],
  },
  getters: {},
  mutations: {
    SET_LIST_VARS__USER(state, varUser) {
      state.listVarsUser.push(varUser)
    },
  },
  actions: {},
  modules: {},
})
