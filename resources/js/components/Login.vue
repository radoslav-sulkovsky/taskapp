<template>
    <v-app>
        <v-main>
            <v-container>
                <v-form ref="form" class="mx-4" lazy-validation>
                    <v-text-field
                        v-model="email"
                        label="Username (e-mail)"
                        placeholder="user@example.com"
                        required
                        :rules="validation.email"
                    >
                    </v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        placeholder="password"
                        :type="'password'"
                        required
                        :rules="validation.password"
                    ></v-text-field>
                    <v-btn class="mt-2" color="primary" @click="login">Sign in</v-btn>
                </v-form>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            validation: {
                email: [
                    v => !!v || 'E-mail is required',
                    v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
                ],
                password: [
                    v => !!v || 'Password is required',
                ],
            },
        }
    },
    computed: {
        auth() {
            return this.$store.getters['user/getAuth']
        }
    },
    watch: {
        auth(newVal, old) {
            if(newVal) {
                this.$router.push('/');
            }
        },
    },
    methods: {
        async login() {
            let validate = this.$refs.form.validate();

            if(!validate) {
                return;
            }

            const credentials = {
                email: this.email,
                password: this.password,
            }

            this.$store.dispatch('user/login', credentials);
        }
    }
}
</script>

<style>

</style>