<template>
     <v-toolbar app flat>
      <v-toolbar-title class="headline text-uppercase">
        <span>hacktivoverflow</span>
        <span class="font-weight-light">just began</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
            v-model="search"
            label="search you wanna find here"
            required
          >
          </v-text-field>
          <div v-if="search">
            <v-btn
                flat
            >search
            </v-btn>
          </div>
          <!-- start sign in dialog -->
          <v-layout row justify-center>
            <v-dialog v-model="signindialog" persistent max-width="350px">
                <template v-slot:activator="{ on }">
                    <span class="mr-2" dark v-on="on">
                        <v-btn flat>
                            Sign in
                        </v-btn>
                    </span>
                </template>
                <v-card>
                <v-card-title>
                    <span class="headline">User Sign in</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                        <v-text-field v-model="email" label="username/email*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                        <v-text-field v-model="password" label="Password*" type="password" required></v-text-field>
                        </v-flex>
                    </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="getsignin">sign in</v-btn>
                    <v-btn color="blue darken-1" flat @click="resetform">cancel</v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
            </v-layout>
    <!-- end dialog sign in -->
    <!-- start dialog sign up -->
          <v-layout row justify-center>
            <v-dialog v-model="signupdialog" persistent max-width="550px">
                <template v-slot:activator="{ on }">
                    <span class="mr-2" dark v-on="on">
                        <v-btn flat >
                            Sign up
                        </v-btn>
                    </span>
                </template>
                <v-card>
                <v-card-title>
                    <span class="headline">User Sign up</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                        <v-text-field v-model="name" label="name*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                        <v-text-field v-model="username" label="username*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                        <v-text-field v-model="job" label="job*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                        <v-text-field v-model="email" label="email*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                        <v-text-field v-model="password" label="Password*" type="password" required></v-text-field>
                        </v-flex>
                    </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="getsignup">sign up</v-btn>
                    <v-btn color="blue darken-1" flat @click="resetform">cancel</v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
            </v-layout>
    <!-- end dialog sign up -->
    </v-toolbar>
</template>
<script>
// import { mapState, mapActions } from 'vuex';
import axios from 'axios'

export default {
    props:['url','signin'],
  components:{
    },
  data: () => ({
      name:'',
      username:'',
      job:'',
      email:'',
      password:'',
      signindialog: false,
      signupdialog: false,
      search:'',
    }),
  methods: {
    getsignin() {
      let obj = {
        email: this.email,
        password: this.password
      }
      console.log(obj)
      axios
      .post(`${this.url}/users/signin`,obj)
        .then((response) => {
            this.signindialog = false
            localStorage.setItem('token', response.data.token)
            this.$router.push('/dashboard')
        })
        .catch((error) => {
          if (status.code === 404) {
            console.log(error)
            this.signindialog = false
            this.signupdialog = true
          } else {
            console.log(error)
          }
        })
    },
    getsignup(){
      console.log('masuk sini')
      let obj = {
        name: this.name,
        username:this.username,
        email:this.email,
        password:this.password,
        job:this.job
      }
      axios
      .post(`${this.url}/users/signup`, obj)
        .then((response)=>{
          console.log(response)
            this.name=''
            this.username=''
            this.email=''
            this.password=''
            this.job =''
            this.signindialog = false
            localStorage.setItem('token', response.data.token)
            this.$router.push('/dashboard')
        })
        .catch(error=>{
            console.log(error)
        })
    },
    resetform(){
      this.name=''
      this.username=''
      this.email=''
      this.password=''
      this.job =''
      this.signindialog = false
      this.signupdialog = false
    }
  }


}
</script>
