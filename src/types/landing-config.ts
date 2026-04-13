export interface NavItemConfig {
  label: string
  href: string
}

export interface SiteMetaConfig {
  title: string
  description: string
  brandName: string
  contactEmail: string
}

export interface HeaderConfig {
  navAriaLabel: string
  ctaLabel: string
  openMenuAriaLabel: string
  closeMenuAriaLabel: string
  ctaMailto: string
  nav: NavItemConfig[]
}

export type HeroBadgeTone = 'blue' | 'purple' | 'pink'

export type HeroBadgeSlot = 'top-right' | 'mid-left' | 'mid-bottom'

export interface HeroBadgeConfig {
  label: string
  tone: HeroBadgeTone
  desktopSlot: HeroBadgeSlot
}

export interface HeroConfig {
  titleLine1: string
  titleLine2: string
  subtitle: string
  ctaLabel: string
  ctaMailto: string
  badges: HeroBadgeConfig[]
}

export interface AboutConfig {
  sectionBadge: string
  title: string
  descriptionBefore: string
  descriptionStrong: string
  descriptionAfter: string
}

export interface ServicesConfig {
  label: string
  title: string
  paragraphs: string[]
}

export type ValueBadgeTone = 'blue' | 'pink' | 'purple'

export interface ValueCardConfig {
  id: string
  badge: string
  tone: ValueBadgeTone
  title: string
  description: string
}

export interface ValuesConfig {
  sectionTitle: string
  sectionSubtitle: string
  cards: ValueCardConfig[]
}

export interface FooterLinkConfig {
  label: string
  path: string
}

export interface FooterConfig {
  ctaLine1: string
  ctaLine2: string
  ctaLabel: string
  ctaMailto: string
  copyright: string
  links: FooterLinkConfig[]
}

export interface MobileMenuConfig {
  dialogAriaLabel: string
  mobileNavAriaLabel: string
  ctaLabel: string
}

export type LegalBlockType = 'text' | 'list' | 'mixed'

export interface LegalSectionConfig {
  title: string
  type: LegalBlockType
  content: string[]
  intro?: string
  isLastParagraph?: boolean
}

export interface LegalPageConfig {
  title: string
  intro: string[]
  sections: LegalSectionConfig[]
}

export interface LegalContentFile {
  privacy: LegalPageConfig
  terms: LegalPageConfig
}

export interface AppConfig {
  site: SiteMetaConfig
  header: HeaderConfig
  hero: HeroConfig
  about: AboutConfig
  services: ServicesConfig
  values: ValuesConfig
  footer: FooterConfig
  mobileMenu: MobileMenuConfig
  legal: LegalContentFile
}
