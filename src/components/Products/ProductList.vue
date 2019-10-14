<template>
<v-container>
    <v-layout row v-if="!loading && myProducts.length !== 0">
        <v-flex xs12 sm7 offset-sm3>
            <h1 class="text--secondary mb-3">Мой товар</h1>
            <v-card class="elevation-10 mb-4" v-for="(product, i) in myProducts" :key="i" height="220px">
                <v-layout row>
                    <v-flex xs4>
                        <v-img :src="product.imageSrc" class="ml-4 mt-5" width="250px">

                        </v-img>
                    </v-flex>
                    <v-flex xs8>
                        <v-card-text>
                            <h2 class="text--primary ms-5">{{ product.title }}</h2>
                            <p class="ms-5 mt-5 mr-5">{{ product.description.substring(0,60) }}...</p>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="me-4" color="#306378" dark :to="'/product/' + product.id">Открыть</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
    <v-layout v-else-if="!loading && myProducts.length === 0">
        <v-flex xs12 class="text-xs-center">
            <h1 class="text--primary">У вас нет товара</h1>
        </v-flex>
    </v-layout>
    <v-layout v-else>
        <v-flex xs12 class="text-xs-center center pt-5">
            <v-progress-circular :size="100" :width="4" color="purple" indeterminate></v-progress-circular>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    computed: {
        myProducts() {
            return this.$store.getters.myProducts
        },
        loading() {
            return this.$store.getters.loading
        }
    }
}
</script>
