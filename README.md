# DD Dynamo Technology

Site institucional em português, com React, TypeScript, Vite, tipografia Sora hospedada localmente e uma escultura 3D procedural em Three.js.

## Executar

Requer Node.js 22.12+ ou 24+ e npm.

```sh
git clone https://github.com/error-syntaxx/nome.git
cd nome
npm ci
npm run dev
```

No ambiente cloud, o checkout já existe em `/workspace/nome`: entre nessa pasta e execute apenas os comandos npm. No computador, abra o endereço exibido no terminal. O servidor usa a porta 5173.

Ao reiniciar ou restaurar o ambiente, os processos do servidor precisam ser iniciados novamente com `npm run dev`. Se a prévia não carregar, confirme primeiro que esse comando está ativo. Abrir o `index.html` diretamente não executa o projeto React.

Para gerar a versão de produção:

```sh
npm run build
npm run preview -- --port 4173
```

`npm run typecheck` valida o TypeScript. Os arquivos finais ficam em `dist/`.

## Contatos

Ainda não há canais comerciais definidos. O formulário valida os campos e gera um briefing que pode ser copiado ou baixado, sem prometer um envio inexistente. Os dados ficam apenas na memória da página até o usuário copiar, baixar ou enviar por um canal configurado. Não há backend nem armazenamento persistente.

Para ativar o encaminhamento, copie `.env.example` para `.env.local` e preencha `VITE_CONTACT_WHATSAPP` (número internacional com país e DDD, somente dígitos) e/ou `VITE_CONTACT_EMAIL`. Se ambos forem definidos, WhatsApp tem prioridade. Reinicie o servidor ou gere um novo build após a alteração. Essas variáveis são públicas no navegador; não coloque segredos nelas.

## Identidade e conteúdo

O monograma SVG é uma interpretação vetorial da referência enviada, sem acesso ao arquivo original da marca. As fontes são servidas localmente, sem dependência do Google Fonts. Os três projetos apresentados são conceitos visuais identificados como demonstração, não trabalhos de clientes.

Animações respeitam a preferência por movimento reduzido. O visual 3D pausa fora da tela e tem uma alternativa SVG para dispositivos sem WebGL ou quando o módulo da animação não puder carregar. Falhas nos efeitos visuais ficam isoladas do restante da página; o conteúdo continua visível mesmo sem suporte ao IntersectionObserver. O site inclui navegação por teclado, menu para celular, FAQ e prévias de conceitos em modal.

O ambiente já é isolado: use o checkout existente, sem criar worktrees para iniciar o projeto.
