<template>
  <div class="flex flex-col gap-5 w-full">
    <div
      class="p-5 bg-white rounded-lg shadow-md flex items-center gap-2 justify-between"
    >
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search..."
        class="w-100 p-2 border border-gray-300 rounded-md"
      />
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 text-nowrap cursor-pointer"
      >
        Kompaniya qo'shish
      </button>
    </div>
    <div class="p-5 bg-white shadow-md rounded-lg">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-b-gray-300">
            <th class="text-left p-2 ">ID</th>
            <th class="text-left p-2 ">Kompaniya nomi</th>
            <th class="text-left p-2 ">Email</th>
            <th class="text-left p-2 ">Parol</th>
            <th class="text-left p-2 ">Amallar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" class="border-b border-b-gray-300 hover:bg-gray-100 transition-colors duration-300 last:border-b-0">
            <td class="p-2 ">{{ product.id }}</td>
            <td class="p-2 ">{{ product.fullName }}</td>
            <td class="p-2 ">{{ product.email }}</td>
            <td class="p-2 ">{{ product.password }}</td>
            <td class="p-2  flex gap-2">
              <span class="mdi mdi-pencil w-8 h-8 flex justify-center items-center  text-blue-400 text-xl rounded-full cursor-pointer"></span>
              <span class="mdi mdi-delete w-8 h-8 flex justify-center items-center text-red-400 text-xl rounded-full cursor-pointer"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import { ProductService } from '@/service/ProductService';

// onMounted(() => {
//     ProductService.getProductsMini().then((data) => (products.value = data));
// });

const products = ref([
  {
    id: '1000',
    fullName: 'James Butt',
    email: 'jamesbutt@example.com',
    password: 'password123'
  },
  {
    id: '1001',
    fullName: 'Josephine Darakjy',
    email: 'josephinedarakjy@example.com',
    password: 'password456'
  }
]);

</script>

<style scoped></style>
