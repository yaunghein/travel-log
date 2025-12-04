<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { InsertLocation } from '~/lib/db/schema/location'

const router = useRouter()

const { handleSubmit, errors, meta } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

onBeforeRouteLeave(() => {
  if (meta.value.dirty) {
    const confirm = window.confirm(
      'Are you sure you want to leave? All unsaved changes will be lost!'
    )
    if (confirm) return true
    return false
  }
})
</script>

<template>
  <div class="container max-w-md mx-auto">
    <h1 class="text-lg my-4">Add Location</h1>
    <form @submit.prevent="onSubmit">
      <AppFormField name="name" label="Name" :error="errors.name" />
      <AppFormField
        name="description"
        label="Description"
        :error="errors.description"
        type="textarea"
      />
      <AppFormField name="lat" label="Latitide" :error="errors.lat" />
      <AppFormField name="long" label="Longitude" :error="errors.long" />
      <div class="flex justify-end gap-4 mt-4">
        <button type="button" class="btn btn-ghost" @click="router.back()">
          <Icon name="tabler:arrow-left" size="20" />
          Cancel
        </button>
        <button type="submit" class="btn btn-primary">
          Add
          <Icon name="tabler:circle-plus-filled" size="20" />
        </button>
      </div>
    </form>
  </div>
</template>
