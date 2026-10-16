# Kotak Surat Lumina → Google Sheet

Catatan yang dikirim pengunjung dari halaman **📮 Kotak Surat** masuk ke Google Sheet kamu.
Website Lumina yang mengirimnya, bukan browser pengunjung, jadi alamat Sheet dan kata
rahasianya nggak pernah kelihatan oleh siapa pun.

## 1. Buat Sheet dan tempel kodenya (5 menit)

1. Buka [sheets.new](https://sheets.new), kasih nama misalnya **Lumina Mailbox**.
2. Klik **Extensions → Apps Script**.
3. Hapus semua isi `Code.gs`, lalu tempel seluruh isi file [`Code.gs`](./Code.gs) dari folder ini. Klik 💾 Save.
4. Klik ⚙️ **Project Settings** (kiri) → bagian **Script properties** → **Add script property**:
   - Property: `SECRET`
   - Value: kata rahasia panjang dan acak, misalnya dari password generator (minimal 32 karakter). Simpan kata ini, nanti dipakai lagi di langkah 2.
5. Kembali ke **Editor**, pilih fungsi `setup` di atas, klik **▶ Run**. Google akan minta izin. Klik **Review permissions**, pilih akunmu, lalu **Advanced → Go to … (unsafe) → Allow**. (Ini aman, yang minta izin itu script buatanmu sendiri.) Sekarang ada tab **Inbox** di Sheet-mu.
6. Klik **Deploy → New deployment** → ⚙️ pilih **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Klik **Deploy**, lalu salin **Web app URL** (yang berakhiran `/exec`).

> "Anyone" artinya website Lumina bisa mengirim ke script ini. Tapi tanpa kata rahasia,
> script menolak semua permintaan, jadi orang lain nggak bisa membaca atau mengisi Sheet-mu.

## 2. Sambungkan ke Netlify

1. Buka Netlify → site **lumina-scripture** → **Site configuration → Environment variables → Add a variable**.
2. Tambahkan dua variabel:
   - `LUMINA_MAILBOX_URL` = Web app URL dari langkah 1.6
   - `LUMINA_MAILBOX_SECRET` = kata rahasia yang sama dari langkah 1.4
3. Deploy ulang: **Deploys → Trigger deploy → Deploy site** (atau push apa saja ke GitHub).

Selesai! Coba kirim catatan dari `/id/mailbox`, lalu lihat tab **Inbox** di Sheet-mu.

## 3. Cara pakai sehari-hari

Kolom di tab **Inbox**:

| Kolom | Isi |
| --- | --- |
| Time, Type, Name, Message, Language | Diisi otomatis |
| OK to share | `TRUE` kalau pengirim mengizinkan catatannya tampil. Pokok doa selalu `FALSE`. |
| **Approved** | ✅ Centang untuk menampilkan catatan di dinding "catatan dari teman-teman" |
| **Your reply** | Tulis balasanmu, nanti ikut tampil di bawah catatannya 🌸 |

- Catatan baru tampil di website paling lama **5 menit** setelah kamu centang.
- Catatan cuma tampil kalau **OK to share = TRUE dan Approved dicentang**.
- Tipe `prayer` (pokok doa) **nggak pernah** tampil, walaupun dicentang.
- Satu pengunjung bisa kirim maksimal **5 catatan per jam** (anti spam).

## Kalau mengubah `Code.gs`

Setelah mengedit kode di Apps Script: **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**.
URL-nya tetap sama, jadi Netlify nggak perlu diubah.
