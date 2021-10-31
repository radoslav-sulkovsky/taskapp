<template>
  
</template>

<script>
export default {
    mounted() {
        console.log('mounted logout');

        this.$store.dispatch('user/logout').then(() => {
            this.$router.push('/login');
        })
    }
}
</script>

<style>

</style>