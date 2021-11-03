<template>
    <div class="container">
        <div class="tasks">
            <div class="tasks-content">
                <div class="tasks-list">
                    <div class="task" v-for="task in tasks" :key="task.id" @click="showTask(task.id)">
                        <div class="task-title">
                            {{ task.title }}
                        </div>
                        <div class="task-info">
                            by {{ task.user.name }} at {{ moment(task.created_at).format('YYYY-MM-DD') }}
                        </div>
                    </div>
                </div>
                <div class="tasks-footer">
                    <button class="button" @click="openModal">Add new</button>
                </div>
            </div>
        </div>
        <div class="modal" ref="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="pull-right">
                        <span class="close-button" @click="closeModal"></span>
                    </span>
                </div>
                <div class="modal-body">
                    <form class="form">
                        <label for="title">Title</label>
                        <input type="text" name="title" v-model="task.title">
                        <label for="description">Description</label>
                        <textarea name="description" v-model="task.description" rows="3"></textarea>
                        <button class="button" @click="addTask">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment"

export default {
    data() {
        return {
            moment: moment,
            task: {
                title: '',
                description: '',
            },
        }
    },
    mounted() {
        this.getTasks();
    },
    computed: {
        tasks() {
            return this.$store.getters['task/getTasks'];
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('user/logout').then(() => {
                this.$router.push('/login');
            });
        },
        getTasks() {
            this.$store.dispatch('task/getTasks');
        },
        openModal() {
            this.$refs.modal.style.display = 'block';
        },
        showTask(id) {
            this.$router.push(`/${id}`);
        },
        closeModal() {
            this.$refs.modal.style.display = 'none';
        },
        addTask() {
            this.$store.dispatch('task/addTask', {
                title: this.task.title,
                description: this.task.description,
            }).then(() => {
                this.closeModal();
                this.task.title = '';
                this.task.description = '';
            });
        },
    }
}
</script>

<style scoped>

</style>