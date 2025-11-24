<script setup>
import { ref, onMounted } from 'vue'
import QRCode from 'qrcode'

const qrCodeUrl = ref('')

onMounted(async () => {
  const url = `${window.location.origin}/presensi`
  qrCodeUrl.value = await QRCode.toDataURL(url)
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">Absensi Event</h1>
    <p class="text-lg mb-4 text-center">Scan QR Code untuk presensi:</p>
    <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="QR Code Presensi" class="border rounded shadow-lg" />
  </div>
</template>