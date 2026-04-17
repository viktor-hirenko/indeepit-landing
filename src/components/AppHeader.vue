<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import MobileMenu from './MobileMenu.vue'
import { useAppConfig } from '@/composables/useAppConfig'
import { useSectionScrollSpy } from '@/composables/useSectionScrollSpy'

const route = useRoute()
const router = useRouter()
const { header, site, mobileMenu, contactMailto } = useAppConfig()

const headerRef = ref<HTMLElement | null>(null)
const isMobileMenuOpen = ref(false)
const burgerRef = ref<HTMLButtonElement | null>(null)

function toggleMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMenu() {
  isMobileMenuOpen.value = false
  burgerRef.value?.focus()
}

const navItems = header.nav
const activeNavHref = ref<string>(navItems[0]?.href ?? '')

function getHeaderHeight(): number {
  return headerRef.value?.getBoundingClientRect().height ?? 0
}

useSectionScrollSpy({
  route,
  sectionHrefs: () => navItems.map(item => item.href),
  setActiveHref: (href) => { activeNavHref.value = href },
})

watch(
  () => route.path,
  path => {
    if (path !== '/') activeNavHref.value = ''
  },
)

function scrollToSection(href: string) {
  activeNavHref.value = href

  if (route.path !== '/') {
    void router.push({ path: '/', hash: href })
    return
  }

  const el = document.getElementById(href.replace('#', ''))
  if (!el) return

  const offset = getHeaderHeight()
  const top = el.getBoundingClientRect().top + window.scrollY - offset

  window.scrollTo({ top, behavior: 'smooth' })
}

function handleMobileNavigate(href: string) {
  closeMenu()
  scrollToSection(href)
}

watchEffect(() => {
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
})
</script>

<template>
  <header ref="headerRef" class="header">
    <div class="header__desktop">
      <RouterLink to="/" class="header__logo">{{ site.brandName }}</RouterLink>
      <nav class="header__nav" :aria-label="header.navAriaLabel">
        <button
          v-for="item in navItems"
          :key="item.label"
          type="button"
          class="header__nav-item"
          :class="{ 'header__nav-item--active': activeNavHref === item.href }"
          :aria-current="activeNavHref === item.href ? 'page' : undefined"
          @click="scrollToSection(item.href)"
        >
          {{ item.label }}
        </button>
      </nav>
      <a :href="contactMailto" class="header__cta">
        <span class="header__cta-label">{{ header.ctaLabel }}</span>
        <span class="header__cta-icon" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M17.25 8.25L21 12M21 12L17.25 15.75M21 12H3"
              stroke="#212121"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </a>
    </div>

    <div class="header__mobile">
      <RouterLink to="/" class="header__logo header__logo--mobile">{{ site.brandName }}</RouterLink>
      <button
        ref="burgerRef"
        class="header__burger"
        :class="{ 'header__burger--open': isMobileMenuOpen }"
        :aria-label="isMobileMenuOpen ? header.closeMenuAriaLabel : header.openMenuAriaLabel"
        :aria-expanded="isMobileMenuOpen"
        type="button"
        @click="toggleMenu"
      >
        <span class="header__burger-icon" aria-hidden="true">
          <span class="header__burger-line header__burger-line--top"></span>
          <span class="header__burger-line header__burger-line--mid"></span>
          <span class="header__burger-line header__burger-line--bot"></span>
        </span>
      </button>
    </div>
  </header>

  <MobileMenu
    :is-open="isMobileMenuOpen"
    :nav-items="navItems"
    :cta-mailto="contactMailto"
    :menu="mobileMenu"
    :brand-name="site.brandName"
    :close-aria-label="header.closeMenuAriaLabel"
    @navigate="handleMobileNavigate"
    @close="closeMenu"
  />
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: var(--color-bg);
  border-bottom: to-rem(1) solid transparent;

  &__desktop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: to-rem(24);
    max-width: to-rem(1440);
    margin: 0 auto;
    padding: to-rem(50) to-rem(80) to-rem(24);

    @include mq($until: mobile) {
      display: none;
    }
  }

  &__logo {
    font-family: var(--font-display);
    font-size: to-rem(24);
    font-weight: 400;
    line-height: to-rem(32);
    color: var(--color-text-primary);
    text-decoration: none;
    flex-shrink: 0;

    &--mobile {
      font-size: to-rem(20);
      line-height: to-rem(24);
    }
  }

  &__nav {
    position: absolute;
    left: 50%;
    transform: translatex(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  &__nav-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: to-rem(10) to-rem(18);
    border-radius: var(--radius-pill);
    border: to-rem(1) solid var(--color-border);
    font-family: var(--font-body);
    font-size: to-rem(16);
    font-weight: 500;
    line-height: to-rem(24);
    color: var(--color-text-ui);
    background-color: transparent;
    box-shadow: 0 5px 0 0 #050505;
    text-decoration: none;
    transition:
      background-color 0.2s ease,
      transform 0.15s ease;

    &:hover {
      background-color: var(--color-nav-hover);
    }

    &--active {
      background-color: var(--color-nav-hover);
    }
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: to-rem(12) to-rem(16);
    border-radius: var(--radius-pill);
    border: to-rem(1) solid var(--color-border);
    background-color: var(--color-accent);
    font-family: var(--font-body);
    font-size: to-rem(16);
    font-weight: 600;
    line-height: to-rem(24);
    color: var(--color-text-ui);
    text-decoration: none;
    flex-shrink: 0;
    transition: opacity 0.2s ease;
    box-shadow: 0 5px 0 0 #050505;

    &:hover {
      opacity: 0.92;
    }
  }

  &__cta-label {
    padding: 0 to-rem(8);
    line-height: to-rem(24);
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

  &__mobile {
    display: none;

    @include mq($until: mobile) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: to-rem(16);
      background-color: var(--color-bg);
    }
  }

  &__burger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: to-rem(44);
    height: to-rem(44);
  }

  &__burger-icon {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: to-rem(18);
    height: to-rem(14);
  }

  &__burger-line {
    display: block;
    height: to-rem(2);
    background-color: var(--color-text-primary);
    border-radius: to-rem(1);
    transform-origin: center;
    transition:
      transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.2s ease;
  }

  &__burger--open {
    .header__burger-line {
      &--top {
        width: 100%;
        transform: translateY(to-rem(6)) rotate(45deg);
      }

      &--mid {
        width: 100%;
        opacity: 0;
        transform: scaleX(0);
      }

      &--bot {
        width: 100%;
        transform: translateY(to-rem(-6)) rotate(-45deg);
      }
    }
  }
}
</style>
