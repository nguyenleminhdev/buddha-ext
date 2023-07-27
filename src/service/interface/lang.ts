/**phiên bản của từng nguồn */
interface LanguageVersion {
    readonly common: object
    readonly view: object
}

/**khai báo nguồn của i18n */
export interface Language {
    readonly name: string
    [index: string]: LanguageVersion | string
}