# 📋 TỔNG HỢP DỰ ÁN: WORLD NINEBALL TOUR

> **Sinh viên thực hiện:** Nguyễn Anh Tú  
> **Github:** [m4st3r-05/World-Nineball-Tour](https://github.com/m4st3r-05/World-Nineball-Tour)  
> **Ngày cập nhật:** 11/10/2026  

---

## 1. TRANG WEB CÓ NHỮNG GÌ? (CÁC CHỨC NĂNG CHÍNH)

Dự án là website thông tin và quản lý giải đấu Bida 9 Bi (World Nineball Tour), bao gồm:

- **Trang chủ (`/`):** Banner giải đấu nổi bật, thanh hiển thị trận đấu LIVE và danh sách top cơ thủ thế giới.
- **Trang Giải đấu (`/tournaments` & `/tournaments/:id`):**
  - Hiển thị thông tin 4 giải đấu lớn, ngày giờ, địa điểm, tổng giải thưởng.
  - Xem chi tiết từng giải: Lịch thi đấu (Matches), trận trực tiếp (Live), bảng xếp hạng giải đấu (Ranking), cơ cấu tiền thưởng (Prize Breakdown).
- **Trang Bảng xếp hạng (`/rankings`):** Xếp hạng toàn cầu của các cơ thủ WNT.
- **Trang Cơ thủ (`/players`):** Danh sách hồ sơ các cơ thủ tham dự tour.
- **Hệ thống Tài khoản & Phân quyền:**
  - **Đăng ký (`/register`) & Đăng nhập (`/login`):** Thiết kế dạng thẻ bo tròn hiện đại.
  - **Trang cá nhân (`/profile`):** Cho phép người dùng xem thông tin và đổi mật khẩu tài khoản.
  - **Phân quyền Admin & User:**
    - **User:** Xem toàn bộ thông tin giải đấu, BXH, đổi mật khẩu cá nhân.
    - **Admin:** Chỉnh sửa trực tiếp ngay trong từng giải đấu (sửa cơ thủ, tỷ số trận đấu, bật/tắt live, đổi thứ hạng top 4).

---

## 2. CÁC SKILLS & CÔNG NGHỆ SỬ DỤNG

- **Node.js & Express.js:** Xây dựng máy chủ web và xử lý toàn bộ routes.
- **EJS (Embedded JavaScript):** Template hiển thị giao diện HTML động từ máy chủ.
- **MySQL (XAMPP):** Cơ sở dữ liệu quan hệ lưu trữ tài khoản, giải đấu, trận đấu và cơ thủ.
- **express-session:** Quản lý phiên đăng nhập của người dùng.
- **HTML / CSS / JavaScript thuần:** Thiết kế giao diện Card hiện đại, responsive, không phụ thuộc framework CSS nặng.
- **Git & GitHub:** Quản lý phiên bản mã nguồn.

---

## 3. CÁCH CÀI ĐẶT CÁC SKILLS / THƯ VIỆN

Để cài đặt và chạy các công cụ trong dự án:

1. **Cài đặt môi trường:**
   - Cài đặt **Node.js** từ trang chủ [nodejs.org](https://nodejs.org).
   - Cài đặt **XAMPP** và bật dịch vụ **Apache** + **MySQL**.

2. **Cài đặt các gói thư viện (Dependencies):**
   Mở terminal tại thư mục `wnt-express` và chạy:
   ```bash
   npm install express ejs mysql2 express-session bcrypt
   ```
   *(Hoặc chỉ cần gõ `npm install` để tự cài theo file `package.json`)*.

3. **Khởi tạo cơ sở dữ liệu:**
   ```bash
   node init-db.js        # Tạo database wnt_db và các bảng
   node seed-admin.js     # Tạo tài khoản admin mặc định
   ```

---

## 4. CƠ SỞ DỮ LIỆU & LƯU TRỮ

Dữ liệu được lưu trong MySQL database **`wnt_db`**:
- **Bảng `users`:** Lưu thông tin tài khoản (`username`, `password`, `role`). Mật khẩu được lưu trực tiếp dạng chữ/số (không mã hóa) để dễ quản lý.
- **Bảng `tournaments`:** Lưu thông tin các giải đấu và top 4 xếp hạng.
- **Bảng `players`:** Danh sách các cơ thủ, quốc gia, thứ hạng.
- **Bảng `matches`:** Lưu các trận đấu, tỷ số và trạng thái `is_live`.

---

## 5. HƯỚNG DẪN CHẠY DỰ ÁN

```bash
# Di chuyển vào thư mục dự án
cd wnt-express

# Chạy server
node server.js
```
Mở trình duyệt truy cập: **`http://localhost:3000`**  
- Tài khoản Admin: `admin` | Mật khẩu: `1`
- Tài khoản User: Có thể tự đăng ký hoặc dùng `tu2005`
