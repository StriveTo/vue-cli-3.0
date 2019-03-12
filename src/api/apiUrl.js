/**
 * 配置应用所有接口地址，利于维护
 */
import globalInfo from './config'

const { root } = globalInfo
const {
  module,
} = {
  module: {
    interfaceUrl: `${root}loanAuth/getAmount`, // 接口地址
  },
}
export { module }
