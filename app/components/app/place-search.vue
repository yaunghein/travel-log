<script lang="ts" setup>
import { SearchSchema } from '~/types'
import type { NominatimResult } from '~/types'

const emit = defineEmits<{
  resultSelected: [NominatimResult]
}>()

const { handleSubmit, errors, values } = useForm({
  validationSchema: toTypedSchema(SearchSchema),
  initialValues: { q: '' },
})

watch(values, () => {
  hasSearched.value = false
})

const searchResults = ref<NominatimResult[]>([])
const hasSearched = ref(false)
const loading = ref(false)

const onSubmit = handleSubmit(async (query) => {
  loading.value = true
  searchResults.value = []
  try {
    const results = await $fetch('/api/search', { query })
    searchResults.value = results
  } catch (error) {
    console.log(error)
  }
  loading.value = false
  hasSearched.value = true
})
</script>

<template>
  <div>
    <form class="join w-full" @submit.prevent="onSubmit">
      <div class="w-full">
        <label class="input join-item w-full">
          <svg
            class="h-[1em] shrink-0 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <Field
            as="input"
            type="text"
            name="q"
            placeholder="Search for a location..."
            :disabled="loading"
            :class="{ 'input-error': errors.q }"
          />
        </label>
        <div v-if="errors.q" class="text-error mt-2 text-xs">
          {{ errors.q }}
        </div>
      </div>
      <button :disabled="loading" class="btn btn-neutral join-item">
        Search
      </button>
    </form>

    <div
      v-if="hasSearched && !searchResults.length"
      class="mt-2 w-full"
      role="alert"
    >
      <div class="alert alert-soft alert-error">
        No location found for {{ values.q }}
      </div>
    </div>

    <div v-if="loading" class="mt-2 grid place-items-center">
      <div class="loading loading-lg"></div>
    </div>

    <div class="hide-scrollbar max-h-90.5 overflow-scroll pb-2">
      <div
        v-for="result in searchResults"
        :key="result.place_id"
        class="card bg-base-300 mt-2 max-w-116"
      >
        <div class="flex items-center justify-between gap-2 p-4 pt-3">
          <h4 class="card-title text-left text-sm">
            {{ result.display_name }}
          </h4>
          <button
            @click="emit('resultSelected', result)"
            class="btn btn-secondary btn-sm"
          >
            <span class="sr-only">Add Location</span>
            <Icon name="tabler:map-pin-share" size="20" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
