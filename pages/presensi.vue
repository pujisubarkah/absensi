<script setup>
import { ref, onMounted } from 'vue'
import SignaturePad from 'signature_pad'

const name = ref('')
const email = ref('')
const phone = ref('')
const organization = ref('')

const sigPad = ref(null)
const canvasRef = ref(null)
const showDownloadButton = ref(false)

onMounted(() => {
  sigPad.value = new SignaturePad(canvasRef.value, {
    backgroundColor: '#fff'
  })
})

const resetSignature = () => {
  sigPad.value.clear()
}

const submitForm = async () => {
  if (sigPad.value.isEmpty()) {
    alert('Tanda tangan belum diisi!')
    return
  }

  const signature = sigPad.value.toDataURL('image/png')

  const payload = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    organization: organization.value,
    signature
  }

  const { data, error } = await $fetch('/api/presensi', {
    method: 'POST',
    body: payload
  })

  if (error) {
    alert('Gagal menyimpan data')
    return
  }

  alert(`Terima kasih ${name.value} dari ${organization.value} telah mengisi daftar hadir`)
  showDownloadButton.value = true
  
  name.value = ''
  email.value = ''
  phone.value = ''
  organization.value = ''
  resetSignature()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-gray-200">
      <div class="text-center mb-6">
        <div class="flex justify-center items-center space-x-4 mb-4">
          <img src="/lanri_.png" alt="LAN RI" class="h-12 w-auto object-contain" />
        </div>
        <h1 class="text-3xl font-bold text-[#16578d] mb-2">Form Penerima Buku Advokasi Inovasi</h1>
        <p class="text-gray-600">Silakan isi data dan tanda tangan di bawah</p>
      </div>

      <form @submit.prevent="submitForm" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
          <input
            v-model="name"
            type="text"
            placeholder="Masukkan nama lengkap"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16578d] focus:border-[#16578d] transition duration-200"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Masukkan alamat email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16578d] focus:border-[#16578d] transition duration-200"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">No. Telepon</label>
          <input
            v-model="phone"
            type="tel"
            placeholder="Masukkan nomor telepon"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16578d] focus:border-[#16578d] transition duration-200"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Instansi/Organisasi</label>
          <input
            v-model="organization"
            type="text"
            placeholder="Nama instansi/organisasi & daerah asal"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#16578d] focus:border-[#16578d] transition duration-200"
            required
          />
        </div>

        <!-- Signature Pad -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tanda Tangan</label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
            <canvas
              ref="canvasRef"
              class="w-full border border-gray-200 rounded bg-white"
              height="200"
            ></canvas>
          </div>
          <button
            type="button"
            @click="resetSignature"
            class="mt-3 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200 font-medium"
          >
            Reset Tanda Tangan
          </button>
        </div>

        <button
          type="submit"
          class="w-full bg-[#16578d] text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Submit 
        </button>
      </form>

        <div v-if="showDownloadButton" class="mt-6 text-center">
          <a
            href="https://drive.google.com/drive/folders/1uLXPNoXcAQQnWosBUajVpqiUhw1FlgJX"
            target="_blank"
            class="inline-block bg-green-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-green-700 transition duration-200 shadow-md"
          >
            Download Buku Inovasi
          </a>
        </div>
    </div>
  </div>
</template>
