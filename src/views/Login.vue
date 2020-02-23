<template>
<v-container fluid>
  <v-row wrap>
    <v-col>
      <CommonLeftPanel class="d-none d-sm-flex" />
    </v-col>
    <v-col>
      <v-card class="d-flex align-center justify-center" tile outlined style="height: 100vh;">
        <LoginBox v-on:login="onLogin" />
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import firebase from "firebase"
import "firebase/auth" 
import CommonLeftPanel from '@/components/chat/CommonLeftPanel'
import LoginBox from '@/components/chat/LoginBox'
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  components: { LoginBox, CommonLeftPanel },

  async mounted() {
    await this.getChatInfo()
  },

  methods: {
    ...mapMutations('profile', [
      'setData'
    ]),
    ...mapMutations('room', [
      'setRoomInfo'
    ]),
    async getChatInfo () {
      const db = firebase.firestore()
      await db.collection('live_channels_forweb').orderBy('created_at', 'desc').limit(1).onSnapshot(async (snapshot) => {

          snapshot.forEach((doc) => {
            const roomInfo = {...doc.data(), id: doc.id}
            this.setRoomInfo(roomInfo)
            return
          })

        })
    },
    onLogin(userType, nickname) {
      firebase.auth().signInAnonymously().then(userRecord =>  {
        const uid = userRecord.user.uid

        this.setData({
          userId: uid,
          nickname: nickname,
          profileUrl: '',
          isActive: true,
          userType: userType
        })


        this.$router.push('/chat')

      }).catch((error) => {
        console.error(error)
      })

      if (userType===0) {
        //https://firebase.google.com/docs/auth/web/anonymous-auth
        //https://docs.sendbird.com/javascript/authentication

      } else if (userType===1){
        //https://firebase.google.com/docs/auth/web/anonymous-auth
      }
      
    }  
  }
}

</script>

<style scoped>
.col {
  padding: 0px !important;
}
</style>