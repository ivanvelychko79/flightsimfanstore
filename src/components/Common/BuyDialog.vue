<template>
<v-dialog width="400px" v-model="dialog">
    <template v-slot:activator="{ on }">
        <v-btn dark color='#306378' v-on="on">Купить</v-btn>
    </template>
    <v-card>
        <v-container>
            <v-layout row>
                <v-flex xs>
                    <v-card-title>
                        <h4 class="text--primary">Хотите приобрести этот товар?</h4>
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
                <v-flex xs>
                    <v-card-text>
                        <h1 class="text--primary">
                            <v-text-field label="Ваше имя" name="name" type="text" v-model="name"></v-text-field>
                            <v-text-field label="Номер телефона" name="phone" type="text" v-model="phone"></v-text-field>
                        </h1>
                    </v-card-text>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
                <v-flex xs>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text outlined @click='onCancel' :disabled="localLoading">Отмена
                        </v-btn>
                        <v-btn text class='success' @click='onSave' :disabled="localLoading" :loading="localLoading">Купить!
                        </v-btn>
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
            name: '',
            phone: '',
            localLoading: false
        }
    },
    methods: {
        onCancel() {
            this.name = ''
            this.phone = ''
            this.dialog = false
        },
        onSave() {
            if (this.name !== '' && this.phone !== '') {
                this.localLoading = true
                this.$store.dispatch('createOrder', {
                    name: this.name,
                    phone: this.phone,
                    productId: this.product.id,
                    ownerId: this.product.ownerId
                })
                .finally(() => {
                    this.name = ''
                    this.phone = ''
                    this.localLoading = false
                    this.dialog = false
                })
            }
        }
    }
}
</script>
