import { Cb } from './function'

export type CallbackResponse = (response: MessagePayload) => void

export type Platform = 'BACKGROUND' | 'OPTION' | 'POPUP' | 'CONTENT'

export interface Sender {
    id: string
    url: string
    origin: string
    frameId: number
    documentId: string
    documentLifecycle: 'active'
    tab: {
        active: boolean
        audible: boolean
        autoDiscardable: boolean
        discarded: boolean
        favIconUrl: string
        groupId: number
        height: number
        highlighted: boolean
        id: number
        incognito: boolean
        index: number
        mutedInfo: {
            muted: boolean
        },
        openerTabId: number
        pinned: boolean
        selected: boolean
        status: string
        title: string
        url: string
        width: number
        windowId: number
    }
}

export interface MessagePayload {
    from: Platform
    to: Platform
    event: string
    data: any
}

export interface CookieItemInfo {
    name: string
    value: string
}

export interface RuleInfo {
    id: number
    action: {
        type: 'modifyHeaders'
        requestHeaders: {
            header: string
            operation: 'set'
            value: string
        }[]
    }
    condition: {
        domains: string[]
        urlFilter: string
        resourceTypes: string[]
    }
}

export interface Chrome {
    runtime: {
        id: string,
        onInstalled: {
            /**lắng nghe sự kiện ext được cài vào chrome */
            addListener: (callback: () => void) => void
        }
        onMessage: {
            /**lắng nghe event được gửi đến background script từ option, popup  */
            addListener: (
                callback: (
                    message: MessagePayload,
                    sender: Sender,
                    sendResponse: CallbackResponse
                ) => true
            ) => void
        }
        /**gửi tin nhắn từ option, popup đến background script */
        sendMessage: (
            message: MessagePayload,
            responseCallback?: CallbackResponse
        ) => void
        /**mở options page */
        openOptionsPage: (proceed?: Cb) => void
        onStartup: {
            addListener: (
                callback: () => void
            ) => void
        }
        getPlatformInfo: () => void
    }
    cookies: {
        /**đọc toàn bộ cookie của 1 trang */
        getAll: (
            input: { url: string },
            proceed: (result: CookieItemInfo[]) => void
        ) => void
    }
    declarativeNetRequest: {
        /**bắt và thay đổi api đưuọc gọi */
        updateDynamicRules: (input: {
            removeRuleIds: number[]
            addRules: RuleInfo[]
        }) => void
    }
}