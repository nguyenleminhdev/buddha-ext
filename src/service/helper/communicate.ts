import { Cb, MessagePayload, UpdateValue } from '../interface'

/**gửi event đến các mền tảng */
export const send_message = (input: MessagePayload, proceed?: Cb) => chrome
    .runtime
    .sendMessage(input, r => {
        if (proceed) {
            if (r?.data?.error) return proceed(r.data.error)
    
            proceed(null, r?.data?.result)
        }
    })

/**gửi event từ option page đến background */
export const option_to_background = (
    event: string,
    data: any,
    proceed: Cb
) => send_message({
    from: 'OPTION',
    to: 'BACKGROUND',
    event,
    data
}, proceed)

/**gửi event từ background đến option page */
export const background_to_option = (
    event: string,
    data: UpdateValue,
    proceed: Cb
) => send_message({
    from: 'BACKGROUND',
    to: 'OPTION',
    event,
    data
}, proceed)