import Vue from 'vue'
import Vuex from 'vuex'

import employees from '@/store/modules/employees'
import employeeForm from '@/store/modules/employee-form'
import reviews from '@/store/modules/reviews'
import reviewForm from '@/store/modules/review-form'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    employees,
    employeeForm,
    reviews,
    reviewForm
  }
})
