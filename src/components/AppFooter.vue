<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAppConfig } from '@/composables/useAppConfig'

const { footer } = useAppConfig()
</script>

<template>
  <footer id="footer" class="footer">
    <div class="footer__inner">
      <div class="footer__cta">
        <div class="footer__cta-headlines">
          <p class="footer__cta-line">{{ footer.ctaLine1 }}</p>
          <p class="footer__cta-line footer__cta-line--secondary">{{ footer.ctaLine2 }}</p>
        </div>
        <a :href="footer.ctaMailto" class="footer__btn">
          <span class="footer__btn-label">{{ footer.ctaLabel }}</span>
          <span class="footer__btn-icon" aria-hidden="true">
            <svg
              data-v-48a13218=""
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                data-v-48a13218=""
                d="M17.25 8.25L21 12M21 12L17.25 15.75M21 12H3"
                stroke="#212121"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </span>
        </a>
      </div>

      <div class="footer__bottom">
        <div class="footer__links">
          <RouterLink
            v-for="link in footer.links"
            :key="link.path"
            :to="link.path"
            class="footer__link footer__link--underline"
          >
            {{ link.label }}
          </RouterLink>
        </div>
        <span class="footer__copyright">{{ footer.copyright }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  scroll-margin-top: to-rem(100);
  background-color: #fff;

  &__inner {
    max-width: to-rem(1440);
    margin: 0 auto;
    padding: to-rem(100) to-rem(200) to-rem(50);
    display: flex;
    flex-direction: column;
    align-items: center;

    @include mq($until: tablet) {
      padding: to-rem(100) to-rem(80);
    }

    @include mq($until: mobile) {
      padding: to-rem(60) to-rem(16) to-rem(32);
      gap: to-rem(60);
    }
  }

  &__cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: to-rem(1040);
    text-align: center;
    gap: to-rem(50);
    position: relative;
    z-index: 1;

    @include mq($until: mobile) {
      gap: to-rem(32);
    }
  }

  &__cta-headlines {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &__cta-line {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 500;
    font-size: to-rem(40);
    line-height: to-rem(48);
    color: var(--color-text-primary);
    text-transform: uppercase;

    @include mq($until: mobile) {
      font-size: to-rem(32);
      line-height: to-rem(40);
    }

    &--secondary {
      color: var(--color-text-muted);
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: to-rem(12) to-rem(16);
    background-color: var(--color-accent);
    border-radius: var(--radius-pill);
    border: to-rem(1) solid var(--color-border);
    box-shadow: 0 5px 0 0 #050505;
    cursor: pointer;
    width: fit-content;
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.92;
    }
  }

  &__btn-label {
    padding: 0 to-rem(8);
    font-family: var(--font-body);
    font-size: to-rem(16);
    line-height: to-rem(24);
    font-weight: 600;
    color: var(--color-text-ui);
    min-width: 0;

    @include mq($until: mobile) {
      flex: 1;
      text-align: left;
    }
  }

  &__btn-icon {
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

  &__bottom {
    display: flex;
    width: 100%;
    max-width: to-rem(1040);
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: to-rem(40);

    @include mq($until: mobile) {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: to-rem(20);
    }
  }

  &__links {
    display: flex;
    align-items: center;
    gap: to-rem(40);
    flex-wrap: wrap;

    @include mq($until: mobile) {
      gap: to-rem(16);
    }
  }

  &__link {
    font-family: var(--font-body);
    font-size: to-rem(14);
    font-weight: 500;
    color: var(--color-text-muted);
    text-decoration: none;
    line-height: to-rem(16);
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-text-primary);
    }

    &--underline {
      text-decoration: underline;
    }
  }

  &__copyright {
    font-family: var(--font-body);
    font-size: to-rem(14);
    font-weight: 400;
    color: var(--color-text-muted);
    line-height: to-rem(16);
  }
}
</style>
