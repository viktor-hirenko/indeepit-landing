<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import type { MobileMenuConfig, NavItemConfig } from '@/types/landing-config'

interface Props {
  isOpen: boolean
  navItems: NavItemConfig[]
  ctaMailto: string
  menu: MobileMenuConfig
  brandName: string
  closeAriaLabel: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  navigate: [href: string]
  close: []
}>()

const dialogRef = ref<HTMLElement | null>(null)

watch(
  () => props.isOpen,
  async open => {
    if (open) {
      await nextTick()
      dialogRef.value?.focus()
    }
  }
)

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

function handleNavigate(href: string) {
  emit('navigate', href)
}
</script>

<template>
  <Transition name="menu">
    <div
      v-if="isOpen"
      ref="dialogRef"
      class="mobile-menu"
      role="dialog"
      aria-modal="true"
      :aria-label="menu.dialogAriaLabel"
      tabindex="-1"
      @keydown="handleKeydown"
    >
      <div class="mobile-menu__bar">
        <RouterLink to="/" class="mobile-menu__logo" @click="emit('close')">
          {{ brandName }}
        </RouterLink>
        <button
          type="button"
          class="mobile-menu__close"
          :aria-label="closeAriaLabel"
          @click="emit('close')"
        >
          <svg
            class="mobile-menu__close-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <div class="mobile-menu__body">
        <nav class="mobile-menu__nav" :aria-label="menu.mobileNavAriaLabel">
          <button
            v-for="item in navItems"
            :key="item.label"
            type="button"
            class="mobile-menu__nav-item"
            @click="handleNavigate(item.href)"
          >
            {{ item.label }}
          </button>
        </nav>

        <a :href="ctaMailto" class="mobile-menu__cta">
          <span class="mobile-menu__cta-label">{{ menu.ctaLabel }}</span>
          <span class="mobile-menu__cta-icon" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M17.25 8.25L21 12M21 12L17.25 15.75M21 12H3"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </a>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100dvh;
  background-color: var(--color-bg);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &__bar {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: to-rem(16);
    background-color: var(--color-bg);
  }

  &__logo {
    font-family: var(--font-display);
    font-size: to-rem(20);
    font-weight: 400;
    line-height: to-rem(24);
    color: var(--color-text-primary);
    text-decoration: none;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: to-rem(10);
    border: none;
    border-radius: to-rem(8);
    background: transparent;
    cursor: pointer;
    color: var(--color-text-primary);
  }

  &__close-icon {
    display: block;
    flex-shrink: 0;
  }

  &__body {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: to-rem(170);
    padding: to-rem(48) to-rem(16) to-rem(32);
    width: 100%;
    box-sizing: border-box;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: to-rem(16);
    width: 100%;
  }

  &__nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: to-rem(390);
    margin: 0;
    padding: to-rem(12) to-rem(16);
    border: to-rem(1) solid var(--color-border);
    border-radius: var(--radius-pill);
    background-color: var(--color-bg);
    box-shadow: 0 5px 0 0 #050505;
    font-family: var(--font-body);
    font-size: to-rem(16);
    font-weight: 500;
    line-height: to-rem(24);
    color: var(--color-text-ui);
    text-align: center;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      transform 0.15s ease;

    &:active {
      transform: translateY(2px);
    }
  }

  &__cta {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    width: 100%;
    max-width: to-rem(390);
    padding: to-rem(12) to-rem(16);
    border: to-rem(1) solid var(--color-border);
    border-radius: var(--radius-pill);
    background-color: var(--color-accent);
    box-shadow: 0 5px 0 0 #050505;
    font-family: var(--font-body);
    font-size: to-rem(16);
    font-weight: 600;
    line-height: to-rem(24);
    color: var(--color-text-ui);
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.92;
    }
  }

  &__cta-label {
    padding: 0 to-rem(8);
    min-width: 0;
    text-align: left;
  }

  &__cta-icon {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: to-rem(24);
    height: to-rem(24);
    color: var(--color-text-ui);

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-enter-from,
.menu-leave-to {
  transform: translateY(-100%);
}
</style>
