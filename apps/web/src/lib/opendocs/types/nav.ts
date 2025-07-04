import type { IconOptions } from '@/components/icons'
import type { LocalizedRecord } from './i18n'

export interface NavItem {
  title: LocalizedRecord
  label?: LocalizedRecord
  description?: LocalizedRecord
  keywords?: LocalizedRecord // Hidden keywords to improve search functionality
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: IconOptions
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface SidebarNavItem extends NavItemWithChildren {}
