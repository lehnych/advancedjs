const error = {
    data(){
        return {
            text: ''
        }
    },
    methods: {
        setError(error){
            this.text = error
        }
    },
    computed: {
        isVisible(){
            return this.text !== ''
        }
    },
    template: `
        <div class="alert alert--danger" role="alert" v-if="isVisible">
            <p>{{ text }}</p>
            <i class="icon__times icon--btn" @click="setError('')"></i>
        </div>
    `
};

export default error;
