class ProxyFactory{

    static create(objeto, props, acao){

        return new Proxy(objeto, {

            get(target, prop, receiver){

                if(props.includes(prop) && typeof(target[prop]) == typeof(Function)){

                    return function(){
                        console.log(`interceptando ${prop}`);

                        let retorno = Reflect.apply(target[prop], target, arguments);
                        return acao(target);

                        return retorno;
                    }
                }

                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver){

                let retornar =  Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)){
                    acao(target);
                }

                return retornar;


            }
        });
    }
}
