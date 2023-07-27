/**zip lại file dist một cách tự động sau khi build */

const fs = require('fs')
const archiver = require('archiver')
const { name, version } = require('../package.json')

const FILENAME = `${name}_${version}.zip`
const ARCHIVE = archiver('zip', { zlib: { level: 9 } })
const OUTPUT = fs.createWriteStream(`./${FILENAME}`)

ARCHIVE.pipe(OUTPUT)
ARCHIVE.directory('dist/', false)
ARCHIVE.finalize()

ARCHIVE.on('error', e => console.log('Error when zip dist:', e))
OUTPUT.on('close', () => process.stdout.write(`Done zip ${OUTPUT.path} ${ARCHIVE.pointer()}\n`))