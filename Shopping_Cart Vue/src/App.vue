<template>
 <div id="app">
   <div class="container-fluid">
     <!-- <div data-aos="fade-up" -->
      <!-- data-aos-anchor-placement="center-center"> -->
      <p class="display-2 fw-normal" align="center">Shoping Cart</p>
      <!-- </div> -->
     <hr>
     <div class="row">
       <div class="col-md-2" v-for="item in products" v-bind:key="item.id">
         <div class="card h-100">
              <img :src="item.image" class="card-img-top" >
              <div class="card-body">
                 <h4 class="card-title">{{item.name}}</h4>
                 <p class="card-text">{{item.price}}</p>
              </div>
              <div class="card-footer">
                <button class="btn btn-primary" @click="addCart(item)">add to cart</button>
              </div>
         </div>
       </div>
       <div class="col-md-8" v-if="carts!=0">
         <h4> Shopping-Cart
           <i class="fas fa-shopping-cart"></i>
         </h4>
         <hr>
         <table class="table">
           <thead class="table-danger">
             <tr>
               <th scope="col">Picture</th>
               <th scope="col">Name</th>
               <th scope="col">Price</th>
               <th scope="col" class="text-center">Each</th>
               <th scope="col">Price</th>
               <th scope="col">Delete</th>
             </tr>
           </thead> 
           <tbody>
             <tr v-for="product in carts" v-bind:key="product.id">
               <td>
                 <img :src="product.image" alt="" class="rounded-3" style="width:120px">
                 </td>
               <td>{{product.name}}</td>
               <td>{{product.price}}</td>
               <td class="text-center">
                 <i class="fas fa-minus btn btn-dark btn-sm qty-minus" @click="minusQty(product)"></i>
                 {{product.qty}}
                 <i class="fas fa-plus btn btn-dark btn-sm qty-plus" @click="plusQty(product)"></i>
                 </td>
               <td>{{product.total}}</td>
               <td>
                 <button class="btn btn-dark btn-sm " @click="removeProduct(product)">
                   <i class="fa-solid fa-trash-can"></i>
                 </button>
               </td> 
             </tr>
           </tbody>
         </table>
         <h3>TotalPrice {{total()}}</h3>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data(){
    return{
      carts:[],
      thaitea:0,
      tea:0,
      products:[
        {
          id:1,
          name: "Tea",
          price:30,
          image:"https://cdn.pixabay.com/photo/2017/03/01/05/12/tea-cup-2107599_960_720.jpg",
          active:false
        },
        {
          id:2,
          name: "Thaitea",
          price:35,
          image:"https://cdn.pixabay.com/photo/2020/04/07/15/39/thai-tea-5013872_960_720.jpg",
          active:false
        }
      ]
    }
  },
  methods:{
    addCart:function(item){
      if(item.id == 1){
        //tea
        this.tea+=1;
        if(this.tea<=1){
          this.pushData(item);
        }else{
          //same item
          var found = this.findID(item);
          this.carts[found].qty+=1;
          this.carts[found].total=this.carts[found].qty*this.carts[found].price;
        }
      }else {
        //Thaitea
        this.thaitea+=1;
        if(this.thaitea<=1){
          this.pushData(item);
        }else{
          //same item
          var found = this.findID(item);
          this.carts[found].qty+=1;
          this.carts[found].total=this.carts[found].qty*this.carts[found].price;
        }

      }
    },
    pushData(item){
      this.carts.push({
          id:item.id,
          name:item.name,
          price:item.price,
          image:item.image,
          qty:1,
          total:item.price
        })
    },
    findID:function(item){
      for(var i = 0;i<this.carts.length;i++){
        if(this.carts[i].id == item.id){
          return i;//item in cart
        }
      }
      return -1;
    },
    minusQty:function(product){
      product.qty-=1;
      if(product.qty<=1){
        product.qty=1;
      }
      product.total=product.price*product.qty;
    },
    plusQty:function(product){
      product.qty+=1;
      product.total=product.price*product.qty;
    },
    removeProduct(product){
      if(confirm("Are you sure")){
        var index=this.carts.indexOf(product);
        this.carts.splice(index,1);
        if(product.id==1){
          this.tea=0;
        }else{
          this.thaitea=0;
        }
      }
    },
    total:function(){
      var sum=0
      this.carts.forEach(function(item){
        sum+=item.total;
      })
      return sum;
    }
  }
}
</script>
<style scoped>
.qty-minus{
  cursor: pointer;
  margin-right: 10px;
}
.qty-plus{
  cursor: pointer;
  margin-left: 10px;
}
</style>
