<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '@/composables/useAppConfig'
import type { HeroBadgeConfig, HeroBadgeSlot } from '@/types/landing-config'

const { hero } = useAppConfig()

const badgeClassMap: Record<HeroBadgeSlot, string> = {
  'top-right': 'hero__pill--tr',
  'mid-left': 'hero__pill--ml',
  'mid-bottom': 'hero__pill--mb',
}

const desktopBadges = computed(() =>
  hero.badges.map((b: HeroBadgeConfig) => ({
    ...b,
    slotClass: badgeClassMap[b.desktopSlot],
  }))
)

/** Mobile order: Growth, Software, Product — match Figma 360 (blue, purple, pink) */
const mobileBadgeOrder = ['Growth', 'Software', 'Product']
const mobileBadges = computed(() => {
  const order = new Map(mobileBadgeOrder.map((label, i) => [label, i]))
  return [...hero.badges].sort((a, b) => (order.get(a.label) ?? 99) - (order.get(b.label) ?? 99))
})

function toneClass(tone: HeroBadgeConfig['tone']): string {
  return `hero__pill--${tone}`
}
</script>

<template>
  <section id="home" class="hero">
    <div class="hero__mobile-badges" aria-hidden="true">
      <span
        v-for="badge in mobileBadges"
        :key="`m-${badge.label}`"
        class="hero__pill hero__pill--mobile"
        :class="toneClass(badge.tone)"
      >
        {{ badge.label }}
      </span>
    </div>

    <div class="hero__stage">
      <div class="hero__content">
        <h1 class="hero__title">
          <span class="hero__title-line">{{ hero.titleLine1 }}</span>
          <span class="hero__title-line">{{ hero.titleLine2 }}</span>
          <span class="hero__badges-desktop" aria-hidden="true">
            <span
              v-for="badge in desktopBadges"
              :key="`d-${badge.label}`"
              class="hero__pill hero__pill--desktop"
              :class="[toneClass(badge.tone), badge.slotClass]"
            >
              {{ badge.label }}
            </span>
          </span>
        </h1>
        <p class="hero__subtitle">{{ hero.subtitle }}</p>
        <a :href="hero.ctaMailto" class="hero__cta">
          <span class="hero__cta-label">{{ hero.ctaLabel }}</span>
          <span class="hero__cta-icon" aria-hidden="true">
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
  </section>
</template>

<style scoped lang="scss">
.hero {
  background-color: var(--color-bg);
  position: relative;
  padding-top: to-rem(250);
  padding-bottom: to-rem(100);

  @include mq($until: mobile) {
    padding-top: to-rem(140);
    padding-bottom: to-rem(70);
  }

  &__mobile-badges {
    display: none;

    @include mq($until: mobile) {
      display: flex;
      flex-wrap: wrap;
      gap: to-rem(8);
      justify-content: center;
      padding: 0 to-rem(16) to-rem(60);
      max-width: to-rem(360);
      margin: 0 auto;
    }
  }

  &__stage {
    position: relative;
    max-width: to-rem(932);
    margin: 0 auto;
    padding: 0 to-rem(40);
    min-height: to-rem(320);

    @include mq($until: mobile) {
      padding: 0 to-rem(16);
      min-height: unset;
    }
  }

  &__badges-desktop {
    display: block;
    position: absolute;
    inset: 0;
    pointer-events: none;

    @include mq($until: mobile) {
      display: none;
    }
  }

  &__pill {
    z-index: 2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: to-rem(8) to-rem(16);
    border-radius: var(--radius-pill);
    border: to-rem(1) solid var(--color-border);
    font-family: var(--font-body);
    font-size: to-rem(18);
    font-weight: 500;
    line-height: to-rem(24);
    color: var(--color-text-ui);
    box-shadow: 0 5px 0 0 #050505;
    text-transform: none;

    &--mobile {
      font-size: to-rem(16);
      line-height: to-rem(22);
    }

    &--desktop {
      position: absolute;
    }

    &--blue {
      background-color: var(--color-badge-blue);
      transform: rotate(5deg);
    }

    &--purple {
      background-color: var(--color-badge-purple);
      transform: rotate(-5deg);
    }

    &--pink {
      background-color: var(--color-badge-pink);
      transform: rotate(10deg);
    }
  }

  &__pill--tr {
    top: to-rem(-8);
    right: -11px;
    transform: rotate(9deg);
  }

  &__pill--ml {
    top: 48%;
    left: -12px;
    transform: rotate(-15deg);
  }

  &__pill--mb {
    bottom: 6%;
    right: 29%;
    transform: rotate(8deg);
  }

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: to-rem(50);

    @include mq($until: mobile) {
      gap: to-rem(24);
    }

    @include mq($until: xs) {
      align-items: stretch;
      text-align: left;
    }
  }

  &__title {
    position: relative;
    font-family: var(--font-display);
    font-weight: 500;
    font-size: to-rem(100);
    line-height: to-rem(120);
    letter-spacing: to-rem(0.5);
    color: var(--color-text-primary);
    text-transform: uppercase;

    @include mq($until: mobile) {
      font-size: to-rem(44);
      line-height: to-rem(48);
    }
  }

  &__title-line {
    display: block;
  }

  &__subtitle {
    font-family: var(--font-body);
    font-size: to-rem(20);
    font-weight: 400;
    line-height: to-rem(28);
    color: var(--color-text-secondary);
    max-width: to-rem(390);

    @include mq($until: mobile) {
      font-size: to-rem(18);
      line-height: to-rem(24);
    }
  }

  &__cta {
    display: none;
    align-items: center;
    align-self: center;
    justify-content: center;
    padding: to-rem(12) to-rem(16);
    border-radius: var(--radius-pill);
    border: to-rem(1) solid var(--color-border);
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

    @include mq($until: mobile) {
      display: inline-flex;
      width: 100%;
      max-width: to-rem(390);
      margin-top: to-rem(26);
    }
  }

  &__cta-label {
    padding: 0 to-rem(8);
    line-height: to-rem(24);

    @include mq($until: mobile) {
      min-width: 0;
      text-align: left;
    }
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
</style>
