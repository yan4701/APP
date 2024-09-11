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

    metas.forEach((m) => {
        m.checked = false
    })

    if (resposta.length == 0) {
        console.log("Nenhuma meta selecionada.")
        return
    }

    resposta.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) marcadas como concluída(s)")
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0) {
        console.log("Você ainda não tem metas realizadas. :(")
        return
    }

    await select({
        message: "Metas realizadas: ",
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0) {
        console.log("Não existem metas abertas. :)")
        return
    }

    await select({
        message: "Metas abertas: " + abertas.length, 
        choices: [...abertas]
    })
}

const removerMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })
    const itemsADeletar = await checkbox({
        message: "Selecione o item a ser removido",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if(itemsADeletar.length == 0) {
        console.log("Nenhum item para deletar.")
    }

    itemsADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    console.log("Meta(s) removida(s) com suecesso.")
    
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
                    name: "Metas realizadas",
                    value: "Realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "Abertas"
                },
                {
                    name: "Remover metas",
                    value: "Remover"
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
            case "Realizadas":
                await metasRealizadas()
                break
            case "Abertas":
                await metasAbertas()
                break
            case "Remover":
                await removerMetas()
                break         
            case "Sair":
                console.log("Até a próxima!")
                return    

        }
    }
}

start()