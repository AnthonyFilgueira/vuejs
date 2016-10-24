function findById(items, id){
    for(var i in items){
        if(items[i].id == id){
            return items[i];
        }
    }
}

Vue.component('select-categoria',{
    template:"#select_categoria_tpl",
    props: ['categorias', 'id']
});

Vue.component('producto-row',{
    template: "#producto_row_tpl",
    props: ['producto', 'categorias'],
    data: function(){
        return{
          editing: false
        };
    },
    methods: {
        remove: function(){
          this.$parent.productos.$remove(this.producto);
        },
        edit:function(){
          this.editing = true;
          //Vue.set(producto,'editing',true);
        },
        update: function(){
          this.editing = false;
        },
    }
});

Vue.filter('categoria', function(id){
    var categoria = findById(this.categorias,id); 

    return categoria != null ? categoria.nombre : '';

});

var vm = new Vue({
          el: 'body',

          data:{
              nuevaCategoria: {
                  id: '',
                  nombre: '',
              },
              nuevoProducto:{
                nombre: '',
                categoria_id: '',
              },

              productos: [
                  {
                    nombre: 'New Balance',
                    categoria_id: 1,
                  },
                  {
                    nombre: 'Sweter Polo',
                    categoria_id: 2,
                  },
                {
                    nombre: 'Levis Negro',
                    categoria_id:3,
                },
              ],

              categorias: [
                  {
                    id: 1,
                    nombre: 'zapatos',
                  },
                  {
                    id: 2,
                    nombre: 'camisas',
                  },
                {
                    id:3,
                    nombre: 'pantalones',
                },
              ],
          },
          methods: {
            createProducto:function(){
                   if(this.nuevoProducto.nombre.trim() && this.nuevoProducto.categoria_id != ''){
                      
                      this.productos.push(this.nuevoProducto);

                      this.nuevoProducto = {nombre: '',categoria_id: ''};
                  }else{
                      alert('Debes introducir un Producto');
                  }
              },
              createCategoria: function(nuevaCategoria){
                
                  if(nuevaCategoria.id.trim() && nuevaCategoria.nombre.trim()){
                      this.categorias.push({
                          id:nuevaCategoria.id,
                          nombre:nuevaCategoria.nombre
                      });
                      this.nuevaCategoria.id = '';
                       this.nuevaCategoria.nombre = '';
                  }else{
                      alert('Debes introducir una Categoria');
                  }
              },
              deleteCategoria: function(categoria){

                this.categorias.$remove(categoria);
              },
            },
          });