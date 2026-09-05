const mineflayer = require('mineflayer')
 // ================== THÔNG TIN CỦA BẠN ==================
 const CONFIG = {
   host: 'aquamc.vn',
   port: 25565,
   username: 'EmPhuongToiChoi',
   password: 'taolanguyenngocphuong1',
   lenhVaoCum: '/skyblock',
   chuKyDao: 3000
 }
 // =======================================================
 const bot = mineflayer.createBot({
   host: CONFIG.host,
   port: CONFIG.port,
   username: CONFIG.username,
   auth: 'offline'
 })
 let dangDao = false
 bot.on('spawn', () => {
   setTimeout(() => {
     bot.chat(`/login ${CONFIG.password}`)
   }, 2500)
   setTimeout(() => {
     bot.chat(CONFIG.lenhVaoCum)
   }, 5000)
   setTimeout(() => {
     tuDongDao()
   }, 8000)
 })
 function tuDongDao() {
   if (dangDao) return
   const blockDuoiChan = bot.blockAt(bot.entity.position.offset(0, -1, 0))
   
   if (blockDuoiChan && bot.canDigBlock(blockDuoiChan)) {
     dangDao = true
     bot.dig(blockDuoiChan, (err) => {
       dangDao = false
       if (err) console.log('Không đào được!')
       setTimeout(tuDongDao, CONFIG.chuKyDao)
     })
   } else {
     setTimeout(tuDongDao, CONFIG.chuKyDao)
   }
 }
 bot.on('chat', (nguoiGui, tinNhan) => {
   if (nguoiGui === bot.username) return
   if (tinNhan === '!stop') dangDao = true
   if (tinNhan === '!dig') tuDongDao()
   if (tinNhan === '!ping') bot.chat('Pong!')
 })
 bot.on('kicked', console.log)
 bot.on('error', console.log)
