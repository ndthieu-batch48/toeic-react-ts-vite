# Hướng dẫn Deploy FastAPI, Django và React với NSSM và Nginx

## Mục lục
1. [Cài đặt NSSM](#1-cài-đặt-nssm)
2. [Chạy FastAPI với NSSM](#2-chạy-fastapi-với-nssm)
3. [Chạy Django với NSSM](#3-chạy-django-với-nssm)
4. [Cấu hình Nginx](#4-cấu-hình-nginx)
5. [Kiểm tra và Troubleshooting](#5-kiểm-tra-và-troubleshooting)

---

## 1. Cài đặt NSSM

NSSM (Non-Sucking Service Manager) là công cụ giúp chạy ứng dụng Windows như một Windows Service.

**Đường dẫn NSSM:** `C:\nssm-2.24\win64`

### Thêm NSSM vào PATH (khuyến nghị)
1. Mở **System Properties** → **Environment Variables**
2. Thêm `C:\nssm-2.24\win64` vào biến **PATH**
3. Restart Command Prompt/PowerShell

---

## 2. Chạy FastAPI với NSSM

### 2.1. Tạo file `run_fastapi.bat`

**Đường dẫn:** `C:\TOEIC_NEW\toeic-fastapi\run_fastapi.bat`

```batch
call venv\Scripts\activate.bat
call python main.py
```

**Giải thích:**
- `call venv\Scripts\activate.bat` - Kích hoạt virtual environment
- `call python main.py` - Chạy FastAPI từ file main.py (cấu hình port trong code Python)

### 2.2. Cài đặt FastAPI Service

**Cách 1: Sử dụng GUI (Khuyến nghị cho người mới)**

Mở **Command Prompt (Administrator)**:

```cmd
cd C:\nssm-2.24\win64
nssm install ToeicFastApiWindowsService
```

Một cửa sổ GUI sẽ hiện ra, điền các thông tin:

**Tab "Application":**
- **Path:** `C:\TOEIC_NEW\toeic-fastapi\run_fastapi.bat`
- **Startup directory:** `C:\TOEIC_NEW\toeic-fastapi`
- **Service name:** `ToeicFastApiWindowsService`

**Tab "Details":**
- **Display name:** `Toeic FastAPI Service`
- **Description:** `FastAPI backend service for Toeic application`
- **Startup type:** `Automatic`

Nhấn **Install service**

---

**Cách 2: Cài đặt qua Command Line (Nhanh)**

```cmd
cd C:\nssm-2.24\win64
nssm install ToeicFastApiWindowsService "C:\TOEIC_NEW\toeic-fastapi\run_fastapi.bat"
```

### 2.3. Cấu hình Service

```cmd
nssm set ToeicFastApiWindowsService AppDirectory "C:\TOEIC_NEW\toeic-fastapi"
nssm set ToeicFastApiWindowsService DisplayName "Toeic FastAPI Service"
nssm set ToeicFastApiWindowsService Description "FastAPI backend service for Toeic application"
nssm set ToeicFastApiWindowsService Start SERVICE_AUTO_START
```

### 2.4. Khởi động Service

```cmd
nssm start ToeicFastApiWindowsService
```

### 2.5. Các lệnh quản lý khác

```cmd
# Xem trạng thái
nssm status ToeicFastApiWindowsService

# Dừng service
nssm stop ToeicFastApiWindowsService

# Restart service
nssm restart ToeicFastApiWindowsService

# Mở GUI để chỉnh sửa cấu hình service
nssm edit ToeicFastApiWindowsService

# Xóa service (hiện GUI xác nhận)
nssm remove ToeicFastApiWindowsService

# Xóa service (không cần xác nhận)
nssm remove ToeicFastApiWindowsService confirm

# Xem thông tin chi tiết một parameter
nssm get ToeicFastApiWindowsService AppDirectory

# Set một parameter cụ thể
nssm set ToeicFastApiWindowsService AppDirectory "C:\TOEIC_NEW\toeic-fastapi"

# Reset parameter về mặc định
nssm reset ToeicFastApiWindowsService AppDirectory
```

---

## 3. Chạy Django với NSSM

### 3.1. Tạo file `run_django.bat`

**Đường dẫn:** `C:\TOEIC_NEW\toeic-django\run_django.bat`

```batch
call venv\Scripts\activate.bat
call python runserver.py
```

**Giải thích:**
- `call venv\Scripts\activate.bat` - Kích hoạt virtual environment
- `call python runserver.py` - Chạy Django từ file runserver.py (cấu hình port trong code Python)

### 3.2. Cài đặt Django Service

**Cách 1: Sử dụng GUI (Khuyến nghị cho người mới)**

Mở **Command Prompt (Administrator)**:

```cmd
cd C:\nssm-2.24\win64
nssm install DjangoWindowsService
```

Một cửa sổ GUI sẽ hiện ra, điền các thông tin:

**Tab "Application":**
- **Path:** `C:\TOEIC_NEW\toeic-django\run_django.bat`
- **Startup directory:** `C:\TOEIC_NEW\toeic-django`
- **Service name:** `DjangoWindowsService`

**Tab "Details":**
- **Display name:** `Django Toeic Service`
- **Description:** `Django backend service for Toeic application`
- **Startup type:** `Automatic`

Nhấn **Install service**

---

**Cách 2: Cài đặt qua Command Line (Nhanh)**

```cmd
cd C:\nssm-2.24\win64
nssm install DjangoWindowsService "C:\TOEIC_NEW\toeic-django\run_django.bat"
```

### 3.3. Cấu hình Service

```cmd
nssm set DjangoWindowsService AppDirectory "C:\TOEIC_NEW\toeic-django"
nssm set DjangoWindowsService DisplayName "Django Toeic Service"
nssm set DjangoWindowsService Description "Django backend service for Toeic application"
nssm set DjangoWindowsService Start SERVICE_AUTO_START
```

### 3.4. Khởi động Service

```cmd
nssm start DjangoWindowsService
```

### 3.5. Các lệnh quản lý khác

```cmd
# Xem trạng thái
nssm status DjangoWindowsService

# Dừng service
nssm stop DjangoWindowsService

# Restart service
nssm restart DjangoWindowsService

# Mở GUI để chỉnh sửa cấu hình service
nssm edit DjangoWindowsService

# Xóa service (hiện GUI xác nhận)
nssm remove DjangoWindowsService

# Xóa service (không cần xác nhận)
nssm remove DjangoWindowsService confirm

# Xem/Set/Reset parameters
nssm get DjangoWindowsService AppDirectory
nssm set DjangoWindowsService AppDirectory "C:\TOEIC_NEW\toeic-django"
nssm reset DjangoWindowsService AppDirectory
```

---

## 4. Cấu hình Nginx

### 4.1. Cấu trúc thư mục

```
C:\nginx-1.27.4\nginx-1.27.4\
├── conf\
│   └── nginx.conf
└── nginx.exe
```

### 4.2. Cấu hình SSL Certificate

**Đường dẫn cert:** `C:\cert\tma.com.vn`

Các file cần thiết:
- `tma.com.vn-full.crt` - Full chain certificate
- `tma.com.vn.key` - Private key

### 4.3. Cấu hình Nginx cho Server 3004

File: `C:\nginx-1.27.4\nginx-1.27.4\conf\nginx.conf`

```nginx
worker_processes  2;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    server_names_hash_bucket_size 128;
    
    server {
        listen 3004 ssl;
        server_name english-practice.tma.com.vn;

        # --- Cấu hình SSL ---
        ssl_certificate     "C:/cert/tma.com.vn/tma.com.vn-full.crt";
        ssl_certificate_key "C:/cert/tma.com.vn/tma.com.vn.key";
        ssl_protocols       TLSv1.2 TLSv1.3;
        ssl_ciphers         HIGH:!aNULL:!MD5;

        # === DJANGO Backend ===
        location /django/ {
            proxy_pass http://127.0.0.1:8080/; 
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        
        # === FastAPI Backend ===
        location /fastapi/ {
            proxy_pass http://127.0.0.1:8004/fastapi/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        
        # === React Frontend ===
        # Phải đặt cuối cùng để xử lý fallback
        location / {
            root "C:/TOEIC_NEW/toeic-react-ts-vite/dist";
            try_files $uri $uri/ /index.html;
        }
    }
}
```

### 4.4. Build React Application

Trước khi deploy, cần build React app:

```bash
cd C:\TOEIC_NEW\toeic-react-ts-vite
npm run build
```

Kết quả sẽ tạo thư mục `dist` chứa static files.

### 4.5. Khởi động Nginx

**⚠️ LƯU Ý QUAN TRỌNG:** Chỉ start Nginx **1 LẦN DUY NHẤT** khi lần đầu khởi động hoặc sau khi dừng hoàn toàn.

**Lần đầu tiên hoặc sau khi stop:**

```cmd
cd C:\nginx-1.27.4\nginx-1.27.4
start nginx
```

**Sau khi thay đổi cấu hình - CHỈ DÙNG RELOAD:**

```cmd
# ĐÚNG: Dùng reload để áp dụng cấu hình mới (không downtime)
nginx -s reload

# SAI: KHÔNG start lại nginx nếu nó đã đang chạy!
# Nếu start nhiều lần sẽ tạo nhiều process nginx trùng lặp
```

**Kiểm tra Nginx có đang chạy không:**

```cmd
tasklist /fi "imagename eq nginx.exe"
```

Nếu thấy kết quả có `nginx.exe`, nghĩa là Nginx đã chạy → Chỉ dùng `nginx -s reload`

### 4.6. Các lệnh quản lý Nginx

```cmd
# Kiểm tra cấu hình có lỗi không
nginx -t

# ✅ RELOAD cấu hình (dùng khi sửa nginx.conf) - KHÔNG DOWNTIME
nginx -s reload

# Dừng Nginx ngay lập tức
nginx -s stop

# Dừng Nginx một cách graceful (đợi xử lý xong request)
nginx -s quit

# Xem các process nginx đang chạy
tasklist /fi "imagename eq nginx.exe"

# Kill tất cả process nginx (nếu bị treo)
taskkill /f /im nginx.exe
```

**⚠️ Quy trình làm việc đúng:**

1. **Lần đầu:** `start nginx`
2. **Sửa nginx.conf:** 
   - `nginx -t` (kiểm tra cấu hình)
   - `nginx -s reload` (áp dụng thay đổi)
3. **KHÔNG BAO GIỜ:** Chạy `start nginx` nhiều lần liên tiếp!

### 4.7. Cài đặt Nginx như Windows Service (khuyến nghị)

Dùng NSSM để chạy Nginx như service:

```cmd
cd C:\nssm-2.24\win64
nssm install NginxService "C:\nginx-1.27.4\nginx-1.27.4\nginx.exe"
nssm set NginxService AppDirectory "C:\nginx-1.27.4\nginx-1.27.4"
nssm set NginxService DisplayName "Nginx Web Server"
nssm start NginxService
```

---

## 5. Kiểm tra và Troubleshooting

### 5.1. Kiểm tra Services đang chạy

```cmd
# Kiểm tra tất cả services
nssm status ToeicFastApiWindowsService
nssm status DjangoWindowsService
nssm status NginxService
```

### 5.2. Kiểm tra Ports

```cmd
# Kiểm tra port 8004 (FastAPI)
netstat -ano | findstr :8004

# Kiểm tra port 8080 (Django)
netstat -ano | findstr :8080

# Kiểm tra port 3004 (Nginx)
netstat -ano | findstr :3004
```

### 5.3. Test Endpoints

```bash
# Test Django
curl https://english-practice.tma.com.vn:3004/django/

# Test FastAPI
curl https://english-practice.tma.com.vn:3004/fastapi/

# Test React Frontend
curl https://english-practice.tma.com.vn:3004/
```

### 5.4. Xem Logs

**NSSM Services:**
- Logs mặc định: `C:\nssm-2.24\win64\[ServiceName]-stderr.log`
- Hoặc xem trong Event Viewer: Windows Logs → Application

**Nginx:**
- Access log: `C:\nginx-1.27.4\nginx-1.27.4\logs\access.log`
- Error log: `C:\nginx-1.27.4\nginx-1.27.4\logs\error.log`

### 5.5. Các lỗi thường gặp

**1. Service không start được:**
- Kiểm tra đường dẫn trong file `.bat`
- Kiểm tra virtual environment đã được tạo chưa
- Chạy file `.bat` trực tiếp để xem lỗi

**2. Nginx không khởi động:**
- Chạy `nginx -t` để kiểm tra cấu hình
- Kiểm tra port 3004 đã bị chiếm chưa
- Kiểm tra đường dẫn SSL certificate

**3. 502 Bad Gateway:**
- Kiểm tra Django/FastAPI service có đang chạy không
- Kiểm tra port trong `proxy_pass` có đúng không
- Kiểm tra firewall

**4. Static files không load:**
- Kiểm tra đường dẫn `root` trong nginx.conf
- Chạy lại `npm run build` cho React app
- Kiểm tra MIME types trong nginx

---

## Tóm tắt Quy trình Deploy

1. **Chuẩn bị ứng dụng:**
   - Tạo virtual environment cho Django và FastAPI
   - Build React app: `npm run build`

2. **Tạo bat files:**
   - `run_django.bat` cho Django (port 8080)
   - `run_fastapi.bat` cho FastAPI (port 8004)

3. **Cài đặt Windows Services:**
   - Install DjangoWindowsService
   - Install ToeicFastApiWindowsService
   - Start cả 2 services

4. **Cấu hình Nginx:**
   - Cập nhật `nginx.conf` với đúng đường dẫn
   - Test cấu hình: `nginx -t`
   - Start Nginx

5. **Kiểm tra:**
   - Truy cập `https://english-practice.tma.com.vn:3004`
   - Test các endpoints: `/django/`, `/fastapi/`
   - Kiểm tra React app load được không

---

## Lưu ý quan trọng

- **Nginx Start/Reload:** 
  - ✅ Chỉ `start nginx` **1 LẦN DUY NHẤT** khi khởi động
  - ✅ Sau đó luôn dùng `nginx -s reload` khi thay đổi cấu hình
  - ❌ KHÔNG `start nginx` nhiều lần (sẽ tạo nhiều process trùng)
- **BAT Files:** Đảm bảo file `.bat` gọi đúng script Python (main.py, runserver.py)
- **Working Directory:** NSSM tự động set working directory, không cần `cd` trong bat file
- **SSL:** Đảm bảo certificate không hết hạn
- **Firewall:** Mở port 3004 nếu cần truy cập từ bên ngoài
- **Backup:** Backup cấu hình nginx và bat files thường xuyên
- **Logs:** Theo dõi logs để phát hiện lỗi sớm