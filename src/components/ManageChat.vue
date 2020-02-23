<template>
  <v-data-table
    :headers="headers"
    :items="items" 
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>List of Chats</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Add Chat</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.index" label="Index" type="number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.admin" label="Admin"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.participantCode" type="number" label="participantCode"></v-text-field>
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
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <!-- <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon> -->
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>      
    </template>
    
  </v-data-table>
</template>

<script>
// import moment from 'moment'
// import firebase from "firebase"
// import "firebase/firestore";

  export default {    
    data: () => ({
      dialog: false,
      items: [{
        index: 1,
        admin: 'admin123',
        title: 'Test title',
        participantCode: 1234,
        created_at: new Date()
      }],
      headers: [
        {
          text: 'Id',
          value: 'id',
          align: 'left',
        },
        {
          text: 'index',
          value: 'index',
          align: 'left',
        },
        {
          text: 'Admin',
          sortable: false,
          value: 'admin',
        },
        {
          text: 'Title',
          sortable: false,
          value: 'title',
        },
        {
          text: 'Participant Code',
          sortable: false,
          value: 'participantCode',
        },
        {
          text: 'created_at',
          value: 'created_at'
        },
        { text: 'Actions', value: 'action', sortable: false },
      ],      
      editedIndex: -1,
      editedItem: {
      	index: 1,
        admin: '',
        title: '',
        participantCode: 1234
      },
      defaultItem: {
      	index: 1,
        admin: '',
        title: '',
        participantCode: 1234
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Add Chat' : 'Edit Chat'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    async mounted() {
      // await this.getAllChats()	
    },

    methods: {
      async getAllChats () {
        let results = []
        const db = firebase.firestore()
	    await db.collection('live_channels_forweb').orderBy('created_at', 'desc').onSnapshot(async (snapshot) => {
	    	console.log(snapshot)
	        snapshot.forEach((doc) => {
	          const obj = {
	            id: doc.id,
	            ...doc.data()
	          }
	          obj.created_at = moment(doc.created_at).format()
	          results.push(obj)
	        })	        

	        this.items = results
	      })	
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      async deleteItem (item) {
      	const db = firebase.firestore()
        const chatId = item.id
        if(confirm('Are you sure you want to delete this item?')) {
          await db.collection('live_channels_forweb').doc(chatId).delete()

          window.location.reload()
        }
      },

      close () {
        this.dialog = false
      },

      async save () {
      	const db = firebase.firestore()
        if (this.editedIndex > -1) {
          //update
          const chatId = this.items[this.editedIndex].id
          //
          
        } else {
          //create
          const chatObj = {
            index: this.editedItem.index,
            admin: this.editedItem.admin,
            title: this.editedItem.title,
            participantCode: this.editedItem.participantCode,
            created_at: new Date()
          }

          await db.collection("live_channels_forweb").add(chatObj)
		    .then(ref => {
		      window.location.reload()
		    }).catch(error => {
		      console.error(error)
		    })
        }
        this.close()
      },
    },
  }
</script>