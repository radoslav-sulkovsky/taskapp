<template>
    <v-app>
        <v-main>
            <v-container>
                <v-row justify="center" class="mx-5">
                    <v-col xs="12" sm="8">
                        <v-btn class="float-right" color="secondary" @click="logout">Logout</v-btn>
                    </v-col>
                </v-row>
                <v-row justify="center" class="ma-5">
                    <v-col xs="12" sm="8">
                        <v-container class="text-h6">
                            Task list
                        </v-container>
                        <v-list>
                            <v-list-item-group>
                                <v-list-item v-for="(task) in tasks" :key="task.id" @click="showTask(task.id)">
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{ task.title }}
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            by {{ task.user.name }} at {{ moment(task.created_at).format('YYYY-MM-DD') }}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-col>
                </v-row>
                <v-row justify="center" class="ma-5">
                    <v-col xs="12" sm="8">
                        <v-dialog
                            v-model="dialogAddTask"
                            persistent
                            max-width="300px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    v-bind="attrs"
                                    v-on="on"
                                    color="success">Add new</v-btn>
                            </template>

                            <v-card>
                                <v-card-title>
                                    <span class="text-h6">Add new task</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col>
                                                <v-form ref="form">
                                                    <v-text-field
                                                        v-model="task.title"
                                                        :rules="validation.title"
                                                        label="Title">
                                                    </v-text-field>
                                                    <v-textarea
                                                        v-model="task.description"
                                                        :rules="validation.description"
                                                        label="Description">
                                                    </v-textarea>
                                                </v-form>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        @click="dialogAddTask = false"
                                        color="blue"
                                        text>
                                        Close
                                    </v-btn>
                                    <v-btn
                                        @click="addTask"
                                        color="green"
                                        text>
                                        Add
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import moment from "moment"

export default {
    data() {
        return {
            moment: moment,
            dialogAddTask: false,
            task: {
                title: '',
                description: '',
            },
            validation: {
                title: [
                    v => !!v || 'Title is required',
                ],
                description: [
                    v => !!v || 'Description is required',
                ],
            }
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
        addTask() {
            let validate = this.$refs.form.validate();

            if(!validate) {
                return;
            }

            this.$store.dispatch('task/addTask', {
                title: this.task.title,
                description: this.task.description,
            }).then(() => {
                this.dialogAddTask = false;

                this.task.title = '';
                this.task.description = '';
            });
        },
        showTask(id) {
            this.$router.push(`/${id}`);
        }
    }
}
</script>

<style scoped>
    .v-list {
        height: 50vh;
        overflow-y: auto;
    }

    .v-list-item__content:hover > .v-list-item__title {
        text-decoration: underline;
    }
</style>