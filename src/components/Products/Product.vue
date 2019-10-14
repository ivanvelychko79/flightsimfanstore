<template>
<v-container>
    <section class="product mt-3 elevation-10" v-if="!loading">
        <v-layout row wrap>
            <v-flex xs12 md6>
                <v-img :src="product.imageSrc" class="product_img scale"></v-img>
            </v-flex>
            <v-flex xs12 md6>
                <div class="product_info">
                    <h5 class="product_title display-1 mb-3 mt-3">{{ product.title }}</h5>
                    <p class="product_category title">
                        <span class="product_title">Производитель: </span>
                        {{ product.vendor.charAt(0).toUpperCase() + product.vendor.substr(1)}}
                    </p>
                    <p class="product_price title">
                        <span class="product_title">Цена: </span>{{ product.price }} грн.
                    </p>
                    <p class="product_color title">
                        <span class="product_title">Цвет: </span>
                        <span :title="product.color" :style="{ backgroundColor: product.color }" class="product_color_bg"></span>
                    </p>
                    <p class="title">
                        <span class="product_title">Материал: </span>{{ product.material.charAt(0).toUpperCase() + product.material.substr(1) }}
                    </p>
                    <div class="product_title mb-5">
                        <p class="mb-2">Описание: </p><span class="descColor">{{ product.description }}</span>
                    </div>
                    <app-edit-product :product='product' v-if="isUserLoggedIn"></app-edit-product>
                    <app-buy-dialog :product='product'></app-buy-dialog>
                </div>
            </v-flex>
        </v-layout>
    </section>
    <section v-else class="text-xs-center">
        <v-flex xs12 class="text-xs-center center pt-5">
            <v-progress-circular :rotate="360" :size="100" :width="15" :value="value" color="#306378">
                {{ value }}
            </v-progress-circular>
        </v-flex>
    </section>
</v-container>
</template>

<script>
import EditProduct from './EditProduct'

export default {
    data() {
        return {
            interval: {},
            value: 0,
        }
    },
    props: ['id'],
    computed: {
        product() {
            const id = this.id
            return this.$store.getters.productById(id)
        },
        loading() {
            return this.$store.getters.loading
        },
        isOwner() {
            return this.product.ownerId === this.$store.getters.user.id
        },
        isUserLoggedIn() {
            return this.$store.getters.isUserLoggedIn
        },
    },
    methods: {
        handleHide() {
            this.visible = false
        }
    },
    components: {
        appEditProduct: EditProduct
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Jura:300,400,500,600,700&display=swap&subset=cyrillic,cyrillic-ext');

.descColor {
    color: black;
    font-size: 17px;
    font-style: italic;
}

.product {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border: 1px solid #1c77ad;
    padding: 30px;
    margin-bottom: 100px;
}

.product_img {
    height: auto;
    width: 400px;
}

.product_info {
    margin-left: 100px;
}

.product_title {
    font-family: 'Jura', sans-serif;
    font-size: 20px;
    font-weight: bold;
    color: #306378;
    margin-bottom: 0;
}

.product_price {
    color: red;
}

.product_color_bg {
    display: inline-block;
    width: 50px;
    height: 20px;
    border: 1px solid #2b2b2b;
    border-radius: 10px;
}

.v-progress-circular {
    margin: 1rem;
}


@media screen and (max-width: 1270px) {
    .product {
        text-align: center;
    }

    .product_info {
        margin-left: 0;
    }
    .scale {
    transition: 1s; /* Время эффекта */
   }
   .scale:hover {
    transform: scale(1.7);
    cursor: pointer; /* Увеличиваем масштаб */
    z-index: 99999999;
    margin-left: 100px;
   }
}

@media screen and (max-width: 620px) {
    .product {
        text-align: start;
    }

    .product_img {
        width: 100%;
        height: 100%;
    }

    .product_title {
        text-align: center;
    }
    
}

@media screen and (max-width: 400px) {
    .product {
        padding: 10px;
        text-align: start;
        margin-bottom: 120px
    }

    .product_img {
        height: 250px;
        width: 100%;
    }

    .product_info {
        margin-left: 0;
    }
}
</style>
