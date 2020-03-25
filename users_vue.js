var urlDAO = "DataAccessObject/UserDAO.php";

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: () => ({
        search: '',
        snackbar: false,
        textSnack: 'text snackbar',
        dialog: false,
        headers: [
            {
                text: 'Users ID',
                align: 'start',
                sortable: false,
                value: 'id',
            },           
            { text: 'Name', value: 'name' },
            { text: 'Email', value: 'email' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        users: [],
        editedIndex: -1,
        editedItem: {
            id: 0,
            name: '',
            email: '',
        },
        defaultItem: {
            id: 0,
            name: '',
            email: '',
        },
    }),

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog (val) {
            val || this.close()
        },
    },

    created () {
        this.listUsers()
    },

    methods: 
    {         
        createUser:function(){
            axios.post(urlDAO, {option: 1, name:this.name, email:this.email}).then(response =>{
                this.listUsers();
            });
            this.name = '',
            this.email = ''
        },
        
        listUsers:function()
        {
            axios.post(urlDAO, {option: 2}).then(response =>{
                this.users = response.data;
            });
        },        

        updateUser:function(id, name, email){
            axios.post(urlDAO, {option: 3, id:id, name:name, email:email}).then(response =>{
                this.listUsers();
            });
        },

        deleteUser:function(id){
            axios.post(urlDAO, {option: 4, id:id}).then(response =>{
                this.listUsers();
            });
        },

        editItem (item) {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            const index = this.users.indexOf(item)
            var msg = confirm('Are you sure you want to delete this item?');
            if(msg == true){
                this.deleteUser(this.users[index].id);
                this.snackbar = true
                this.textSnack = 'The item was deleted.'
            }
            else {
                this.snackbar = true
                this.textSnack = 'Operation canceled'    
            } 
        },

        close () {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },

        save () {
            if (this.editedIndex > -1) {
                //Guardar en caso de modificación
              this.id=this.editedItem.id          
              this.name=this.editedItem.name
              this.email=this.editedItem.email
              this.snackbar = true
              this.textSnack = 'Update Successful!'  
              this.updateUser(this.id,this.name, this.email)  
            } else {
                //Guardar el registro en caso de crear
                if(this.editedItem.name == "" || this.editedItem.email == ""){
                this.snackbar = true
                this.textSnack = 'Incomplete data.'      
              }else{
                this.name=this.editedItem.name
                this.email=this.editedItem.email         
                this.snackbar = true
                this.textSnack = 'Register Successful!'
                this.createUser()
              }       
            }
            this.close()
        },
    },
})