<template>
<v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
            <v-card class="elevation-12">
                <v-toolbar color="#67A2AB" dark flat>
                    <v-toolbar-title>Авторизация</v-toolbar-title>

                    <template v-slot:activator="{ on }">
                        <v-btn icon large href="https://codepen.io/johnjleider/pen/pMvGQO" target="_blank" v-on="on">
                            <v-icon>mdi-codepen</v-icon>
                        </v-btn>
                    </template>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field label="Email" name="email" prepend-icon="person" type="email" v-model="email" :rules='emailRules'></v-text-field>

                        <v-text-field label="Password" name="password" prepend-icon="lock" type="password" v-model="password" :rules='passwordRules' :counter="6"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#306378" dark @click="onSubmit" :loading='loading' :disabled='!valid || loading'>
                        Вход</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            valid: false,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 6) || 'Password must be equal or than 6 characters'
            ]
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        }
    },
    methods: {
        onSubmit() {
            if (this.$refs.form.validate()) {
                const user = {
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch('loginUser', user)
                    .then(() => {
                        this.$router.push('/')
                    })
                    .catch(() => {})
            }
        }
    },
    created() {
        if (this.$route.query['loginError']) {
            this.$store.dispatch('setError', 'Please log in to access this page')
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Serif:400,500,700&display=swap&subset=cyrillic,cyrillic-ext');

.font {
    font-family: 'IBM Plex Serif', serif;
}
</style>
