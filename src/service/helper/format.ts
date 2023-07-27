import _ from 'lodash'

/**
 * format số thành dạng hiển thị tiền tệ
 * vd: 10000000 -> 10.000.000
 */
export const currency = (input?: number) => {
    if (!input) return ''

    let result = new Intl.NumberFormat('vi').format(input)

    return _.isNaN(result) ? '' : result
}

/**
 * format tiếng việt thành tiếng việt không dấu
 * đổi toàn bộ chữ hoa thành chữ thường
 * 
 * vd: Xin chào các bạn  -> xin chao cac ban
 */
export const nonAccentVn = (input: string) => {
    input = input.toLowerCase()

    input = input.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
    input = input.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
    input = input.replace(/ì|í|ị|ỉ|ĩ/g, "i")
    input = input.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
    input = input.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
    input = input.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
    input = input.replace(/đ/g, "d")
    input = input.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "")
    input = input.replace(/\u02C6|\u0306|\u031B/g, "")

    return input
}

/**tạo mới obj để ngắt sự liên kết trong ô nhớ */
export const copy = (object: Object) => JSON.parse(JSON.stringify(object))

/**chia mảng dữ liệu thành các phần bằng nhau */
export const split_data = (list_data: any[], title: string, limit: number) => {
    const RESULT: {
        title: string
        data: any
    }[] = []
    // khai báo index của từng tệp, để tạo thành id của tệp
    let index = 0
    // khai báo biến để nhảy qua từng phần của tệp
    let skip = 0

    // sử dụng vòng lặp để chạy qua toàn bộ tệp
    while (skip < list_data.length) {
        // tạo ra id cho tệp và tự động tăng index cho lần tiếp theo
        const TITLE = `${title}${index++}`

        // tính toán index phân đoạn tiếp theo
        const NEW_SKIP = skip + limit

        // cắt ra đoạn dữ liệu cần thiết
        const DATA = list_data.slice(skip, NEW_SKIP)

        // thêm vào kết quả
        RESULT.push({ title: TITLE, data: DATA })

        // nhảy đến phân đoạn tiếp theo
        skip = NEW_SKIP
    }

    return RESULT
}