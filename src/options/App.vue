<template>
  <Loading v-if="commonStore.is_loading_full_screen" type="FULL" size="50" />
  <div>
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { useCommonStore } from './store'
import { onMounted } from 'vue'
import { $t } from '../service/core/i18n'
import { check_chrome_support_keep_alive } from '../service/helper/chrome'
import { popup } from '../service/helper/alert'

import Loading from '../components/Loading.vue'

import type { CallbackResponse } from '../service/interface'

const commonStore = useCommonStore()

onMounted(() => {
  // thay đổi tiêu đề của trang
  document.title = `${$t('v1.common.title')} - ${$t('v1.common.description')}`

  checkChromeOld()

  preventComputerSleep()

  // lắng nghe các sự kiện được gửi đến từ background script
  chrome.runtime.onMessage.addListener((
    { from, to, event, data },
    sender,
    sendResponse
  ) => {
    // chỉ xử lý các event được gửi từ background script cho options page
    if (to !== 'OPTION' || from !== 'BACKGROUND') return true

    switch (event) {
      case 'SOME_THING': handleSomeThing(data, sendResponse)
        break
    }

    return true
  })
})

/**kiểm tra xem chrome có chạy được không */
function checkChromeOld() {
  if (check_chrome_support_keep_alive()) return

  popup('error', $t('v1.view.options.app.old_chrome'))
}
/**xử lý sự kiện từ bg */
function handleSomeThing(data: any, sendResponse: CallbackResponse) {
  // kết thúc
  sendResponse({
    from: 'OPTION',
    to: 'BACKGROUND',
    event: 'SOMETHING',
    data: {},
  })

  // do something
}
/**ngăn chặn không cho máy tính đi vào chế độ ngủ */
function preventComputerSleep() {
  // tạo 1 thẻ video vào dom
  const videoElement = document.createElement('video')

  // tắt tiếng của video
  videoElement.muted = true

  // gắn link cho video 
  videoElement.src = 'https://www.w3schools.com/tags/movie.mp4'

  // phát video
  videoElement.play()

  // lắng nghe sự kiện video đã phát xong
  videoElement.addEventListener('ended', () => {
    // tua video về ban đầu
    videoElement.currentTime = 0

    // phát lại video
    videoElement.play()
  })
}
</script>
<style lang="scss"></style>