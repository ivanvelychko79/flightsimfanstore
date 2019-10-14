<template>
<v-dialog width="400px" v-model="dialog">
    <template v-slot:activator="{ on }">
        <v-btn dark color="#306378" class="mr-3" v-on="on">Редактировать</v-btn>
    </template>
    <v-card>
        <v-container>
            <v-layout row>
                <v-flex xs12>
                    <v-card-title>
                        <h4 class="text--primary">Редактировать</h4>
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
                <v-flex xs12>
                    <v-card-text>
                            <v-text-field label="Title" name="title" type="text" v-model="editedTitle"></v-text-field>
                            <v-text-field label="Description" name="description" type="text" multi-line v-model="editedDescription"></v-text-field>
                    </v-card-text>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
                <v-flex xs12>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn dark color="#306378" outlined @click='onCancel'>Отмена</v-btn>
                        <v-btn dark color="#306378" @click='onSave'>Сохранить</v-btn>
                    </v-card-actions>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    props: ['product'],
    data() {
        return {
            dialog: false,
            editedTitle: this.product.title,
            editedDescription: this.product.description
        }
    },
    methods: {
        onCancel() {
            this.editedTitle = this.product.title
            this.editedDescription = this.product.description
            this.dialog = false
        },
        onSave() {
            if (this.editedTitle !== '' && this.editedDescription !== '') {
                this.$store.dispatch('updateProduct', {
                    title: this.editedTitle,
                    description: this.editedDescription,
                    id: this.product.id
                })
                this.dialog = false
            }
        }
    }
}
</script>
