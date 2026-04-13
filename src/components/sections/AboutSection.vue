<script setup lang="ts">
import { useAppConfig } from '@/composables/useAppConfig'

const { about } = useAppConfig()
</script>

<template>
  <section id="about" class="about">
    <div class="about__container">
      <span class="about__badge">{{ about.sectionBadge }}</span>
      <h2 class="about__title">{{ about.title }}</h2>
      <p class="about__description">
        {{ about.descriptionBefore }}<strong>{{ about.descriptionStrong }}</strong
        >{{ about.descriptionAfter }}
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about {
  background-color: var(--color-bg);
  padding: to-rem(100) to-rem(80);
  display: flex;
  align-items: center;
  justify-content: center;

  @include mq($until: mobile) {
    padding: to-rem(60) to-rem(16);
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: to-rem(40);
    max-width: to-rem(800);
    width: 100%;
    text-align: center;

    @include mq($until: mobile) {
      align-items: flex-start;
      text-align: left;
      gap: to-rem(50);
    }
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: to-rem(8) to-rem(16);
    border-radius: var(--radius-pill);
    border: to-rem(1) solid var(--color-border);
    background-color: var(--color-badge-purple);
    font-family: var(--font-body);
    font-size: to-rem(18);
    font-weight: 500;
    line-height: to-rem(24);
    color: var(--color-text-ui);
    box-shadow: 0 5px 0 0 #050505;
  }

  &__title {
    font-family: var(--font-display);
    font-weight: 500;
    font-size: to-rem(48);
    line-height: to-rem(56);
    color: var(--color-text-primary);
    text-transform: uppercase;

    @include mq($until: mobile) {
      font-size: to-rem(32);
      line-height: to-rem(40);
    }
  }

  &__description {
    font-family: var(--font-body);
    font-size: to-rem(24);
    font-weight: 400;
    line-height: to-rem(32);
    color: var(--color-text-body);

    @include mq($until: mobile) {
      font-size: to-rem(18);
      line-height: to-rem(24);
    }

    strong {
      font-weight: 500;
      color: var(--color-text-primary);
    }
  }
}
</style>
