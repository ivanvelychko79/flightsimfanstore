<template>
<v-container>
    <v-layout row>
        <v-flex xs12 class="text-xs-center pt-5" v-if="loading">
            <v-progress-circular :rotate="360" :size="100" :width="15" :value="value" color="#306378">
                {{ value }}
            </v-progress-circular>
        </v-flex>

        <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !== 0">
            <h4 class="text-secondary mb-3">Orders</h4>
            <v-list subheader two-line>
                <v-list-tile avatar v-for="(order, i) in orders" :key="i">
                    <v-list-tile-action>
                        <v-checkbox color="success" :input-value="order.done" @change="markDone(order)"><hr></v-checkbox>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ order.name }}</v-list-tile-title>
                        <v-list-tile-sub-title> {{ order.phone }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn :to="'/product/' + order.productId" class="primary posit">Open</v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-flex>
        <v-flex xs12 class="text-xs-center" v-else>
            <h1 class="text--secondary">You have no orders</h1>
        </v-flex>
    </v-layout>
</v-container>
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
        loading() {
            return this.$store.getters.loading
        },
        orders() {
            return this.$store.getters.orders
        }
    },
    methods: {
        markDone(order) {
            this.$store.dispatch('markOrderDone', order.id)
                .then(() => {
                    order.done = true
                })
                .catch(() => {})
        }
    },
    created() {
        this.$store.dispatch('fetchOrders')
    }
}
</script>

<style scoped>
.v-progress-circular {
    margin: 1rem;
}
.posit {
    float: right;
}
</style>
