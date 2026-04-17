#!/bin/sh

# Variáveis
export repositorio="https://github.com/Narutex216Bits/ProvaReact.git"
export branch_name="ProvaFirebase-$(date +%Y%m%d)"

# Garante que o Git está iniciado, mas NÃO apaga o .git
if [ ! -d ".git" ]; then
    git init
    git remote add origin $repositorio
fi

# Cria e muda para a nova branch baseada na data
git checkout -b $branch_name

# Adiciona tudo e commita
git add .
git commit -m "Prova do dia $(date +%d/%m/%Y)"

# Sobe para o GitHub
git push origin $branch_name

echo "✅ Branch $branch_name enviada com sucesso!"
