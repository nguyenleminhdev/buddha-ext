import { RuleInfo } from '../interface'

/**
 * - khi bg-script request fetch, sẽ lấy host trong url và set làm origin, để 
 * giả lập như api được gọi từ trang gốc, để nhảy qua cors
 * - hàm nay phải được để trên cùng của bg.js
 * - cần quyền 'declarativeNetRequest'
 */
export const syncOrigin = (url_list: string[]) => {
    /**
     * lắng nghe sự kiện khi ext được cài đặt, sau đó thay đổi thủ công rule 
     * của declarativeNetRequest, thay thế cho declarative_net_request trong 
     * file manifest.json
     */
    chrome.runtime.onInstalled.addListener(() => {
        let rule_id = 1

        const RULE_LIST: RuleInfo[] = url_list.map(url => ({
            id: rule_id++,
            action: {
                type: 'modifyHeaders',
                requestHeaders: [
                    {
                        header: 'Referer',
                        operation: 'set',
                        value: `${url}/`,
                    },
                    {
                        header: 'Origin',
                        operation: 'set',
                        value: url,
                    }
                ],
            },
            condition: {
                domains: [chrome.runtime.id],
                urlFilter: `|${url}/`,
                resourceTypes: ['xmlhttprequest'],
            },
        }))

        // thay đổi declarative_net_request
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: RULE_LIST.map(rule => rule.id),
            addRules: RULE_LIST,
        })
    })
}