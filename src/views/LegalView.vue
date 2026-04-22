<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useAppConfig } from '@/composables/useAppConfig'
import type { LegalSectionConfig } from '@/types/landing-config'

interface Props {
  type: 'privacy' | 'terms'
}

const props = defineProps<Props>()

const { legal, site } = useAppConfig()

const content = computed(() => (props.type === 'privacy' ? legal.privacy : legal.terms))

const contactEmail = computed(() => site.contactEmail)

function injectContactEmail(text: string): string {
  return text.replace(/\{\{contactEmail\}\}/g, site.contactEmail)
}

function splitEmailSegment(raw: string): { before: string; after: string } | null {
  const text = injectContactEmail(raw)
  const email = contactEmail.value
  if (!text.includes(email)) return null
  const idx = text.indexOf(email)
  return { before: text.slice(0, idx), after: text.slice(idx + email.length) }
}

function getSectionNumber(sections: LegalSectionConfig[], index: number): number {
  let count = 0
  for (let i = 0; i <= index; i++) {
    if (!sections[i].isUnnumbered) count++
  }
  return count
}

interface TextSegment {
  type: 'text' | 'link'
  text: string
  href?: string
}

const LINK_TAGS: Array<{ tag: string; href: string }> = [
  { tag: 'terms', href: '/terms-and-conditions' },
  { tag: 'privacy', href: '/privacy-policy' },
]

function parseLinks(raw: string): TextSegment[] {
  const segments: Array<{ index: number; length: number; text: string; href: string }> = []

  for (const { tag, href } of LINK_TAGS) {
    const re = new RegExp(`\\[\\[${tag}\\]\\](.*?)\\[\\[\\/${tag}\\]\\]`, 'g')
    let match: RegExpExecArray | null
    while ((match = re.exec(raw)) !== null) {
      segments.push({ index: match.index, length: match[0].length, text: match[1], href })
    }
  }

  segments.sort((a, b) => a.index - b.index)

  const result: TextSegment[] = []
  let last = 0
  for (const seg of segments) {
    if (seg.index > last) result.push({ type: 'text', text: raw.slice(last, seg.index) })
    result.push({ type: 'link', text: seg.text, href: seg.href })
    last = seg.index + seg.length
  }
  if (last < raw.length) result.push({ type: 'text', text: raw.slice(last) })
  return result
}

function hasLinks(text: string): boolean {
  return LINK_TAGS.some(({ tag }) => text.includes(`[[${tag}]]`))
}

function splitBoldPrefix(text: string): { bold: string; rest: string } | null {
  const colonIdx = text.indexOf(': ')
  const commaIdx = text.indexOf(', ')
  const idx =
    colonIdx >= 0 && commaIdx >= 0
      ? Math.min(colonIdx, commaIdx)
      : colonIdx >= 0
        ? colonIdx
        : commaIdx
  if (idx < 0 || idx > 80) return null
  const sep = text[idx] === ':' ? ': ' : ', '
  return { bold: text.slice(0, idx), rest: sep + text.slice(idx + sep.length) }
}
</script>

<template>
  <div class="legal">
    <AppHeader />
    <main class="legal__main">
      <div class="legal__container">
        <div class="legal__header">
          <h1 class="legal__title">{{ content.title }}</h1>
          <p v-if="content.lastUpdated" class="legal__last-updated">{{ content.lastUpdated }}</p>
        </div>

        <div class="legal__content">
          <div
            v-for="(section, sectionIndex) in content.sections"
            :key="section.title"
            class="legal__block"
          >
            <h2 class="legal__section-title">
              <template v-if="!section.isUnnumbered"
                >{{ getSectionNumber(content.sections, sectionIndex) }}. </template
              >{{ section.title }}
            </h2>

            <!-- Plain text -->
            <template v-if="section.type === 'text'">
              <p v-for="(para, i) in section.content" :key="i" class="legal__text">
                <template v-if="hasLinks(para)">
                  <template v-for="(seg, si) in parseLinks(injectContactEmail(para))" :key="si">
                    <RouterLink v-if="seg.type === 'link'" :to="seg.href!" class="legal__link">{{
                      seg.text
                    }}</RouterLink>
                    <template v-else>{{ seg.text }}</template>
                  </template>
                </template>
                <template v-else>{{ injectContactEmail(para) }}</template>
              </p>
            </template>

            <!-- Mixed: intro lines + list + afterList -->
            <template v-else-if="section.type === 'mixed'">
              <template v-if="section.introLines">
                <p
                  v-for="(line, li) in section.introLines"
                  :key="'intro-' + li"
                  class="legal__text"
                >
                  {{ injectContactEmail(line) }}
                </p>
              </template>
              <p v-else-if="section.intro" class="legal__text">
                {{ injectContactEmail(section.intro) }}
              </p>

              <template v-if="section.isLastParagraph">
                <p v-for="(item, i) in section.content" :key="i" class="legal__text">
                  <template v-for="seg in [splitEmailSegment(item)]" :key="`seg-${i}`">
                    <template v-if="seg">
                      {{ seg.before
                      }}<a :href="`mailto:${contactEmail}`" class="legal__email">{{
                        contactEmail
                      }}</a
                      >{{ seg.after }}
                    </template>
                    <template v-else>{{ injectContactEmail(item) }}</template>
                  </template>
                </p>
              </template>

              <ol
                v-else-if="section.listStyle === 'numbered'"
                class="legal__list legal__list--numbered"
              >
                <li v-for="(item, i) in section.content" :key="i" class="legal__list-item">
                  <template v-if="section.boldPrefix && splitBoldPrefix(injectContactEmail(item))">
                    <strong>{{ splitBoldPrefix(injectContactEmail(item))!.bold }}</strong
                    >{{ splitBoldPrefix(injectContactEmail(item))!.rest }}
                  </template>
                  <template v-else>{{ injectContactEmail(item) }}</template>
                </li>
              </ol>

              <ul v-else class="legal__list">
                <li v-for="(item, i) in section.content" :key="i" class="legal__list-item">
                  <template v-if="section.boldPrefix && splitBoldPrefix(injectContactEmail(item))">
                    <strong>{{ splitBoldPrefix(injectContactEmail(item))!.bold }}</strong
                    >{{ splitBoldPrefix(injectContactEmail(item))!.rest }}
                  </template>
                  <template v-else>{{ injectContactEmail(item) }}</template>
                </li>
              </ul>

              <template v-if="section.afterList">
                <p v-for="(para, i) in section.afterList" :key="'after-' + i" class="legal__text">
                  {{ injectContactEmail(para) }}
                </p>
              </template>

              <ol
                v-if="section.secondList && section.listStyle === 'numbered'"
                class="legal__list legal__list--numbered"
              >
                <li
                  v-for="(item, i) in section.secondList"
                  :key="'second-' + i"
                  class="legal__list-item"
                >
                  {{ injectContactEmail(item) }}
                </li>
              </ol>
              <ul v-else-if="section.secondList" class="legal__list">
                <li
                  v-for="(item, i) in section.secondList"
                  :key="'second-' + i"
                  class="legal__list-item"
                >
                  {{ injectContactEmail(item) }}
                </li>
              </ul>

              <template v-if="section.afterSecondList">
                <p
                  v-for="(para, i) in section.afterSecondList"
                  :key="'aftersecond-' + i"
                  class="legal__text"
                >
                  {{ injectContactEmail(para) }}
                </p>
              </template>
            </template>

            <!-- Subsections with subtitles -->
            <template v-else-if="section.type === 'subsections' && section.subsections">
              <div v-for="(sub, si) in section.subsections" :key="si" class="legal__subsection">
                <h3 class="legal__subsection-title">{{ sub.subtitle }}</h3>
                <p v-for="(para, pi) in sub.content" :key="pi" class="legal__text">
                  <template v-if="hasLinks(para)">
                    <template v-for="(seg, si2) in parseLinks(injectContactEmail(para))" :key="si2">
                      <RouterLink v-if="seg.type === 'link'" :to="seg.href!" class="legal__link">{{
                        seg.text
                      }}</RouterLink>
                      <template v-else>{{ seg.text }}</template>
                    </template>
                  </template>
                  <template v-else>{{ injectContactEmail(para) }}</template>
                </p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
.legal {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-bg);

  &__main {
    flex: 1;
    padding: to-rem(160) to-rem(200) to-rem(100);

    @include mq($until: tablet) {
      padding: to-rem(120) to-rem(80) to-rem(80);
    }

    @include mq($until: mobile) {
      padding: to-rem(100) to-rem(16) to-rem(60);
    }
  }

  &__container {
    max-width: to-rem(1040);
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: to-rem(80);

    @include mq($until: tablet) {
      gap: to-rem(60);
    }

    @include mq($until: mobile) {
      gap: to-rem(40);
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: to-rem(12);

    @include mq($until: mobile) {
      align-items: flex-start;
    }
  }

  &__title {
    font-family: var(--font-display);
    font-weight: 500;
    font-size: to-rem(64);
    line-height: to-rem(80);
    color: var(--color-text-primary);
    text-align: center;

    @include mq($until: mobile) {
      font-size: to-rem(40);
      line-height: to-rem(48);
      text-align: left;
    }
  }

  &__last-updated {
    font-family: var(--font-body);
    font-size: to-rem(14);
    font-weight: 400;
    line-height: to-rem(20);
    color: var(--color-text-body);
    text-align: center;
    opacity: 0.6;

    @include mq($until: mobile) {
      text-align: left;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: to-rem(64);

    @include mq($until: mobile) {
      gap: to-rem(40);
    }
  }

  &__block {
    display: flex;
    flex-direction: column;
    gap: to-rem(16);

    &__section-title {
      font-family: var(--font-display);
      font-weight: 500;
      font-size: to-rem(40);
      line-height: to-rem(48);
      color: var(--color-text-primary);

      @include mq($until: mobile) {
        font-size: to-rem(28);
        line-height: to-rem(34);
      }
    }
  }

  &__text {
    font-family: var(--font-body);
    font-size: to-rem(18);
    font-weight: 400;
    line-height: to-rem(24);
    color: var(--color-text-body);
  }

  &__list {
    list-style: disc;
    padding-left: to-rem(24);
    display: flex;
    flex-direction: column;
    gap: to-rem(8);

    &--numbered {
      list-style: none;
      counter-reset: legal-item;
      padding-left: to-rem(28);

      .legal__list-item {
        counter-increment: legal-item;
        position: relative;
        padding-left: to-rem(4);

        &::before {
          content: counter(legal-item) ') ';
          position: absolute;
          left: to-rem(-28);
          font-weight: 400;
        }
      }
    }
  }

  &__list-item {
    font-family: var(--font-body);
    font-size: to-rem(18);
    font-weight: 400;
    line-height: to-rem(24);
    color: var(--color-text-body);

    @include mq($until: mobile) {
      font-size: to-rem(16);
    }
  }

  &__subsection {
    display: flex;
    flex-direction: column;
    gap: to-rem(12);

    & + & {
      margin-top: to-rem(16);
    }
  }

  &__subsection-title {
    font-family: var(--font-display);
    font-weight: 500;
    font-size: to-rem(24);
    line-height: to-rem(32);
    color: var(--color-text-primary);

    @include mq($until: mobile) {
      font-size: to-rem(20);
      line-height: to-rem(28);
    }
  }

  &__link {
    color: var(--color-text-primary);
    text-decoration: underline;
    font-weight: 500;

    &:hover {
      opacity: 0.7;
    }
  }

  &__email {
    color: var(--color-text-primary);
    text-decoration: underline;
    font-weight: 500;
  }
}
</style>
