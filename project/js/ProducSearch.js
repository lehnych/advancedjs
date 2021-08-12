Vue.component('search', {
    data(){
        return {
            userSearch: ''
        }
    },
    template: `
        <form action="#" class="search__form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
            <div class="form-group">
                <div class="search-field">
                    <input type="search" name="fieldSearch" class="form-control" placeholder="Search" v-model="userSearch">
                    <button class="search-button" type="submit"><i class="icon__search"></i></button>
                </div>
            </div>
        </form>
    `
});
