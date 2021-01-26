var uri = "ws://localhost:5757";
posx = "0";
posz = "0";
posy = "0";
point = "0";
         var websocket = null;
         var message = "";
         function openConnection() {
            websocket = new WebSocket(uri);
            websocket.onmessage = function (event) {
               var obj = JSON.parse(event.data);
               var node = document.getElementById('fromServer');
               var newNode = document.createElement('div');
               newNode.setAttribute("id", "text");
               newNode.appendChild(document.createTextNode(event.data));
               var div = document.getElementById("text");
               div.parentNode.removeChild(div);
               if (obj.type == 'cord' || obj.type == 'point') {
                  point = obj.point
                  posx = obj.posx
                  posz = obj.posz;
                  posy = obj.posy;
                  document.getElementById("p1").innerHTML = 'posX : ' + obj.posx + ' | posY : ' + obj.posy + ' | posZ : ' + obj.posz + ' | point : ' + obj.point;
               } else if (obj.type == 'message') {
                  document.getElementById("p1").innerHTML = 'name : ' + obj.name + ' | message : ' + obj.message;
               }
               node.appendChild(newNode);
            };
         }

         function closeConnection() {
            websocket.close();
         }

         function sendMessage() {
            var msg = document.getElementById('messageText').value;
            websocket.send(msg);
         }

         function sendCMD(move) {
             websocket.send('{"cmd":"move","parm":"' + move + '","posx":"' + posx + '","posz":"' + posz +'","posy":"' + posy + '","point":"' + point + '"}')
         }