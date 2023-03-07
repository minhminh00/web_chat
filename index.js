const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


var nguoiGui = []
io.on('connection', (socket) => {
  nguoiGui.push({id : socket.id ,soLanNoiBay: 0}) 
  socket.on('chat message', msg => {
    for( let i = 0; i < nguoiGui.length; i++){
      if(nguoiGui[i].id == socket.id) {
          let soLanNoiBayCuaNguoiHienTai = nguoiGui[i].soLanNoiBay
          if(soLanNoiBayCuaNguoiHienTai < 3){
            soLanNoiBayCuaNguoiHienTai++
            if(msg == 'fuckyou' || msg == 'fuck you' || msg == 'fuck'){
              nguoiGui[i].soLanNoiBay = soLanNoiBayCuaNguoiHienTai;
              io.emit('chat message','***');
            }else {
              io.emit('chat message', msg)
            }
          }else{
            io.emit('chat message', {thongBao: "Tai khoan cua ban da bi khoa", idNguoiBiKhoa: socket.id})
            nguoiGui[i].soLanNoiBay = 0
          }
        }
      }
    });

});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});