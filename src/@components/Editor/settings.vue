<template>
  <Button
    label="Delete"  
    class="p-button-danger bs mb-3"
    style="max-width:100%;"
    @click="emits('delete')"
    />
</template>

<script setup>
import { defineEmits } from "vue"

const emits = defineEmits(["delete"])
</script>