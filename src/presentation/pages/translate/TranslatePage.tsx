import {  useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxSelect } from "../../components";
import { translateTexUsecase } from "../../../core/use-cases";




interface Message{
  text:string;
  isGpt:boolean;
}

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

export const TranslatePage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async(prompt:string, lang:string) =>{

    setIsLoading(true)

    const newMessage = `Traduce: "${ prompt }" al idioma ${ lang }`
    // Defino preview como los mensajes anteriores y tengo uno donde el texto es igual al texto y isGpt en False
    setMessages((prev)=> [...prev, {text:newMessage, isGpt:false}])

    //TODO Desde aca mandar a llamar el UseCase

    const {ok, message} = await translateTexUsecase( prompt,lang) //abortController.current.signal 
    setIsLoading(false);
    if(!ok){
      return(message)
    }

    // TODO: Agregar el mensaje de isGPT en true su todo sale bien
    setMessages((prev)=> [...prev, {text:message, isGpt:true}])
  }


  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Mensaje de Bienvenida */}
          <GptMessage text={"¿Qué quieres que traduzca hoy?"} />

          {
            messages.map((message, index)=>(
              message.isGpt
              ? (
                <GptMessage key={index} text={message.text} />
              )
              : (
                <MyMessage key={index} text={message.text} />
              )
            ))
          }

{/* Aqui defino que si esta cargando me muestre el loading */}
          {
            isLoading &&(
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )
          }

           


        </div>
      </div>


    <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeHolder="Escribe aqui tu mensaje"
        disableCorrections options={languages}    />



    </div>
  )
}
