<template>
    <div class="container">
        <div class="tasks">
            <div class="tasks-content">
                <div class="tasks-list">
                    <div class="task">
                        <div class="task-title">
                            {{ task.title }}
                        </div>
                        <div class="task-info">
                            by {{ task.user.name }} at {{ moment(task.created_at).format('YYYY-MM-DD') }}
                        </div>
                        <div class="task-description">
                            {{ task.description }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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