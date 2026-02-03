import { useParams } from "react-router-dom";

export default function ProductDetail() {

const { id } = useParams();   

return (
    <>
    <div className="mx-auto max-w-7xl px-5 py-8">
      <h1 className="text-2xl font-bold text-white">
        Dettaglio prodotto
      </h1>

      <p className="mt-4 text-zinc-300">
        ID prodotto: {id}
      </p>
    </div>
    </>
    )

}
