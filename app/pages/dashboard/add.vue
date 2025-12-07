<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { InsertLocation } from '~/lib/db/schema/location'
import type { FetchError } from 'ofetch'

const router = useRouter()
const { $csrfFetch } = useNuxtApp()

const mapStore = useMapStore()

const submitError = ref('')
const loading = ref(false)
const submitted = ref(false)

let lastMapPoint = mapStore.mapPoints[mapStore.mapPoints.length - 1]
if (lastMapPoint) {
  lastMapPoint = {
    ...lastMapPoint,
    long: lastMapPoint.long + 1,
    lat: lastMapPoint.lat + 1,
  }
} else {
  lastMapPoint = {
    id: Date.now().toString(),
    name: '',
    description: null,
    long: 0,
    lat: 0,
  }
}

const {
  handleSubmit,
  errors,
  meta,
  setErrors,
  setFieldValue,
  controlledValues,
} = useForm({
  validationSchema: toTypedSchema(InsertLocation),
  initialValues: {
    name: '',
    description: '',
    long: lastMapPoint.long,
    lat: lastMapPoint.lat,
  },
})

const onSubmit = handleSubmit(async (values) => {
  submitError.value = ''
  loading.value = true
  try {
    await $csrfFetch('/api/locations', {
      method: 'post',
      body: values,
    })
    submitted.value = true
    navigateTo('/dashboard')
  } catch (e) {
    const error = e as FetchError
    submitError.value =
      error.data?.statusMessage ||
      error.statusMessage ||
      'An unknown error occured.'
    if (error.data?.data) {
      setErrors(error.data.data)
    }
  }
  loading.value = false
})

effect(() => {
  if (mapStore.addedPoint) {
    setFieldValue('long', mapStore.addedPoint.long)
    setFieldValue('lat', mapStore.addedPoint.lat)
  }
})

onMounted(() => {
  mapStore.addedPoint = lastMapPoint || null
  mapStore.flyTo(mapStore.addedPoint)
})

onBeforeRouteLeave(() => {
  mapStore.addedPoint = null
  if (meta.value.dirty && !submitted.value) {
    const confirm = window.confirm(
      'Are you sure you want to leave? All unsaved changes will be lost!'
    )
    if (confirm) return true
    return false
  }
})

function formatNumber(number: number | null) {
  if (!number) return 0
  return number.toFixed(5)
}
</script>

<template>
  <div class="container mx-auto max-w-md pb-4">
    <h1 class="my-4 text-lg">Add Location</h1>
    <div v-if="submitError" role="alert" class="alert alert-error mb-2">
      <span>{{ submitError }}</span>
    </div>
    <form @submit.prevent="onSubmit">
      <AppFormField
        name="name"
        label="Name"
        :error="errors.name"
        :disabled="loading"
      />
      <AppFormField
        name="description"
        label="Description"
        :error="errors.description"
        type="textarea"
        :disabled="loading"
      />
      <p class="mt-2 text-sm">
        Drag the
        <Icon
          name="tabler:map-pin-filled"
          size="16"
          class="text-secondary translate-y-[0.15rem]"
        />
        marker to desired location.<br />
        Or double click on the map.
      </p>
      <p class="text-sm text-gray-400">
        Current Location: {{ formatNumber(controlledValues.long as number) }},
        {{ formatNumber(controlledValues.lat as number) }}
      </p>
      <div class="mt-4 flex justify-end gap-4">
        <button type="button" class="btn btn-ghost" @click="router.back()">
          <Icon name="tabler:arrow-left" size="20" />
          Cancel
        </button>
        <button :disabled="loading" type="submit" class="btn btn-primary">
          Add
          <span
            v-if="loading"
            class="loading loading-spinner loading-sm"
          ></span>
          <Icon v-else name="tabler:circle-plus-filled" size="20" />
        </button>
      </div>
    </form>
  </div>
</template>
