<template>
<div class="fc">
  <v-layout row>
    <v-flex xs8 sm8 offset-sm2>
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-list-tile :key="index" avatar ripple >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.username }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.vote }}</v-list-tile-action-text>
                <span>votes</span>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.answer }}</v-list-tile-action-text>
                <span>answer</span>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.view }}</v-list-tile-action-text>
                <span>views</span>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
export default {
  props:['items'],
    data () {
      return {
        items: [
          { vote:13 ,answer:1 ,view: 2, username: 'Ali Connors', title: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
          { vote:13 ,answer:1 ,view: 2, username: 'me, Scrott, Jennifer', title: "Wish I could come, but I'm out of town this weekend." },
          { vote:13 ,answer:1 ,view: 2, username: 'Oui oui',  title: 'Do you have Paris recommendations? Have you ever been?' },
         ]
      }
    },

}
</script>

<style>
.fc{
  margin-top: 70px;
}
</style>
