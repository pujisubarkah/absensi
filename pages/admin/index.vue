<template>
  <div class="p-6">
    <div class="flex justify-center items-center space-x-4 mb-6">
      <img src="/lanri_.png" alt="LAN RI" class="h-12 w-auto object-contain" />
    </div>
    <h1 class="text-3xl font-bold text-[#16578d] text-center mb-6">Daftar Penerima Buku Advokasi Inovasi</h1>

    <div class="mb-4 text-right">
      <ClientOnly>
        <button
  @click="exportToPDF"
  class="bg-[#16578d] text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-200 flex items-center gap-1.5"
>
  <Download size="14" />
  Export PDF
</button>

      </ClientOnly>
    </div>

    <div class="overflow-x-auto">
      <table class="export-table min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead class="bg-[#16578d] text-white">
          <tr>
            <th class="border border-gray-300 px-4 py-3 text-left">No</th>
            <th class="border border-gray-300 px-4 py-3 text-left">Nama</th>
            <th class="border border-gray-300 px-4 py-3 text-left">Email</th>
            <th class="border border-gray-300 px-4 py-3 text-left">No. Telepon</th>
            <th class="border border-gray-300 px-4 py-3 text-left">Instansi</th>
            <th class="border border-gray-300 px-4 py-3 text-center">Tanda Tangan</th>
            <th class="border border-gray-300 px-4 py-3 text-left">Waktu Presensi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, index) in data?.data || []" :key="row?.id || index" class="hover:bg-gray-50">
            <td class="border border-gray-300 px-4 py-3">{{ index + 1 }}</td>
            <td class="border border-gray-300 px-4 py-3">{{ row.name }}</td>
            <td class="border border-gray-300 px-4 py-3">{{ row.email }}</td>
            <td class="border border-gray-300 px-4 py-3">{{ row.phone }}</td>
            <td class="border border-gray-300 px-4 py-3">{{ row.organization }}</td>
            <td class="border border-gray-300 px-4 py-3 text-center">
              <img :src="row.signature" alt="Tanda Tangan" class="w-32 h-16 object-contain border rounded mx-auto" />
            </td>
            <td class="border border-gray-300 px-4 py-3">{{ row.createdAt ? new Date(row.createdAt).toLocaleString('id-ID') : '' }}</td>
          </tr>
          <tr v-if="!data?.data || data.data.length === 0" class="text-center">
            <td colspan="7" class="border border-gray-300 px-4 py-8 text-gray-500">
              Belum ada data presensi
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { Download } from 'lucide-vue-next'

const { data, refresh } = await useFetch("/api/presensi")

onMounted(() => {
  // Refresh setiap 30 detik untuk update data
  setInterval(() => refresh(), 30000)
})

const exportToPDF = async () => {
  const element = document.querySelector('.export-table')
  if (!element) return

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    })
    
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    const imgWidth = 210
    const pageHeight = 295
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    
    let position = 0
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }
    
    pdf.save('daftar-presensi.pdf')
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Error generating PDF')
  }
}
</script>
