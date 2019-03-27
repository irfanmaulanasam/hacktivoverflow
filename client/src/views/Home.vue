<template>
  <firstcontent :data="items"/>
</template>

<script>
  import firstcontent from '../components/base/firstcontent'
  import axios from 'axios'
import { error } from 'util';
  export default {
    props:['url'],
    data:()=>({
      question:null,
      url:'http://localhost:3000'
    }),
    components: {
      firstcontent,
    },
    mounted(){
      axios.get(`${this.url}/question `)
      .then(data=>{
        this.question = data 
      })
      .catch(error=>{
        console.error()
      })
    }
  }
</script>
