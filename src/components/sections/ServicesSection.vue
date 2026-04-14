<script setup lang="ts">
import { useAppConfig } from '@/composables/useAppConfig'
import servicesIconDiamond from '@/assets/images/icons/services-diamond.svg'
import servicesIconPie from '@/assets/images/icons/services-pie.svg'
import servicesIconRing from '@/assets/images/icons/services-ring.svg'

const { services } = useAppConfig()

const decorativeServiceIcons = [
  servicesIconDiamond,
  servicesIconRing,
  servicesIconPie,
] as const
</script>

<template>
  <section id="services" class="services">
    <div class="services__container">
      <div class="services__header">
        <span class="services__label">{{ services.label }}</span>
        <h2 class="services__title">{{ services.title }}</h2>
      </div>

      <div class="services__body">
        <p v-for="(para, i) in services.paragraphs" :key="i" class="services__paragraph">
          {{ para }}
        </p>
      </div>

      <div class="services__icons" aria-hidden="true">
        <img
          v-for="(src, index) in decorativeServiceIcons"
          :key="index"
          class="services__icon"
          :src="src"
          alt=""
          decoding="async"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.services {
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
    gap: to-rem(50);
    max-width: to-rem(1040);
    width: 100%;
    text-align: center;

    @include mq($until: mobile) {
      align-items: flex-start;
      text-align: left;
      gap: to-rem(50);
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: to-rem(40);
    width: 100%;

    @include mq($until: mobile) {
      align-items: flex-start;
      gap: to-rem(50);
    }
  }

  &__label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: to-rem(8) to-rem(16);
    border-radius: var(--radius-pill);
    border: to-rem(1) solid var(--color-border);
    background-color: var(--color-badge-blue);
    font-family: var(--font-body);
    font-size: to-rem(18);
    font-weight: 500;
    line-height: to-rem(24);
    color: var(--color-text-ui);
  }

  &__title {
    font-family: var(--font-display);
    font-weight: 500;
    font-size: to-rem(48);
    line-height: to-rem(56);
    color: var(--color-text-primary);
    text-transform: uppercase;
    max-width: to-rem(900);

    @include mq($until: mobile) {
      font-size: to-rem(32);
      line-height: to-rem(40);
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: to-rem(20);
    max-width: to-rem(800);
    width: 100%;
  }

  &__paragraph {
    font-family: var(--font-body);
    font-size: to-rem(24);
    font-weight: 400;
    line-height: to-rem(32);
    color: var(--color-text-body);

    @include mq($until: mobile) {
      font-size: to-rem(18);
      line-height: to-rem(26);
    }
  }

  &__icons {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-primary);
    margin-top: to-rem(8);

    @include mq($until: mobile) {
      justify-content: flex-start;
      gap: to-rem(16);
    }
  }

  &__icon {
    display: block;
    width: to-rem(60);
    height: to-rem(60);
    flex-shrink: 0;
    object-fit: contain;

    @include mq($until: mobile) {
      width: to-rem(48);
      height: to-rem(48);
    }
  }
}
</style>
