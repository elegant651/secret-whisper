<template>
<div class="rootWrap">
  <v-row>	
    <div class="detail ml-2">      
      <h4>Inssa chat title</h4>
    </div>
    <v-spacer></v-spacer>
    <v-btn icon class="btnHelp mr-2"><v-icon>help</v-icon></v-btn>
  </v-row>
</div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  data: () => ({
    
  }),  
  computed: {
    ...mapGetters('room', [
      'roomInfo'
    ])
  }

}

</script>
<style scoped>

.rootWrap {
  width: 100%;
  padding: 20px;
  height: 80px;
  background: #fff;
}

.detail h2 {
  font-family: Roboto;
  font-size: 22px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;	
}

.detail h4 {
  font-family: Roboto;
  font-size: 17px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.4);
}

.btnHelp {
  width: 41px;
  height: 41px;  
}

</style>