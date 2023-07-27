/**
 * custom lại sweetalert
 */

import Swal from 'sweetalert2'

import type { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2'
import { $t } from '../core/i18n'

import type { Cb } from '../interface'

/**thông báo dạng toast */
export const toast = (
    icon: SweetAlertIcon,
    title: string,
    position: SweetAlertPosition = 'top-end',
    timer: number = 3000
) => Swal.fire({
    icon,
    title,
    position,
    timer,
    toast: true,
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (r: HTMLElement) => {
        r.addEventListener('mouseenter', Swal.stopTimer)
        r.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

/**thông báo dạng confirm */
export const confirm = (
    icon: SweetAlertIcon,
    title: string,
    text: string,
    proceed: Cb
) => Swal
    .fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText: $t('v1.common.ok'),
        cancelButtonText: $t('v1.common.cancel')
    })
    .then(({ isConfirmed }: { isConfirmed: boolean }) => {
        if (!isConfirmed) return proceed(true)

        proceed()
    })

/**thông báo lỗi dạng toast */
export const toastError = (e: any) => {
    let title = e.message || e

    // tự động parser obj thành string
    if (typeof title === 'object') title = JSON.stringify(title, null, 4)

    toast('error', title)
}

/**tạo một modal dạng input */
export const modal_input = (
    title: string,
    description: string,
    proceed: Cb
) => Swal.fire({
    title,
    input: 'text',
    inputLabel: description,
    showCancelButton: true,
    confirmButtonText: $t('v1.common.ok'),
    cancelButtonText: $t('v1.common.cancel')
}).then(({ value }) => {
    if (!value) return proceed(true)

    proceed(null, value)
})

/**tạo một modal dạng textarea */
export const modal_area = (
    title: string,
    description: string,
    placeholder: string,
    proceed: Cb
) => Swal.fire({
    title,
    input: 'textarea',
    inputLabel: description,
    inputPlaceholder: placeholder,
    showCancelButton: true,
    confirmButtonText: $t('v1.common.ok'),
    cancelButtonText: $t('v1.common.cancel')
}).then(({ value }) => {
    if (!value) return proceed(true)

    proceed(null, value)
})

/**thông báo dạng popup */
export const popup = (icon: SweetAlertIcon, title: string) => Swal.fire({
    icon,
    title,
    confirmButtonText: $t('v1.common.ok'),
})