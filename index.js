const {select, input, checkbox} = require('@inquirer/prompts')

let meta = {
    value: "Tomar 3L de aguá por dia.",
    checked: false
}

let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite a meta: "})
    
    if(meta.length == 0) {
        console.log("A meta não pode ser vazia.")
        return
    }

    metas.push({value: meta, checked: false})
}

const listarMetas = async () => {
    const resposta = await checkbox({
        message: "Use as SETAS para mudar de meta, o ESPAÇO para marcar ou desmacar e ENTER para finalizar essa etapa.",
        choices: [...metas],
        instructions: false
    })

    if (resposta.length == 0) {
        console.log("Nenhuma meta selecionada.")
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })

    resposta.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) marcadas como concluída(s)")
}

const start = async () => {
    
    while(true) {
        
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "Cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "Listar"
                },
                {
                    name: "Sair",
                    value: "Sair"
                }
                
            ]

        })


        switch(opcao) {
            case "Cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "Listar":
                await listarMetas()
                break
            case "Sair":
                console.log("Até a próxima!")
                return    

        }
    }
}

start()