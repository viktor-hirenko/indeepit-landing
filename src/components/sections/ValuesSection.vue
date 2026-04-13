<script setup lang="ts">
import { useAppConfig } from '@/composables/useAppConfig'
import type { ValueBadgeTone } from '@/types/landing-config'

const { values } = useAppConfig()

function toneClass(tone: ValueBadgeTone): string {
  return `values__card-badge--${tone}`
}
</script>

<template>
  <section id="values" class="values">
    <div class="values__header">
      <h2 class="values__title">{{ values.sectionTitle }}</h2>
      <p class="values__subtitle">{{ values.sectionSubtitle }}</p>
    </div>

    <div class="values__grid">
      <article v-for="card in values.cards" :key="card.id" class="values__card">
        <span class="values__card-badge" :class="toneClass(card.tone)">{{ card.badge }}</span>
        <h3 class="values__card-title">{{ card.title }}</h3>
        <p class="values__card-description">{{ card.description }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.values {
  background-color: var(--color-bg);
  padding: to-rem(100) to-rem(80);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: to-rem(50);

  @include mq($until: mobile) {
    padding: to-rem(60) to-rem(16);
    gap: to-rem(50);
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: to-rem(16);
    text-align: center;
    max-width: to-rem(1100);
    width: 100%;

    @include mq($until: mobile) {
      align-items: flex-start;
      text-align: left;
    }
  }

  &__title {
    font-family: var(--font-display);
    font-weight: 500;
    font-size: to-rem(48);
    line-height: to-rem(56);
    letter-spacing: to-rem(0.5);
    color: var(--color-text-primary);
    text-transform: uppercase;

    @include mq($until: mobile) {
      font-size: to-rem(32);
      line-height: to-rem(40);
    }
  }

  &__subtitle {
    font-family: var(--font-body);
    font-size: to-rem(24);
    font-weight: 400;
    line-height: to-rem(32);
    color: var(--color-text-secondary);
    max-width: to-rem(520);

    @include mq($until: mobile) {
      font-size: to-rem(18);
      line-height: to-rem(24);
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: to-rem(20);
    width: 100%;
    max-width: to-rem(1100);

    @include mq($until: mobile) {
      grid-template-columns: 1fr;
      max-width: to-rem(480);
      gap: to-rem(16);
    }
  }

  &__card {
    background-color: var(--color-surface);
    border-radius: var(--radius-card);
    border: to-rem(1) solid rgba(0, 0, 0, 0.06);
    padding: to-rem(40) to-rem(32);
    display: flex;
    flex-direction: column;
    gap: to-rem(24);
    align-items: flex-start;
  }

  &__card-badge {
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

    &--blue {
      background-color: var(--color-badge-blue);
    }

    &--pink {
      background-color: var(--color-badge-pink);
    }

    &--purple {
      background-color: var(--color-badge-purple);
    }
  }

  &__card-title {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: to-rem(48);
    line-height: to-rem(56);
    color: var(--color-text-primary);
  }

  &__card-description {
    font-family: var(--font-body);
    font-size: to-rem(18);
    font-weight: 400;
    line-height: to-rem(24);
    color: var(--color-text-secondary);
  }
}
</style>
