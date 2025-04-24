| Name | Mochammad Alif Nasrullah |
| :--- | :----------------------: |
| NRP  |        5025231314        |

# API Review Pilem
Application Programming Interface (API) untuk sebuah aplikasi review film dan series yang di namakan ReviewPiLem (RPL)

## API Endpoint

| Method | Endpoint                        |           Deskripsi            |
| :----- | :------------------------------ | :----------------------------: |
| GET    | /film | Ambil Semua Film |
| POST   | /film | Tambah Film Baru |
| PUT    | /film/:id | Update Data Film |
| DELETE | /film/:id | Delete Data Film |
| GET    | /film/[keyword] | Cari film berdasarkan judul |

| Method | Endpoint                        |           Deskripsi            |
| :----- | :------------------------------ | :----------------------------: |
| POST   | /auth/register | Register User Baru |
| POST   | /auth/login | Login User/Admin |

| Method | Endpoint                        |           Deskripsi            |
| :----- | :------------------------------ | :----------------------------: |
| GET    | /user/[username] | Cari User Berdasar Username |
| PUT    | /user/[userId] | Update Data User |

| Method | Endpoint                        |           Deskripsi            |
| :----- | :------------------------------ | :----------------------------: |
| POST   | /genre                       | Tambah Genre Baru |

| Method | Endpoint                        |           Deskripsi            |
| :----- | :------------------------------ | :----------------------------: |
| GET    | /list/user/[userId] | Ambil Semua List User |
| POST   | /list | Tambah List Film Baru |
| PUT    | /list/[listId] | Update List Film Baru |

| Method | Endpoint                        |           Deskripsi            |
| :----- | :------------------------------ | :----------------------------: |
| POST   | /react/like-dislike/[reviewId] | Tambah React Baru Terhadap Review |

| Method | Endpoint                        |           Deskripsi            |
| :----- | :------------------------------ | :----------------------------: |
| GET    | /review | Ambil Semua Review |
| POST   | /review | Tambah Review Baru |
| PUT    | /review/[reviewId] | Update Review kegiatan |
| DELETE | /review/[reviewId] | Delete Review kegiatan |

## API Documentation
https://documenter.getpostman.com/view/44375614/2sB2ixkEQf