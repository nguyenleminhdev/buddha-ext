import { version } from '../package.json'

/**tên của extension sẽ được hiển thị */
const name = 'Buddha extension'
/**miêu tả chức năng của extension */
const description = 'Your description'
/**icon của extension */
const icons = {
  16: 'src/assets/img/16.png',
  48: 'src/assets/img/48.png',
  128: 'src/assets/img/128.png'
}
/**giao diện của popup page được load từ link này */
const popup_page = 'src/popup/index.html'
/**giao diện của option page được load từ link này */
const options_page = 'src/options/index.html'
/**script của background sẽ được load từ link này */
const background_source = 'src/background/index.ts'
/**các script được inject vào chrome tab */
const content_scripts = {
  matches: ['*://*/*'],
  resources: ['src/content-script/index.ts']
}
/**các url mà extension được phép chỉnh sửa */
const host_permissions = ['<all_urls>']
/**danh sách các quyền mà extension cần sử dụng */
const permissions = [
  'activeTab',
  'alarms',
  'background',
  'bookmarks',
  'browsingData',
  'clipboardRead',
  'clipboardWrite',
  'contentSettings',
  'contextMenus',
  'cookies',
  'debugger',
  'declarativeContent',
  'declarativeNetRequest',
  'declarativeNetRequestFeedback',
  'desktopCapture',
  'downloads',
  'fontSettings',
  'gcm',
  'geolocation',
  'history',
  'identity',
  'idle',
  'management',
  'nativeMessaging',
  'notifications',
  'pageCapture',
  'power',
  'printerProvider',
  'privacy',
  'proxy',
  'search',
  'sessions',
  'storage',
  'tabCapture',
  'tabs',
  'topSites',
  'tts',
  'ttsEngine',
  'unlimitedStorage',
  'webNavigation',
  'system.cpu',
  'system.display',
  'system.memory',
  'system.storage',
  'declarativeNetRequest', // thay đổi header của request
]

export const manifest = {
  manifest_version: 3,
  name,
  description,
  version,
  icons,
  action: { default_popup: popup_page },
  options_page,
  background: { service_worker: background_source, type: 'module' },
  content_scripts: [
    {
      all_frames: true,
      js: content_scripts.resources,
      matches: content_scripts.matches,
      run_at: 'document_idle'
    }
  ],
  web_accessible_resources: [content_scripts],
  host_permissions,
  permissions,
}