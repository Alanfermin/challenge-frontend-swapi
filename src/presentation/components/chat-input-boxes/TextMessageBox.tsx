import { FormEvent, useState } from "react";

interface Props {
    onSendMessage:(message:string)=>void;
    placeHolder?: string;
    disableCorrections?: boolean;
}


// Si no viene el disableCorrections lo coloco en false
export const TextMessageBox = ({onSendMessage,placeHolder,disableCorrections=false}:Props) => {
  

    const[message, setMessage]=useState('')



    const handleSendMessage = (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        //Validar que haya algo escrito antes de enviar
        if(message.trim().length === 0) return;
        onSendMessage(message)
        setMessage('')
    }
  
    return (
        <form
            onSubmit={handleSendMessage}
            className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
        >
            <div className="flex-grow">
                <div className="relative w-full">

                    <input 
                        type="text"
                        autoFocus
                        name="message"
                        className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h10"
                        placeholder={placeHolder}
                        autoComplete={disableCorrections ? 'on' : 'off'}
                        autoCorrect={disableCorrections ? 'on' : 'off'}
                        spellCheck={disableCorrections ? 'true' : 'false'}
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                    />

                </div>
            </div>


            <div className="ml-4">
                <button className="btn-primary">
                    <span className="mr-2">Enviar</span> 
                    <i className="fa-regular fa-paper-plane"></i>
                </button>

            </div>



        </form>
  )
}