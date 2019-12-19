<template>
  <div>
    <BoardTable :items="items" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

import BoardTable from '@/components/BoardTable'

export default {
  components: {
    BoardTable
  },
  data() {
    return {
      headers: [
        { text: 'Assignee_id', value: 'assignee_id' },        
        { text: 'Actions', value: 'action', sortable: false }
      ],
      items: [
        {
          id: 1,
          title: 'new secret message',
          created_at: '09 Jan 2020'
        },
        {
          id: 2,
          title: 'new secret message2',
          created_at: '01 Jan 2020'
        }
      ]
    }
  },  
  computed: {
    // ...mapGetters('employeeForm', {
    //   items: 'pendingReviews'
    // })
  },
  async mounted() {    
    
  },
  methods: {
    ...mapActions('employees', [
      'getEmployee'
    ]),
    ...mapMutations('reviews', [
      'setReviews'
    ]),
    ...mapMutations('reviewForm', [
      'setReview'
    ]),
    ...mapActions('reviewForm', [
      'registerReview',
      'updateReview'
    ]),

    async onFeedbackItem (id, item) {      
      this.setReview(item)
      await this.updateReview(id)
    }
  }
}

</script>