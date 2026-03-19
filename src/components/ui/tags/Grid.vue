<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { tags } from '@/store.js';
import config from "@util/themeConfig";
import { getLocalizedThemeConfig } from "@util/localizedThemeConfig";
import type Tag from "@/types/Tag";

// Define props
const props = defineProps<{
  locale: string;
}>();

// Get tags from config (server-side compatible)
let availableTags = config.directoryData.tags as Tag[] | undefined;

// On client side, use localized tags
if (typeof window !== 'undefined') {
  const localizedConfig = getLocalizedThemeConfig(props.locale);
  availableTags = localizedConfig.directoryData.tags as Tag[] | undefined;
}

const selectedTags = useStore(tags);

function toggleTagByName(tag: string) {
  if (!tag) return;
  
  if (!selectedTags.value.includes(tag as never)) {
    tags.set([...selectedTags.value, tag] as never[]);
  }
  else {
    let filtered = selectedTags.value.filter(e => e !== tag);
    tags.set([...filtered]);
  }
}
</script>

<template>
  <div class="flex flex-wrap gap-2 mt-4">
    <span
      v-for="tag in availableTags"
      class="border border-gray-200 rounded-md px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-900 dark:border-gray-600 cursor-pointer select-none"
      :class="selectedTags.includes(tag.key) ? 'border-primary-500 dark:border-primary-300' : ''"
      @click="toggleTagByName(tag.key)"
    >
      {{ tag.name }}
    </span>
  </div>
</template>