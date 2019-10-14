<template>

    <div>
        <v-navigation-drawer app temporary v-model="sideNav">
            <v-list>
                <v-list-item v-for="(link, i) in links" :key="i" :to='link.url'>
                    <v-list-item-icon>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="link.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="onLogout" v-if="isUserLoggedIn">
                    <v-list-item-icon>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="'Выход'"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app color="grey" dark elevate-on-scroll src="@/img/nav-bar.jpg" width="100%">
            <template v-slot:img="{ props }">
                <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
            </template>
            <v-app-bar-nav-icon @click="sideNav = !sideNav" class='hidden-md-and-up'></v-app-bar-nav-icon>
            <v-toolbar-title>
                <router-link to="/" tag="span" class="pointer fontTitle">FlightSim Fan<br><span class="onlineStore">Интернет магазин для виртуальных пилотов</span></router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn text v-for="(link, i) in links" :key="i" :to='link.url' class="fontButton">
                    <v-icon left class="material-icons">{{ link.icon }}</v-icon>
                    {{ link.title }}
                </v-btn>
                <v-btn text @click="onLogout" v-if="isUserLoggedIn">
                    <v-icon left class="material-icons">exit_to_app</v-icon>
                    Выход
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <v-content>

            <router-view></router-view>

        </v-content>
    </div>

</template>

<script>
export default {
    data() {
        return {
            sideNav: false,
        }
    },
    methods: {
        onLogout() {
            this.$store.dispatch('logoutUser')
            this.$router.push('/')
        }
    },
    computed: {
        isUserLoggedIn() {
            return this.$store.getters.isUserLoggedIn
        },
        links() {
            if (this.isUserLoggedIn) {
                return [{
                        title: 'Корзина',
                        icon: 'local_grocery_store',
                        url: '/checkout'
                    },
                    {
                        title: 'Новый товар',
                        icon: 'add',
                        url: '/new'
                    },
                    {
                        title: 'Мои товары',
                        icon: 'list',
                        url: '/list'
                    }
                ]
            }
            return [{
                    title: 'Логин',
                    icon: 'account_box',
                    url: '/login'
                },
                {
                    title: 'Регистрация',
                    icon: 'face',
                    url: '/register'
                }
            ]
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Prosto+One&display=swap&subset=cyrillic');
@import url('https://fonts.googleapis.com/css?family=Jura:300,400,500,600,700&display=swap&subset=cyrillic,cyrillic-ext');

.pointer {
    cursor: pointer;
}

.fontTitle {
    font-family: 'Prosto One', cursive;
    font-style: italic;
}

.fontButton {
    font-family: 'Jura', sans-serif;
    font-weight: 700;
}
.onlineStore{
    font-weight: 300;
    font-size: 15px;
}
</style>
