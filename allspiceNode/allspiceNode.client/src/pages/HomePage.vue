<template>
  <div class="container">
    <div class="row justify-content-evenly">
      <div
        class="col-md-3 mx-3 my-4 px-0"
        v-for="recipe in recipes"
        :key="recipe.id"
      >
        <Recipe :recipe="recipe" />
      </div>
    </div>
  </div>
  <!-- <Footer /> -->
  <div class="container-fluid">
    <div class="row justify-content-end">
      <div class="col-md-2 text-center f-24">
        <btn
          class="
            btn btn-outline-danger
            mdi mdi-plus
            f-16
            rounded-circle
            selectable
          "
          data-bs-toggle="modal"
          data-bs-target="#modal"
        ></btn>
      </div>
      <FormModal>
        <template #modal-title>Add New Recipe</template>
        <template #modal-body>
          <AddRecipeForm />
        </template>
      </FormModal>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted } from '@vue/runtime-core'
import { recipesService } from "../services/RecipesService"
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'

export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await recipesService.getAll('api/Recipes')
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      recipes: computed(() => AppState.recipes),
      favorites: computed(() => AppState.favorites),
    }
  }
}
</script>

<style scoped lang="scss">
.scrollbar {
  overflow-y: scroll;
  height: 74vh;
}
.scrollbar::-webkit-scrollbar {
  width: 7px;
}
.scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar::-webkit-scrollbar-thumb {
  background-color: #418848;
  border-radius: 10px;
}
</style>
