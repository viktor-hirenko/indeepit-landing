import appConfigRaw from '@/data/app-config.json'
import { FOOTER_ASSETS } from '@/data/landing-assets'
import type { AppConfig } from '@/types/landing-config'

const appConfig = appConfigRaw as AppConfig

export function useAppConfig() {
  return {
    config: appConfig,
    site: appConfig.site,
    header: appConfig.header,
    hero: appConfig.hero,
    about: appConfig.about,
    services: appConfig.services,
    values: appConfig.values,
    footer: appConfig.footer,
    footerAssets: FOOTER_ASSETS,
    mobileMenu: appConfig.mobileMenu,
    legal: appConfig.legal,
  }
}

export function getAppConfig(): AppConfig {
  return appConfig
}
