<template>
  <v-container>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1" color="primary">
          Information
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2" color="primary">
          End
        </v-stepper-step>

        <v-divider></v-divider>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <transition name="fade">
            <v-alert border="bottom" color="red" dark v-if="error">
              <ul>
                <li v-for="(message, index) of errorMessages" :key="index">
                  {{ message }}
                </li>
              </ul>
            </v-alert>
          </transition>
          <v-row>
            <v-col :cols="5">
              <v-text-field
                class="mb-1 mt-5"
                label="Email"
                placeholder="Email"
                color="primary"
                outlined
                v-model="email"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mb-3 mt-1">
            <v-col :cols="5">
              <v-text-field
                placeholder="Zip code"
                label="Zip code"
                color="primary"
                outlined
                v-model="zip"
              ></v-text-field
            ></v-col>
            <v-col :cols="5">
              <v-autocomplete
                label="City"
                placeholder="City"
                color="primary"
                :items="cities"
                outlined
                v-model="city"
              ></v-autocomplete
            ></v-col>
          </v-row>

          <v-btn color="primary" @click="validateInfo" :loading="loadValidate">
            Continue
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="text-center">
            <h3>Congratulation, everything looks fine :)</h3>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import { apiValidateInfo } from "@/services/api";

export default {
  name: "Form",

  data: () => ({
    step: 1,
    errorMessages: [],
    loadValidate: false,
    error: false,
    cities: ["Copenhagen", "Aarhus", "Odense", "Aalborg"],
  }),
  computed: {
    email: {
      get() {
        return this.$store.getters.getEmail;
      },
      set(value) {
        this.$store.dispatch("updateEmail", value);
      },
    },
    zip: {
      get() {
        return this.$store.getters.getZip;
      },
      set(value) {
        this.$store.dispatch("updateZip", value);
      },
    },
    city: {
      get() {
        return this.$store.getters.getCity;
      },
      set(value) {
        this.$store.dispatch("updateCity", value);
      },
    },
  },
  methods: {
    validateInfo() {
      this.loadValidate = true;
      this.error = false;

      apiValidateInfo({
        email: this.email,
        zip: this.zip,
        city: this.city,
      }).then((response) => {
        this.loadValidate = false;
        if (response.data.statusCode !== 200) {
          this.error = true;
          this.errorMessages = response.data.messages;
        } else {
          this.step = 2;
        }
      });
    },
  },
};
</script>
<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>