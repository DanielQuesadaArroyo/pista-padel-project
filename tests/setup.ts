import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { defineStore } from 'pinia'

Object.assign(globalThis, { computed, defineStore, onBeforeUnmount, onMounted, ref })
