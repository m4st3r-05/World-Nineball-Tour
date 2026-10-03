# 📋 BÁO CÁO DỰ ÁN: WORLD NINEBALL TOUR

> **Sinh viên thực hiện:** Nguyễn Anh Tú  
> **Github:** [m4st3r-05/World-Nineball-Tour](https://github.com/m4st3r-05/World-Nineball-Tour)  
> **Ngày báo cáo:** 04/10/2026  

---

## 1. TỔNG QUAN

Dự án xây dựng một trang web hiển thị thông tin giải đấu Bida 9 Bi (Pool 9-Ball), có chức năng đăng ký / đăng nhập tài khoản, phân quyền Admin và User.

### Mục tiêu
- Thiết kế giao diện Dark Theme cho trang web giải đấu.
- Hiển thị danh sách giải đấu và bảng xếp hạng cơ thủ.
- Hệ thống Đăng ký / Đăng nhập / Đăng xuất với MySQL.
- Phân quyền Admin và User.

---

## 2. CÔNG NGHỆ SỬ DỤNG

- **Node.js + Express.js**: Máy chủ web và xử lý routes.
- **EJS**: Hiển thị giao diện HTML kết hợp dữ liệu.
- **MySQL (XAMPP)**: Lưu trữ thông tin người dùng.
- **bcrypt**: Mã hóa mật khẩu.
- **express-session**: Quản lý phiên đăng nhập.
- **HTML / CSS / JS**: Giao diện phía người dùng.
- **Git & GitHub**: Quản lý mã nguồn.

---

## 3. CẤU TRÚC THƯ MỤC

```text
wnt-express/
├── server.js               # File chạy server chính
├── init-db.js              # Tạo Database & bảng Users
├── seed-admin.js           # Tạo tài khoản Admin
├── config/
│   └── db.js               # Kết nối MySQL
├── data/
│   └── mockData.js         # Dữ liệu mẫu (giải đấu, cơ thủ)
├── public/
│   ├── css/style.css       # Giao diện CSS
│   └── js/main.js          # JavaScript frontend
└── views/
    ├── index.ejs           # Trang chủ
    ├── tournaments.ejs     # Lịch thi đấu
    ├── rankings.ejs        # Bảng xếp hạng
    ├── login.ejs           # Đăng nhập
    ├── register.ejs        # Đăng ký
    ├── admin.ejs           # Trang quản trị
    └── partials/
        ├── header.ejs
        └── footer.ejs
```

---

## 4. CÁC CHỨC NĂNG CHÍNH

### 4.1. Giao diện người dùng
- **Trang chủ**: Banner, thanh tỷ số LIVE, danh sách giải đấu nổi bật, top cơ thủ.
- **Trang Giải đấu**: Danh sách giải đấu kèm ngày, địa điểm, tiền thưởng.
- **Trang Xếp hạng**: Bảng xếp hạng cơ thủ thế giới.

### 4.2. Đăng ký / Đăng nhập
- Người dùng đăng ký tài khoản → mật khẩu được mã hóa Bcrypt → lưu vào MySQL.
- Đăng nhập: so khớp mật khẩu đã mã hóa, tạo Session.
- Đăng xuất: hủy Session.

### 4.3. Phân quyền Admin / User

| Chức năng | User | Admin |
|-----------|:----:|:-----:|
| Xem trang chủ, giải đấu, xếp hạng | ✅ | ✅ |
| Truy cập trang quản trị `/admin` | ❌ | ✅ |
| Thêm / Sửa / Xóa giải đấu, cơ thủ | ❌ | ✅ |

- Nếu User cố truy cập `/admin` → bị chặn lỗi 403.

---

## 5. CƠ SỞ DỮ LIỆU

Database: `wnt_db` — Bảng `users`:

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| id | INT (PK) | Mã người dùng tự tăng |
| username | VARCHAR(50) | Tên tài khoản (UNIQUE) |
| password | VARCHAR(255) | Mật khẩu đã mã hóa Bcrypt |
| role | VARCHAR(20) | `user` hoặc `admin` |
| created_at | TIMESTAMP | Thời gian tạo |

---

## 6. HƯỚNG DẪN CHẠY

```bash
# Clone dự án
git clone https://github.com/m4st3r-05/World-Nineball-Tour.git
cd World-Nineball-Tour/wnt-express

# Cài thư viện
npm install

# Bật MySQL trong XAMPP, rồi chạy:
node init-db.js        # Tạo database
node seed-admin.js     # Tạo tài khoản admin
node server.js         # Chạy server

# Mở trình duyệt: http://localhost:3000
```

Tài khoản Admin: `admin` / Mật khẩu: `1`

---

## 7. KẾT LUẬN

- Hoàn thành trang web giải đấu Bida với giao diện Dark Theme.
- Có hệ thống đăng ký, đăng nhập, phân quyền Admin/User.
- Kết nối MySQL, mã hóa mật khẩu an toàn.
- Hướng phát triển: thêm CRUD giải đấu/cơ thủ, sơ đồ nhánh đấu, ...

---

*Dự án: [https://github.com/m4st3r-05/World-Nineball-Tour](https://github.com/m4st3r-05/World-Nineball-Tour)*
