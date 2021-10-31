<template>
    <v-app>
        <v-main>
            <v-container>
                <v-row justify="center" class="ma-5">
                    <v-col xs="12" sm="8">
                        <v-card>
                            <v-card-title>
                                <span class="text-h6">{{ task.title }}</span>
                            </v-card-title>
                            <v-card-subtitle>
                                <span class="text-subtitle-1">by {{ task.user.name }} at {{ moment(task.created_at).format('YYYY-MM-DD') }}</span>
                            </v-card-subtitle>
                            <v-card-text>
                                {{ task.description }}
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import moment from "moment"

export default {
    props: ['id'],
    mounted() {
        this.getTask(this.$route.params.id);
    },
    data() {
        return {
            moment: moment,
        }
    },
    computed: {
        task() {
            return this.$store.getters['task/getCurrentTask'];
        }
    },
    methods: {
        getTask(id) {
            this.$store.dispatch('task/getTask', id);
        }
    }
}
</script>

<style>

</style>