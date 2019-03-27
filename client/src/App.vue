<template>
  <v-app>
    <toolbar :url="url" :signin="usersignin" />
    <router-view :url="url" :signin="usersignin" >
      </router-view>
      <v-footer>
      <footbar/>
      </v-footer>
  </v-app>
</template>

<script>
const baseURL = `https://localhost:3000`
import toolbar from './components/core/Toolbar'
import footbar from './components/core/footbar'

export default {
  name: 'App',
  components: {
    toolbar,
    footbar
  },
  data () {
    return {
      signin:false,
      url:`${baseURL}`
    }
  },
  methods:{
    firstPage(){
      this.$router.push(`/`)
    },
    home(){
      this.$router.push(`/dashboard`)
    },
    usersignin () {
      this.signin = true
    },
    signout () {
      localStorage.clear()
      this.signin = false
      this.$router.push(`/`)
    }

  },
  mounted(){
    if(localStorage.getItem('token')){
      this.signin = true
    }
  }
}
</script>
