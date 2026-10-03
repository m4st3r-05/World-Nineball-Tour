# World Nineball Tour - Web Portal Demo 🎱

Một cấu trúc dự án mẫu (Starter Boilerplate) xây dựng bằng **Node.js (Express.js)** và **EJS Template**, được thiết kế chuyên biệt cho hệ thống quản lý và hiển thị thông tin giải đấu bida chuẩn phong cách thể thao điện tử của **World Nineball Tour (WNT)**.

## 🌟 Tính Năng Nổi Bật

- **Giao diện Đậm Chất Thể Thao:** Sử dụng gam màu tối (Dark Mode) `#0a0d14`, kết hợp với các điểm nhấn Neon Cyan và Neon Gold.
- **Phông Chữ Thể Thao:** Sử dụng phông chữ **Montserrat** hiển thị Tiếng Việt hoàn hảo và mang lại cảm giác mạnh mẽ, chuyên nghiệp.
- **Live Score Ticker:** Thanh chạy tỷ số thời gian thực trên trang chủ.
- **Hệ thống Giải Đấu (Tournaments):** Phân loại các giải Major, Ranking và Invitational.
- **Bảng Xếp Hạng (Rankings):** Tích hợp thông tin cơ thủ, điểm số, cờ quốc gia.
- **Kiến trúc Express & EJS:** Tách biệt Header/Footer (partials), dễ dàng bảo trì và mở rộng thêm các trang mới.

## 📂 Cấu Trúc Thư Mục

```text
World-Nineball-Tour/
├── .gitignore             # Các file/thư mục bị Git bỏ qua (như node_modules)
├── README.md              # Tài liệu hướng dẫn này
└── wnt-express/           # Thư mục chứa toàn bộ mã nguồn Node.js
    ├── server.js          # File chạy server chính
    ├── package.json       # Danh sách thư viện (express, ejs,...)
    ├── data/
    │   └── mockData.js    # Dữ liệu mô phỏng (cơ thủ, giải đấu)
    ├── public/            # Tài nguyên tĩnh
    │   ├── css/
    │   │   └── style.css  # Giao diện CSS
    │   └── js/
    │       └── main.js    # Javascript phía frontend
    └── views/             # Giao diện HTML (định dạng EJS)
        ├── index.ejs      # Trang chủ
        ├── tournaments.ejs # Trang lịch thi đấu
        ├── rankings.ejs   # Trang bảng xếp hạng
        └── partials/      
            ├── header.ejs # Header chung
            └── footer.ejs # Footer chung
```

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

Dự án yêu cầu máy tính của bạn phải được cài đặt sẵn [Node.js](https://nodejs.org/).

**Bước 1:** Clone dự án về máy
```bash
git clone https://github.com/m4st3r-05/World-Nineball-Tour.git
cd World-Nineball-Tour
cd wnt-express
```

**Bước 2:** Cài đặt các thư viện cần thiết
```bash
npm install
```

**Bước 3:** Khởi chạy máy chủ (Server)
```bash
node server.js
```
*(Nếu bạn muốn server tự động khởi động lại mỗi khi sửa code, bạn có thể cài đặt nodemon: `npm install -g nodemon` sau đó chạy lệnh `nodemon server.js`)*

**Bước 4:** Mở trình duyệt và trải nghiệm
Truy cập vào địa chỉ: [http://localhost:3000](http://localhost:3000)

---
*Dự án được xây dựng dành cho mục đích giáo dục và thực hành kiến trúc Node.js/Express. Bản quyền thiết kế thuộc về nguồn cảm hứng từ WNT.*
