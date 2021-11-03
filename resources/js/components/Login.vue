<template>
    <div class="container">
        <form class="form">
            <label for="email">E-mail</label>
            <input type="text" name="email" v-model="email">
            <label for="password">Password</label>
            <input type="password" name="password" v-model="password">
        </form>
        <button class="button" @click="login">Sign in</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
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