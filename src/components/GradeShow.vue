<template>
  <div class="grade">
    <h2>Your scores:</h2>
    <ul>
      <li v-for="(ans, i) in varsUser" :key="ans">
        <mark>{{ i + 1 }})</mark>
        <span v-if="ans.var === undefined">Didn't answer anything</span>
        <span v-else> {{ ans.var }}</span>
        &nbsp; &nbsp;
        <mark v-if="ans.var === rightVars[i]"><u>Correctly</u></mark>
        <mark v-else><u>Not properly</u></mark>
        <br />
        <span v-if="ans.var !== rightVars[i]">{{ rightVars[i] }}</span>
      </li>
    </ul>
    <h2>Your middle score:</h2>
    <span>{{ middleScoreOfQuizs }}</span>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const varsUser = computed(() => store.state.listVarsUser)
    const listQuizs = computed(() => store.state.listQuestions)
    const rightVars = ref([])
    const middleScoreOfQuizs = ref(0)
    listQuizs.value.map((item) => {
      return rightVars.value.push(item.rightVar)
    })
    const calculateScore = () => {
      const amountProperlyValues = ref(0)
      rightVars.value.map((item, index) => {
        if (varsUser.value[index] === undefined) {
          amountProperlyValues.value = amountProperlyValues.value + 1
        } else {
          if (item !== varsUser.value[index].var) {
            return (amountProperlyValues.value = amountProperlyValues.value + 1)
          }
        }
      })
      if (amountProperlyValues.value !== 0) {
        middleScoreOfQuizs.value =
          (5 * (rightVars.value.length - amountProperlyValues.value) +
            1 * amountProperlyValues.value) /
          rightVars.value.length
      } else {
        middleScoreOfQuizs.value = 5
      }
    }
    onMounted(() => {
      calculateScore()
    })
    
    return {
      varsUser,
      listQuizs,
      rightVars,
      middleScoreOfQuizs,
      calculateScore,
    }
  },
}
</script>

<style lang="scss" scoped>
.grade {
  background: white;
  border-radius: 10px;
  position: absolute;
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 400px;
  width: 400px;
  ul {
    padding: 20px 5px;
    display: flex;
    flex-direction: column;
    list-style-type: none;
  }
}
</style>
