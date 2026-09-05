const mineflayer = require('mineflayer')
 const CONFIG = {
   host: 'aquamc.vn',
   port: 25565,
   username: 'EmPhuongToiChoi',
   password: 'taolanguyenngocphuong1',
   lenhVaoCum: '/skyblock',
   chuKyDao: 3000
 }
 const bot = mineflayer.createBot({
   host: CONFIG.host,
   port: CONFIG.port,
   username: CONFIG.username,
   auth: 'offline'
 })
 let dangDao = false
 // ✅ TỰ ĐỘNG KẾT NỐI VÀ CHẠY LIÊN TỤC
 bot.on('spawn', () => {
   console.log('✅ Bot đã vào server!')
   
   setTimeout(() => {
     bot.chat(`/login ${CONFIG.password}`)
     console.log('✅ Đã đăng nhập!')
   }, 2500)
   setTimeout(() => {
     bot.chat(CONFIG.lenhVaoCum)
     console.log('✅ Đã vào Skyblock!')
   }, 5000)
   setTimeout(() => {
     console.log('✅ Bắt đầu đào!')
     tuDongDao()
   }, 8000)
 })
 // ✅ TỰ ĐỘNG ĐÀO VÀ CHẠY LẠI LIÊN TỤC
 function tuDongDao() {
   if (dangDao) return
   const blockDuoiChan = bot.blockAt(bot.entity.position.offset(0, -1, 0))
   
   if (blockDuoiChan && bot.canDigBlock(blockDuoiChan)) {
     dangDao = true
     bot.dig(blockDuoiChan, (err) => {
       dangDao = false
       if (err) console.log('❌ Không đào được:', err.message)
       setTimeout(tuDongDao, CONFIG.chuKyDao) // ✅ TỰ CHẠY LẠI LIÊN TỤC
     })
   } else {
     setTimeout(tuDongDao, CONFIG.chuKyDao) // ✅ TỰ THỬ LẠI LIÊN TỤC
   }
 }
 // ✅ TỰ KẾT NỐI LẠI NẾU BỊ ĐUỔI / MẤT KẾT NỐI
 bot.on('kicked', (lyDo) => {
   console.log('❌ Bị đuổi:', lyDo)
   setTimeout(() => process.exit(1), 5000) // Render sẽ tự khởi động lại bot
 })
 bot.on('error', (err) => {
   console.log('❌ Lỗi:', err)
   setTimeout(() => process.exit(1), 5000) // Tự khởi động lại khi lỗi
 })
 // ✅ LỆNH ĐIỀU KHIỂN TRONG GAME
 bot.on('chat', (nguoiGui, tinNhan) => {
   if (nguoiGui === bot.username) return
   if (tinNhan === '!stop') dangDao = true
   if (tinNhan === '!dig') tuDongDao()
   if (tinNhan === '!ping') bot.chat('Pong!')
 })
