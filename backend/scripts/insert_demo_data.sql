-- Insert demo data vào database (Tiếng Việt)
-- Run this in Supabase SQL Editor

-- Insert demo contacts
INSERT INTO contacts (name, email, phone, subject, message, created_at) VALUES
('Nguyễn Văn An', 'nguyenvanan@example.com', '0912345678', 'Hợp tác dự án website', 'Chào bạn, tôi muốn hợp tác với bạn để phát triển một website bán hàng online. Bạn có thể cho tôi báo giá và thời gian hoàn thành không?', NOW()),
('Trần Thị Bích', 'tranthbich@example.com', '0923456789', 'Tư vấn giải pháp công nghệ', 'Công ty tôi đang cần tư vấn về giải pháp chuyển đổi số. Bạn có kinh nghiệm trong lĩnh vực này không? Tôi muốn đặt lịch gặp trực tiếp.', NOW()),
('Lê Hoàng Nam', 'lehoangnam@example.com', '0934567890', 'Học lập trình', 'Tôi đang muốn học lập trình web để phát triển sự nghiệp. Bạn có nhận dạy kèm hoặc tư vấn lộ trình học tập không?', NOW()),
('Phạm Thị Hương', 'phamthihuong@example.com', '0945678901', 'Thiết kế UI/UX', 'Website hiện tại của công ty tôi trông khá cũ kỹ. Bạn có thể giúp thiết kế lại giao diện cho hiện đại và chuyên nghiệp hơn không?', NOW()),
('Đặng Minh Tuấn', 'dangminhtuan@example.com', '0956789012', 'Báo giá dự án mobile app', 'Tôi có ý tưởng về một ứng dụng di động cho ngành F&B. Bạn có thể cho tôi biết chi phí và thời gian để phát triển ứng dụng này không?', NOW() - INTERVAL '1 day'),
('Vũ Thị Mai', 'vuthimai@example.com', '0967890123', 'Review code và tối ưu hệ thống', 'Hệ thống của công ty tôi đang gặp vấn đề về hiệu suất. Bạn có thể review code và đưa ra giải pháp tối ưu không? Dự án sử dụng React và Node.js.', NOW() - INTERVAL '2 days'),
('Hoàng Văn Đức', 'hoangvanduc@example.com', '0978901234', 'Cảm ơn về bài viết hữu ích', 'Tôi đã đọc blog của bạn về Next.js và thấy rất hữu ích. Cảm ơn bạn đã chia sẻ kiến thức. Tôi muốn học hỏi thêm về serverless deployment.', NOW() - INTERVAL '3 days'),
('Ngô Thị Lan', 'ngothilan@example.com', '0989012345', 'Tuyển dụng Frontend Developer', 'Công ty tôi đang tìm kiếm Frontend Developer có kinh nghiệm với React/Next.js. Bạn có đang tìm cơ hội mới hoặc có thể giới thiệu ai phù hợp không?', NOW() - INTERVAL '4 days'),
('Bùi Minh Khoa', 'buiminhkhoa@example.com', '0901234567', 'Hỏi về API integration', 'Tôi đang gặp khó khăn khi tích hợp API thanh toán vào website. Bạn có kinh nghiệm với VNPay hoặc Momo không? Cần tư vấn gấp!', NOW() - INTERVAL '5 days'),
('Đinh Thị Hà', 'dinhthiha@example.com', '0912340987', 'Góp ý về website', 'Tôi rất thích thiết kế website của bạn! Giao diện đẹp và hiện đại. Bạn có thể chia sẻ tech stack và công cụ thiết kế bạn sử dụng không?', NOW() - INTERVAL '6 days');

-- Insert demo newsletter subscriptions
INSERT INTO newsletters (email, subscribed_at, is_active) VALUES
('nguyenvana@gmail.com', NOW(), 1),
('tranthib@gmail.com', NOW() - INTERVAL '1 day', 1),
('lehoangc@gmail.com', NOW() - INTERVAL '2 days', 1),
('phamthid@gmail.com', NOW() - INTERVAL '3 days', 1),
('dangminhe@gmail.com', NOW() - INTERVAL '4 days', 1),
('vuthif@gmail.com', NOW() - INTERVAL '5 days', 1),
('hoangvang@gmail.com', NOW() - INTERVAL '10 days', 1),
('ngothih@gmail.com', NOW() - INTERVAL '15 days', 1),
('buiminhi@gmail.com', NOW() - INTERVAL '20 days', 1),
('olduser@gmail.com', NOW() - INTERVAL '30 days', 0);

-- Verify data
SELECT COUNT(*) as total_contacts FROM contacts;
SELECT COUNT(*) as active_newsletters FROM newsletters WHERE is_active = 1;
SELECT COUNT(*) as inactive_newsletters FROM newsletters WHERE is_active = 0;

-- View recent contacts
SELECT name, email, subject, created_at 
FROM contacts 
ORDER BY created_at DESC 
LIMIT 5;
