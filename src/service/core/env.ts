import development from '../env/development'
import staging from '../env/staging'
import production from '../env/production'

import { Env, Cb } from '../interface'

/**load các config env tuỳ theo môi trường */
export const loadEnv = (proceed: Cb) => {
    // @ts-ignore
    const NODE_ENV = import.meta.env.VITE_APP_ENV || 'development'

    import(`../env/${NODE_ENV}.ts`).then(r => {
        globalThis.$env = r.default

        proceed()
    })
}

/**load các config env tuỳ theo môi trường */
export const loadEnvHand = (proceed: Cb) => {
    // @ts-ignore
    const NODE_ENV: string = import.meta.env.VITE_APP_ENV || 'development'

    const ENV: {
        [index: string]: Env
    } = { development, staging, production }

    globalThis.$env = ENV[NODE_ENV]

    proceed()
}