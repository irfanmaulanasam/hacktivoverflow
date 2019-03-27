<template>
  <v-layout row class="content">
    <v-flex xs8 sm8 offset-sm2>
        <v-card>
            <v-card-title>
                {{items[0].username}}
            </v-card-title>
            <v-card-subtitle>
                {{items[0].question}}
            </v-card-subtitle>
        <template>
            <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.</p>
            </div>
        </template>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
    data () {
      return {
        items: [
          { vote:13 ,answer:1 ,view: 2, username: 'Ali Connors', question: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" 
            ,description:`
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, similique et. Nihil praesentium pariatur quisquam repudiandae repellat, quae perspiciatis consequuntur necessitatibus maxime. Tenetur culpa dolores beatae recusandae maiores, eos porro.`
          },
          { vote:13 ,answer:1 ,view: 2, username: 'me, Scrott, Jennifer', question: "Wish I could come, but I'm out of town this weekend." },
          { vote:13 ,answer:1 ,view: 2, username: 'Oui oui',  question: 'Do you have Paris recommendations? Have you ever been?' },
         ]
      }
    }
}
</script>
<style>
.content{
    margin-top: 30px;
}
</style>


