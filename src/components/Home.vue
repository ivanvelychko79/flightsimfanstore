<template>
<div v-if="!loading">
    <v-container fluid>
        <v-layout row>
            <v-flex xs12>
                <v-carousel cycle>
                    <v-carousel-item v-for="(product, i) in promoProducts" :key="i" :src="product.imageSrc" reverse-transition="fade-transition" transition="fade-transition" class="imgSize"></v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
    </v-container>
    <v-container grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 v-for="(product, i) in products" :key="i">

                <v-card class="mx-auto card_param">
                    <router-link :aria-label="product.title" :to="'/product/' + product.id">
                        <v-img :src="product.imageSrc" class="imgCard"></v-img>
                    </router-link>

                    <v-card-title primary-title>
                        <div>
                            <h3 class="card_heading heading">{{ product.title }}</h3>
                            <div class="card_describe">
                                <p class="subheading">{{ product.description.substring(0,60) }}...</p>
                                <p class="subheading card_price"><span class="title">Цена: </span>{{ product.price }} грн.</p>
                            </div>
                        </div>
                    </v-card-title>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn dark color="grey darken-4" style="margin: 10px" outlined :to="'/product/' + product.id">Описание</v-btn>
                        <app-buy-dialog :product="product"></app-buy-dialog>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</div>
<div v-else>
    <v-container>
        <v-layout row>
            <v-flex xs12 class="text-xs-center center pt-5">
                <v-progress-circular :rotate="360" :size="100" :width="15" :value="value" color="#306378">
                    {{ value }}
                </v-progress-circular>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            interval: {},
            value: 0,
        }
    },
    beforeDestroy() {
        clearInterval(this.interval)
    },
    mounted() {
        this.interval = setInterval(() => {
            if (this.value === 100) {
                return (this.value = 0)
            }
            this.value += 10
        }, 1000)
    },
computed: {
    promoProducts() {
        return this.$store.getters.promoProducts
    },
    products() {
        return this.$store.getters.products
    },
    loading() {
        return this.$store.getters.loading
    }
}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Jura:300,400,500,600,700&display=swap&subset=cyrillic,cyrillic-ext');

.card_heading {
    font-family: 'Jura', sans-serif;
    font-weight: 700;
    word-wrap: break-word;
    text-align: center;
    margin-bottom: 1.5rem;
}

.card_param {
    margin-bottom: 50px;
}

.card_describe {
    font-family: 'Jura', sans-serif;
    font-weight: 500;
    margin-top: auto;
    padding-left: 1rem;
}

.card_price {
    font-family: 'Jura', sans-serif;
    color: #c00f1b;
    font-size: 18px;
}

.imgCard {
    margin: 20px;
    top: 10px;
}
.center {
    text-align: center;
}
.subheading {
    max-height: 150px;
}
.v-progress-circular {
  margin: 1rem;
}
</style>
