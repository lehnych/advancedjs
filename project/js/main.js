const API = 'responses';

const app = new Vue({
    el: '#app',
    data(){
        return {
            isOpen: false,
        }
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },

        toggle() {
            this.isOpen = !this.isOpen
        }
    },
    mounted() {
        console.log(this);
    }
});

