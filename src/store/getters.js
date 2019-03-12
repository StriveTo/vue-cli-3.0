const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  status: state => state.user.status,
  age: state => state.moduleA.age,
  list: state => state.moduleB.list,
}
export default getters
