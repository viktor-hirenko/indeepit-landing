<script setup lang="ts">
import { useAppConfig } from '@/composables/useAppConfig'

const { services } = useAppConfig()
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
        <svg
          class="services__icon"
          xmlns="http://www.w3.org/2000/svg"
          width="54"
          height="58"
          viewBox="0 0 54 58"
          fill="none"
        >
          <g filter="url(#filter0_d_6_1395)">
            <path
              d="M20.2645 2.55997C23.6926 -0.853324 29.235 -0.85333 32.6631 2.55997L50.3407 20.1613C53.7898 23.5955 53.7898 29.1794 50.3407 32.6136L32.6631 50.2149C29.235 53.6282 23.6926 53.6282 20.2645 50.2149L2.58689 32.6136C-0.86224 29.1794 -0.862247 23.5955 2.58688 20.1613L20.2645 2.55997Z"
              fill="#EEEEEE"
            />
            <path
              d="M20.8357 3.13354C23.948 0.0346694 28.9802 0.0346432 32.0925 3.13354L49.7693 20.7351C52.9007 23.853 52.9007 28.9219 49.7693 32.0398L32.0925 49.6414C28.9802 52.7403 23.948 52.7402 20.8357 49.6414L3.15796 32.0398C0.0266901 28.9219 0.0266853 23.853 3.15796 20.7351L20.8357 3.13354Z"
              stroke="#050505"
              stroke-width="1.6185"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_6_1395"
              x="0"
              y="0"
              width="53.8525"
              height="57.9772"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="0.924856" dy="5.20231" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0196078 0 0 0 0 0.0196078 0 0 0 0 0.0196078 0 0 0 1 0"
              />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6_1395" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_6_1395"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
        <svg
          class="services__icon"
          xmlns="http://www.w3.org/2000/svg"
          width="63"
          height="66"
          viewBox="0 0 63 66"
          fill="none"
        >
          <g filter="url(#filter0_d_6_1396)">
            <path
              d="M30 0C24.0666 0 18.2664 1.7595 13.3329 5.05594C8.39944 8.35238 4.55424 13.0377 2.28361 18.5195C0.0129845 24.0013 -0.581097 30.0333 0.57646 35.8527C1.73402 41.6722 4.59123 47.0177 8.78681 51.2132C12.9824 55.4088 18.3279 58.266 24.1473 59.4236C29.9668 60.5811 35.9987 59.9869 41.4805 57.7163C46.9623 55.4457 51.6476 51.6006 54.944 46.6671C58.2405 41.7337 60 35.9334 60 30C60 22.0435 56.8393 14.4129 51.2132 8.78682C45.5871 3.16073 37.9565 0 30 0ZM30 43.375C27.3545 43.3758 24.7682 42.5921 22.5681 41.1229C20.3681 39.6537 18.6531 37.5652 17.6402 35.1213C16.6272 32.6774 16.3617 29.988 16.8773 27.3933C17.3929 24.7985 18.6664 22.4148 20.5368 20.5439C22.4072 18.673 24.7903 17.3987 27.3849 16.8823C29.9796 16.3659 32.669 16.6305 35.1132 17.6427C37.5574 18.6549 39.6466 20.3693 41.1164 22.5688C42.5863 24.7684 43.3709 27.3545 43.3709 30C43.3709 33.5465 41.9622 36.9479 39.4548 39.456C36.9474 41.9642 33.5465 43.3739 30 43.375Z"
              fill="#EEEEEE"
            />
            <path
              d="M30 0.80957C37.7419 0.809572 45.1663 3.88505 50.6406 9.35938C56.115 14.8337 59.1904 22.2581 59.1904 30C59.1904 35.7734 57.479 41.4174 54.2715 46.2178C51.064 51.0181 46.5048 54.7594 41.1709 56.9688C35.8371 59.1781 29.968 59.7561 24.3057 58.6299C18.6432 57.5036 13.4418 54.723 9.35938 50.6406C5.27709 46.5583 2.4965 41.3576 1.37012 35.6953C0.243785 30.0329 0.821871 24.163 3.03125 18.8291C5.24062 13.4952 8.98187 8.93603 13.7822 5.72852C18.5826 2.521 24.2266 0.80957 30 0.80957ZM35.4229 16.8955C32.8308 15.8221 29.9782 15.5412 27.2266 16.0889C24.4752 16.6366 21.9482 17.9878 19.9648 19.9717C17.9814 21.9558 16.6308 24.4837 16.084 27.2354C15.5372 29.9871 15.8183 32.8399 16.8926 35.4316C17.9669 38.0232 19.7861 40.2379 22.1191 41.7959C24.4522 43.3538 27.1946 44.1854 30 44.1846C33.7611 44.1834 37.3682 42.6883 40.0273 40.0283C42.6864 37.3684 44.1797 33.7611 44.1797 30C44.1797 27.1944 43.3478 24.4518 41.7891 22.1191C40.2303 19.7866 38.0148 17.9689 35.4229 16.8955Z"
              stroke="#050505"
              stroke-width="1.6185"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_6_1396"
              x="0"
              y="0"
              width="62.5434"
              height="65.2023"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="2.54335" dy="5.20231" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0196078 0 0 0 0 0.0196078 0 0 0 0 0.0196078 0 0 0 1 0"
              />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6_1396" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_6_1396"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
        <svg
          class="services__icon"
          xmlns="http://www.w3.org/2000/svg"
          width="62"
          height="65"
          viewBox="0 0 62 65"
          fill="none"
        >
          <g filter="url(#filter0_d_6_1397)">
            <path
              d="M50.5858 0.0808447C24.5107 3.9075 3.89382 24.564 0.080043 50.6861C-0.620973 55.4877 3.38022 59.4441 8.23266 59.4441H50.5573C55.4097 59.4441 59.3434 55.5104 59.3434 50.658V8.23022C59.3434 3.37777 55.3869 -0.623728 50.5858 0.0808447Z"
              fill="#EEEEEE"
            />
            <path
              d="M50.7034 0.881592C54.9357 0.260481 58.5344 3.78687 58.5344 8.23022V50.658C58.5344 55.0635 54.9624 58.6345 50.5569 58.6345H8.23267C3.78968 58.6345 0.263286 55.0368 0.881104 50.8035C4.64333 25.0344 24.9828 4.65621 50.7034 0.881592Z"
              stroke="#050505"
              stroke-width="1.6185"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_6_1397"
              x="0"
              y="0"
              width="61.8867"
              height="64.6464"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="2.54335" dy="5.20231" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.0196078 0 0 0 0 0.0196078 0 0 0 0 0.0196078 0 0 0 1 0"
              />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6_1397" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_6_1397"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
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
    width: to-rem(60);
    height: to-rem(60);
    flex-shrink: 0;

    @include mq($until: mobile) {
      width: to-rem(48);
      height: to-rem(48);
    }
  }
}
</style>
