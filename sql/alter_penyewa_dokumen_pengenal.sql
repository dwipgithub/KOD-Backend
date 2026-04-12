-- Tambah kolom untuk path file dokumen (PDF / gambar) penyewa, relatif ke folder uploads/
ALTER TABLE kos.penyewa
    ADD COLUMN dokumen_pengenal VARCHAR(512) NULL;
