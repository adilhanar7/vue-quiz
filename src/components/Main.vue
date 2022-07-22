<template>
  <main class="main" v-if="listQuizs.length">
    <button @click="startQuizs()" class="startBtn">Start</button>
    <ModelQuiz
      v-if="showModel"
      :quiz="currentQuiz"
      :lengthListQuizs="listQuizs.length"
      @nextQuiz="functionNextQuiz"
    />
    <GradeShow v-if="showGrade" />
  </main>
</template>

<script>
import { ref } from '@vue/reactivity'
import ModelQuiz from './ModelQuiz.vue'
import GradeShow from './GradeShow.vue'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
export default {
  components: { ModelQuiz, GradeShow },
  setup() {
    const showModel = ref(false)
    const showGrade = ref(false)
    const store = useStore()
    const listQuizs = computed(() => store.state.listQuestions)
    const currentQuiz = ref(undefined)
    const startQuizs = () => {
      showModel.value = true
      currentQuiz.value = listQuizs.value[0]
    }
    const functionNextQuiz = (params) => {
      if (listQuizs.value[params + 1] !== undefined) {
        return (currentQuiz.value = listQuizs.value[params + 1])
      } else {
        currentQuiz.value = undefined
        showModel.value = false
        showGrade.value = true
        console.log(computed(() => store.state.listVarsUser))
      }
    }
    return {
      showGrade,
      startQuizs,
      listQuizs,
      currentQuiz,
      showModel,
      functionNextQuiz,
    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  .startBtn {
    background: white;
    color: rgb(0, 140, 255);
    border: none;
    border-radius: 5px;
    padding: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: background 0.5s;
    &:hover {
      color: lighten(rgb(255, 255, 255), 10%);
      background: blue;
    }
  }
}
</style>
