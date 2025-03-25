local Players = game:GetService("Players")

-- Função para verificar se o jogador está no mesmo time
local function bloquearDanoEntreJogadores(atacante, alvo)
	-- Verifica se os jogadores estão no mesmo time
	return atacante.Team == alvo.Team
end

-- Quando um novo jogador entra, monitora o dano
Players.PlayerAdded:Connect(function(player)
	player.CharacterAdded:Connect(function(character)
		-- Espera o personagem ter um humanoide
		local humanoid = character:WaitForChild("Humanoid")

		-- Intercepta o evento de dano
		humanoid.HealthChanged:Connect(function()
			-- Verifica se o personagem sofreu dano
			local jogadorAlvo = player  -- O jogador alvo que recebeu dano (este jogador)

			-- Encontre o atacante (o jogador que causou o dano)
			local atacante = game.Players:GetPlayerFromCharacter(humanoid.Parent)  -- O jogador atacante

			-- Se o jogador atacante for do mesmo time, bloqueia o dano
			if atacante and jogadorAlvo and bloquearDanoEntreJogadores(atacante, jogadorAlvo) then
				-- Se os jogadores estão no mesmo time, cancela o dano
				print(atacante.Name .. " tentou causar dano em " .. jogadorAlvo.Name .. " mas estão no mesmo time!")
				humanoid.Health = humanoid.Health  -- Reseta a saúde, cancelando o dano
			end
		end)
	end)
end)