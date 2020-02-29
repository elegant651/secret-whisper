<template>
  <v-container fluid>
    <BoardComp :items="items" />

    <v-btn
      class="btnAdd"
      dark
      fab
      top
      right
      color="pink"
      @click="add"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="500px">      
      <v-card>
        <v-card-title>
          <span class="headline">Add content</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="item.title" label="title"></v-text-field>
              </v-col>                  
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="item.content" label="content"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import firebase from "firebase"
import "firebase/firestore";
import BoardComp from '@/components/BoardComp.vue'

export default {  
  components: {
    BoardComp
  },
  data() {
    return {
      dialog: false,
      item: {},
      items: []
    }    
  },
  async mounted() {
    await this.getFeeds()
  },
  methods: {
    async getFeeds () {
      const db = firebase.firestore()      
      db.collection("feed_forweb").orderBy('created_at', 'desc').limit(8).onSnapshot(async (snapshot) => {
        let newArr = []
        // console.log(snapshot)        

        snapshot.forEach(async (doc) => {
          // const fullpath = doc.data().fullpath
          // const url = await storage.ref(fullpath).getDownloadURL()
          newArr.push({...doc.data()})
        })
        
        this.items = newArr
      })
    },

    add () {
      this.dialog = true
    },

    close () {
      this.dialog = false        
    },

    save () {
      if (this.item.title && this.item.content) {
        const db = firebase.firestore()
        db.collection("feed_forweb").add({
          user_name: 'tester',
          title: this.item.title,
          content: this.item.content,
          created_at: new Date()
        })
        .then((docRef) => {
          this.item = {}
          this.close()
        })
        .catch((error) => {
          console.error("error:", error)
          this.close()
        })      
      }
      
    },
  }
}
</script>

<style scoped>
.btnAdd {
  position: absolute;
  bottom: 20px;
}
</style>