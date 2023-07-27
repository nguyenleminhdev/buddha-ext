import type { CallbackResponse } from './chrome'

/**hàm xử lý sự kiện được gửi đến background */
export type HandlePlatform = (
    event: string,
    data: any,
    sendResponse: CallbackResponse
) => void

/**hàm xử lý sự kiện cho từng event */
export type HandleEvent = (data: any, sendResponse: CallbackResponse) => void