import Vue from 'vue'

/**
 * 为页面添加标题
 * 使用例子：
 * <div v-title data-title="登录页" ></div>
 * @param data-title 标题
 */
const title = Vue.directive('title', {
  bind(el) {
    if (el.dataset.title) document.title = el.dataset.title
  },
  update(el) {
    if (el.dataset.title) document.title = el.dataset.title
  },
})

/**
 * 为页面添加描述
 * 使用例子：
 * <div v-title data-description="描述内容" ></div>
 * @param data-description 描述内容
 */
const description = Vue.directive('description', {
  bind(el) {
    document.querySelector("meta[name='description']").setAttribute('content', el.dataset.description)
  },
  update(el) {
    document.querySelector("meta[name='description']").setAttribute('content', el.dataset.description)
  },
})

export { title, description }
