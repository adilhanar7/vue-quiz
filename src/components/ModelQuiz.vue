<template>
  <div class="model" v-if="quiz !== undefined">
    <div class="model__heading">
      <div class="model__heading-numof">
        {{ quiz.index + 1 }} of {{ lengthListQuizs }} Question
      </div>
      <div class="model__heading-timer">
        <img :src="TimerIcon" />
        <span>{{ secondTimed }}</span>
      </div>
    </div>
    <hr class="model__hr" />
    <div class="model__content">
      <h2>{{ quiz.index + 1 }}.{{ quiz.title }}</h2>
      <ul>
        <li
          v-for="(num, i) in quiz.vars"
          :key="num"
          :class="{ selectUser: selectVar.var === num && selectVar.iNum === i }"
          @click="selectVarUser(num, i)"
        >
          <mark>{{ listLetter[i] }})</mark> {{ num }}
        </li>
      </ul>
      <button @click="nextQuestion()"><span>Next question</span></button>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import TimerIcon from '@/assets/img/timer.png'
import { useStore } from 'vuex'
export default {
  props: ['quiz', 'lengthListQuizs'],
  setup(props, { emit }) {
    const store = useStore()
    const listLetter = ['A', 'B', 'C', 'D', 'G']
    const selectVar = ref({ var: '', iNum: null })
    const varUser = ref({ var: '', i: props.quiz.index })
    const nextQuestion = () => {
      const hr = document.querySelector('.model__hr')
      emit('nextQuiz', props.quiz.index)
      secondTimed.value = 0
      hr.style.width = '0%'
      if (varUser.value.var !== '') {
        store.commit('SET_LIST_VARS__USER', varUser.value)
      } else {
        store.commit('SET_LIST_VARS__USER', {
          var: undefined,
          i: props.quiz.index,
        })
      }
      selectVar.value = {
        var: '',
        iNum: null,
      }
      varUser.value = { var: '', i: props.quiz.index }
    }
    const secondTimed = ref(0)
    setInterval(() => {
      const hr = document.querySelector('.model__hr')
      if (secondTimed.value !== props.quiz.time) {
        secondTimed.value = secondTimed.value + 1
        hr.style.width = `${(secondTimed.value / props.quiz.time) * 100}%`
      } else {
        emit('nextQuiz', props.quiz.index)
        secondTimed.value = 0
        hr.style.width = '0%'
        if (varUser.value.var !== '') {
          store.commit('SET_LIST_VARS__USER', varUser.value)
        } else {
          store.commit('SET_LIST_VARS__USER', {
            var: undefined,
            i: props.quiz.index,
          })
        }
        selectVar.value = {
          var: '',
          iNum: null,
        }
        varUser.value = { var: '', i: null }
      }
    }, 1000)
    const selectVarUser = (num, index) => {
      selectVar.value = {
        var: num,
        iNum: index,
      }
      varUser.value.var = num
    }
    return {
      listLetter,
      nextQuestion,
      TimerIcon,
      secondTimed,
      varUser,
      selectVarUser,
      selectVar,
    }
  },
}
</script>

<style lang="scss" scoped>
.model {
  background: white;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 520px;
  width: 450px;
  &__heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    &-timer {
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.132);
      border-radius: 5px;
      padding: 5px;
      img {
        height: 25px;
        width: 30px;
      }
      span {
        margin-left: 5px;
      }
    }
  }
  &__hr {
    background: rgb(0, 140, 255);
    height: 3px;
    border-radius: 10px;
    width: 0%;
    position: absolute;
    left: 0;
    transition: 0.5s;
  }
  &__content {
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    ul {
      list-style-type: none;
      overflow-y: scroll;
      height: 280px;
      margin-left: -40px;
      padding-inline-end: 40px;
      li {
        border: 1px solid grey;
        border-radius: 5px;
        padding: 10px 5px;
        margin-top: 10px;
        cursor: pointer;
        &.selectUser {
          background: rgb(0, 140, 255);
          color: white;
          &:hover {
            background: darken(rgb(0, 140, 255), 10%);
          }
        }
        &:hover {
          background: darken(white, 10%);
        }
      }
    }
    button {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgb(0, 140, 255);
      border-radius: 5px;
      border: none;
      span {
        color: white;
      }
    }
  }
}
</style>
