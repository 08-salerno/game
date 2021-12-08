export const enum Themes {
    LIGHT = 'light',
    DARK = 'dark'
}

export type Theme = {
    name: Themes | string
} & Record<string, unknown>
