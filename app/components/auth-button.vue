<script lang="ts" setup>
import { createAuthClient } from 'better-auth/client'

const authClient = createAuthClient()

const signIn = async () => {
  await authClient.signIn.social({
    provider: 'github',
    callbackURL: '/dashboard',
  })
}
</script>

<template>
  <button class="btn btn-accent" @click="signIn">
    Sign In with Github
    <Icon name="tabler:brand-github" size="20" />
  </button>
</template>
