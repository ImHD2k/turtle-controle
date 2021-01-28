os.loadAPI('json')
while true do
local ws, err = http.websocket("ws://81bae405cdee.ngrok.io")
    if err then
        print(err)
    end
    if ws then
        function sendServer(message)
            ws.send(json.encode({type='message', name=os.getComputerLabel(), message=message}))
        end
        function sendServerCord(posx, posy, posz, point)
            local success, data = turtle.inspect()
            local success, dataup = turtle.inspectUp()
            local success, datadown = turtle.inspectDown()
            if (cmd.point == '0') then
                ws.send(json.encode({type='cord', posx=posx, posy=posy, posz=posz, block=data.name, blockposx=posx + 1, blockposz=posz, blockup=dataup.name, blockuppos=posy + 1, blockdown=datadown.name, blockdownpos=posy - 1, point=point}))
            elseif (cmd.point == '1') then
                ws.send(json.encode({type='cord', posx=posx, posy=posy, posz=posz, block=data.name, blockpos=posz + 1,blockposx=posz, blockup=dataup.name, blockuppos=posy + 1, blockdown=datadown.name, blockdownpos=posy - 1, point=point}))
            elseif (cmd.point == '2') then
                ws.send(json.encode({type='cord', posx=posx, posy=posy, posz=posz, block=data.name, blockpos=posx - 1,blockposz=posz, blockup=dataup.name, blockuppos=posy + 1, blockdown=datadown.name, blockdownpos=posy - 1, point=point}))
            elseif (cmd.point == '3') then
                ws.send(json.encode({type='cord', posx=posx, posy=posy, posz=posz, block=data.name, blockpos=posz - 1,blockposx=posz, blockup=dataup.name, blockuppos=posy + 1, blockdown=datadown.name, blockdownpos=posy - 1, point=point}))
            end
        end
        local message = ws.receive()
        if message == nil then
            break
        end
        
        cmd = json.decode(message)
        print(message)
                
        if (cmd.cmd == 'send') then
            sendServer(cmd.parm)
        elseif (cmd.cmd == 'gb') then
            sendServerCord()
        elseif (cmd.cmd == 'setname') then
            os.setComputerLabel(cmd.parm)
            sendServer('name set')
        elseif (cmd.cmd == 'refuel') then
            turtle.refuel()
            sendServer("Refuel done")
        elseif (cmd.cmd == 'getfuel') then
            sendServer(turtle.getFuelLevel())
        elseif (cmd.cmd == 'move') then
            if (cmd.parm == 'back') then
                local done = turtle.back()
                if done then
                    if (cmd.point == '0') then
                        sendServerCord(cmd.posx - 1,cmd.posy,cmd.posz,cmd.point)
                    elseif (cmd.point == '1') then
                        sendServerCord(cmd.posx,cmd.posy,cmd.posz - 1,cmd.point)
                    elseif (cmd.point == '2') then
                        sendServerCord(cmd.posx + 1,cmd.posy,cmd.posz,cmd.point)
                    elseif (cmd.point == '3') then
                        sendServerCord(cmd.posx,cmd.posy,cmd.posz + 1,cmd.point)
                    end
                end
            elseif (cmd.parm == 'forward') then
                local done = turtle.forward()
                if done then
                    if (cmd.point == '0') then
                        sendServerCord(cmd.posx + 1,cmd.posy,cmd.posz,cmd.point)
                    elseif (cmd.point == '1') then
                        sendServerCord(cmd.posx,cmd.posy,cmd.posz + 1,cmd.point)
                    elseif (cmd.point == '2') then
                        sendServerCord(cmd.posx - 1,cmd.posy,cmd.posz,cmd.point)
                    elseif (cmd.point == '3') then
                        sendServerCord(cmd.posx,cmd.posy,cmd.posz - 1,cmd.point)
                    end
                end
            elseif (cmd.parm == 'up') then
                local done = turtle.up()
                if done then 
                    sendServerCord(cmd.posx,cmd.posy + 1,cmd.posz,cmd.point)
                end
            elseif (cmd.parm == 'down') then
                local done = turtle.down()
                if done then
                    sendServerCord(cmd.posx,cmd.posy - 1,cmd.posz,cmd.point)
                end        
            elseif (cmd.parm == 'right') then
                turtle.turnRight()
                if (cmd.point < '3') then
                    sendServerCord(cmd.posx,cmd.posy,cmd.posz,cmd.point + 1)
                else
                    sendServerCord(cmd.posx,cmd.posy,cmd.posz,'0')
                end
            elseif (cmd.parm == 'left') then
                turtle.turnLeft()
                if (cmd.point == '0') then
                    sendServerCord(cmd.posx,cmd.posy,cmd.posz,'3')
                elseif (cmd.point == '3') then
                    sendServerCord(cmd.posx,cmd.posy,cmd.posz,'2')
                elseif (cmd.point == '2') then
                    sendServerCord(cmd.posx,cmd.posy,cmd.posz,'1')
                else
                    sendServerCord(cmd.posx,cmd.posy,cmd.posz,'0') 
                end
            elseif (cmd.parm == 'getblock') then
                sendServerCord(cmd.posx,cmd.posy,cmd.posz,cmd.point)
            end
        end
       ws.close()
    end 
end