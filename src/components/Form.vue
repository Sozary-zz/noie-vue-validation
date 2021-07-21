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

          <v-row class="mb-7 mt-1">
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
          <v-btn
            color="primary"
            @click="validateInfo"
            :disabled="!infoValidated"
          >
            Continue
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="primary" height="200px"></v-card>

          <v-btn color="primary" @click="step = 3"> Continue </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  name: "Form",

  data: () => ({
    step: 1,
    cities: ["Copenhagen", "Aarhus", "Odense", "Aalborg"],
    infoValidated: false,
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
    validateInfo() {},
  },
};
</script>
