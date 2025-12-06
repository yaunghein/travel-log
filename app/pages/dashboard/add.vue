<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { InsertLocation } from '~/lib/db/schema/location'
import type { FetchError } from 'ofetch'

const router = useRouter()
const { $csrfFetch } = useNuxtApp()

const submitError = ref('')
const loading = ref(false)
const submitted = ref(false)

const { handleSubmit, errors, meta, setErrors } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
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
    submitError.value = error.data?.statusMessage || error.statusMessage || 'An unknown error occured.'
    if (error.data?.data) {
      setErrors(error.data.data)
    }
  }
  loading.value = false
})

onBeforeRouteLeave(() => {
  if (meta.value.dirty && !submitted.value) {
    const confirm = window.confirm('Are you sure you want to leave? All unsaved changes will be lost!')
    if (confirm) return true
    return false
  }
})
</script>

<template>
  <div class="container mx-auto max-w-md">
    <h1 class="my-4 text-lg">Add Location</h1>
    <div v-if="submitError" role="alert" class="alert alert-error mb-2">
      <span>{{ submitError }}</span>
    </div>
    <form @submit.prevent="onSubmit">
      <AppFormField name="name" label="Name" :error="errors.name" :disabled="loading" />
      <AppFormField
        name="description"
        label="Description"
        :error="errors.description"
        type="textarea"
        :disabled="loading"
      />
      <AppFormField name="lat" label="Latitide" :error="errors.lat" :disabled="loading" />
      <AppFormField name="long" label="Longitude" :error="errors.long" :disabled="loading" />
      <div class="mt-4 flex justify-end gap-4">
        <button type="button" class="btn btn-ghost" @click="router.back()">
          <Icon name="tabler:arrow-left" size="20" />
          Cancel
        </button>
        <button :disabled="loading" type="submit" class="btn btn-primary">
          Add
          <span v-if="loading" class="loading loading-spinner loading-sm"></span>
          <Icon v-else name="tabler:circle-plus-filled" size="20" />
        </button>
      </div>
    </form>
  </div>
</template>
